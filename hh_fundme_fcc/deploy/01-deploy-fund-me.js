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
module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
};
