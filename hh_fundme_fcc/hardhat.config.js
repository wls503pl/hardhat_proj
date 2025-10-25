require("dotenv").config();
require("hardhat-deploy");

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "";
const ARBITRUM_SEPOLIA_RPC_URL = process.env.ARBITRUM_SEPOLIA_RPC_URL || "";
const OP_SEPOLIA_RPC_URL = process.env.OP_SEPOLIA_RPC_URL || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

module.exports = {
  defaultNetwork: "hardhat",
  namedAccounts: {
    deployer: {
      // Name the accounts in the accounts array
      // default: 0 = On the default network, account 0 is deployer
      // In this way, you can use const { deployer } = await getNamedAccounts() in the deploy script
      default: 0,

      // You can also specify different deployers for different networks
      // sepolia: 1, // Use the first account on the sepolia network
    },
  },
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
    },
    arbitrumSepolia: {
      url: ARBITRUM_SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 421614,
    },
    opSepolia: {
      url: OP_SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155420,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      // Accounts already provided by localhost

      // Still use hardhat's chainId
      chainId: 31337,
    },
  },
  solidity: "0.8.18",
};
