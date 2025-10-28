// Get the deployments object through hardhat-deploy to deploy the fundme contract
require("@nomicfoundation/hardhat-chai-matchers");
const { deployments, ethers, getNamedAccounts } = require("hardhat");
const { assert, expect } = require("chai");

// Nest another describe within describe, with a larger scope that applies to the entire "FundMe" contract
describe("FundMe", async function () {
  let fundMe;
  let deployer;
  let mockV3Aggregator;
  // hardcoded value for testcase3
  const sendValue = ethers.parseEther("1"); // parseEther covert 1 ETH to 10e18

  // Before processing the constructor's describe, deploy the FundMe contract first
  beforeEach(async function () {
    /*
     * Use 'hardhat-deploy' to deploy the 'FundMe' contract. Fundme will include 'mocks' and everything else.
     * The deployments object has a function called 'fixture' which allows running the entire deploy folder and using any number of tags,
     * For example, module.exports.tags = ["all", "mocks"],
     * "await deployments.fixture(["all"])"" will run the deployment script on the local network
     * and deploy all the contracts so that they can be used in scripts and tests.
     * This will directly deploy everything in the "deploy" folder with just one line of code:
     */
    await deployments.fixture(["all"]);

    // For testing purposes, you can tell "ethers" which account you want to connect to FundMe
    deployer = (await getNamedAccounts()).deployer;

    /*
     * Get the latest deployments of FundMe and MockV3Aggregator contracts.
     * Use ethers.getContractAt() to get contract instances connected to the deployer account.
     * Whenever a function is called on these contracts, it will automatically use the deployer's account.
     */
    const FundMeDeployment = await deployments.get("FundMe");
    fundMe = await ethers.getContractAt(
      "FundMe",
      FundMeDeployment.address,
      await ethers.getSigner(deployer)
    );

    const MockV3Deployment = await deployments.get("MockV3Aggregator");

    mockV3Aggregator = await ethers.getContractAt(
      "MockV3Aggregator",
      MockV3Deployment.address,
      await ethers.getSigner(deployer)
    );
  });

  describe("constructor", async function () {
    // Creating the First Test
    it("sets the aggregator addresses correctly", async function () {
      // Make sure s_priceFeed is MockV3Aggregator
      const response = await fundMe.getPriceFeed();
      assert.equal(response, mockV3Aggregator.target);
    });
  });

  describe("fund", async function () {
    it("Fails if you don't send enough ETH", async function () {
      await expect(fundMe.fund()).to.be.revertedWith(
        "Didn't send enough USD ..."
      );
    });
    it("Updated the amount funded data structure", async function () {
      // Here, we send 1 ETH(hardcoded).
      await fundMe.fund({ value: sendValue });
      const response = await fundMe.getAddressToAmountFunded(deployer);
      assert.equal(response.toString(), sendValue.toString());
    });
    it("Adds funder to array of s_funders", async function () {
      await fundMe.fund({ value: sendValue });
      const funder = await fundMe.getFunder(0);
      assert.equal(funder, deployer);
    });
  });
  describe("withdraw", async function () {
    beforeEach(async function () {
      // Before testing the withdrawal function, ensure that the contract actually has funds
      await fundMe.fund({ value: sendValue });
    });
    it("Withdraw ETH from a single founder", async function () {
      // Arrange
      const startingFundMeBalance = await ethers.provider.getBalance(
        fundMe.target
      );
      const startingDeployerBalance = await ethers.provider.getBalance(
        deployer
      );
      // Act
      const transactionResponse = await fundMe.cheaperWithdraw();
      const transactionReceipt = await transactionResponse.wait(1);
      // IMPORTANT: gasCost must be calculated here, before Assert!
      const gasCost = transactionReceipt.gasUsed * transactionReceipt.gasPrice;

      const endingFundMeBalance = await ethers.provider.getBalance(
        fundMe.target
      );
      const endingDeployerBalance = await ethers.provider.getBalance(deployer);
      // Assert
      assert.equal(endingFundMeBalance, 0);
      assert.equal(
        (startingFundMeBalance + startingDeployerBalance).toString(),
        (endingDeployerBalance + gasCost).toString()
      );
    });

    it("Allows us to withdraw with multiple s_funders", async function () {
      // Arrange
      const accounts = await ethers.getSigners();
      for (let i = 1; i < 6; i++) {
        const fundMeConnectedContract = await fundMe.connect(accounts[i]);
        await fundMeConnectedContract.fund({ value: sendValue });
      }
      const startingFundMeBalance = await ethers.provider.getBalance(
        fundMe.target
      );
      const startingDeployerBalance = await ethers.provider.getBalance(
        deployer
      );

      // Act
      const transactionResponse = await fundMe.cheaperWithdraw();

      const transactionReceipt = await transactionResponse.wait(1);
      const gasCost = transactionReceipt.gasUsed * transactionReceipt.gasPrice;

      const endingFundMeBalance = await ethers.provider.getBalance(
        fundMe.target
      );
      const endingDeployerBalance = await ethers.provider.getBalance(deployer);

      // Assert
      assert.equal(endingFundMeBalance, 0);
      assert.equal(
        (startingFundMeBalance + startingDeployerBalance).toString(),
        (endingDeployerBalance + gasCost).toString()
      );

      // Make sure that the s_funders are reset properly
      await expect(fundMe.getFunder(0)).to.be.reverted;

      for (i = 1; i < 6; i++) {
        assert.equal(
          await fundMe.getAddressToAmountFunded(accounts[i].address),
          0
        );
      }
    });

    it("Only allows the owner to withdraw.", async function () {
      const accounts = await ethers.getSigners();

      // Assume the first account will be a random attacker
      const attacker = accounts[1];

      // Connect this attacker to a new contract
      const attackerConnectedContract = await fundMe.connect(attacker);

      // Verify that the attacker's withdrawal of the contract month will be reverted
      await expect(attackerConnectedContract.withdraw()).to.be.reverted;
    });
  });
});
