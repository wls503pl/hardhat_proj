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
const {
  networkConfig,
  developmentChains,
  DECIMALS,
  INITIAL_ANSWER,
} = require("../helper-hardhat-config");
const { network } = require("hardhat");

// getNamedAccounts() :A fixed function used to retrieve named accounts defined in "hardhat-deploy" library.
// deployments: A fixed deployment management object. Contains various functions and information related to contract deployment.
module.exports = async ({ getNamedAccounts, deployments }) => {
  // Returns 'deploy' and 'log' functions
  const { deploy, log } = deployments;

  // Contract deployer
  const { deployer } = await getNamedAccounts();

  // Also need to get Chain's ID,
  // Its function is to obtain the price feed address on the corresponding chain according to different chainId.
  const chainId = network.config.chainId;

  // what happens when we want to change chains?

  // If chainId is X, use address Y
  // If chainId is Z, use address A
  let ethUsdPriceFeedAddress;

  // When going for localhost or hardhat network we want to use a mock
  // mock contract:
  // If the contract doesn't exist, we deploy a minimal version of it for local testing
  if (developmentChains.includes(network.name)) {
    const ethUsdAggregator = await deployments.get("MockV3Aggregator");
    ethUsdPriceFeedAddress = ethUsdAggregator.address;
  } else {
    // Get the price feed contract address of the corresponding network according to different chainId
    ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
  }

  //-----------------------------------------------------------

  /*
   * The deploy function returned above can be used directly via "hardhat deploy".
   * Call the deploy function with the contract name to deploy and a list of {} overrides you want to add as arguments.
   * In the list, we specify 'from' to determine who is deploying the contract.
   * Place the arguments you want to pass to the constructor in args (here there is only one, 'priceFeedAddress' ).
   * Finally, let's do some custom logging so we don't have to use a lot of "console.log" all the time.
   */
  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: [
      // Parameters passed to the constructor of contract FundMe.
      ethUsdPriceFeedAddress,
    ],
    // Customize log styles to avoid using a lot of "console.log".
    log: true,
  });
  log("---------------------------------------------");
};
module.exports.tags = ["all", "fundme"];
