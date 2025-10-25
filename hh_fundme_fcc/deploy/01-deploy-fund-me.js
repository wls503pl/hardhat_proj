// Format 1:
// function deployFunc() {
//   hre.getNamedAccounts()
//   hre.deployments
//   console.log("Hello, hardhat-deploy.");
// }

// module.exports.default = deployFunc;

//--------------------------------------
// Format 2:
// module.exports = async (hre) => {
//   const { getNamedAccounts, deployments } = hre;
// };

// There is also a syntactic sugar structure, which is simpler
//const helperConfig = require("../helper-hardhat-config");
//const networkConfig = helperConfig.networkConfig;

// This statement is short for those 2 above.
const { networkConfig } = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
  // Returns 'deploy' and 'log' functions
  const { deploy, log } = deployments;

  // Contract deployer
  const { deployer } = await getNamedAccounts();

  // Also need to get Chain's ID
  const chainId = network.config.chainId;

  // If chainId is X, use address Y
  // If chainId is Z, use address A
  const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];

  // what happens when we want to change chains?

  //-----------------------------------------------------------
  // When going for localhost or hardhat network we want to use a mock

  /*
   * The deploy function returned above can be used directly via "hardhat deploy".
   * Call the deploy function with the contract name to deploy and a list of {} overrides you want to add as arguments.
   * In the list, we specify 'from' to determine who is deploying the contract.
   * Place the arguments you want to pass to the constructor in args (here there is only one, priceFeedAddress ).
   * Finally, let's do some custom logging so we don't have to use a lot of "console.log" all the time.
   */
  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: [
      /* address? */
      ethUsdPriceFeedAddress,
    ], // put price feed address
    log: true,
  });
};

module.exports.tags = ["all", "fundme"];
