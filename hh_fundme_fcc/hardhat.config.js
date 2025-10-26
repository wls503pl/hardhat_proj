require("dotenv").config();
require("hardhat-deploy");
require("@nomiclabs/hardhat-etherscan");

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "";
const ARBITRUM_SEPOLIA_RPC_URL = process.env.ARBITRUM_SEPOLIA_RPC_URL || "";
const OP_SEPOLIA_RPC_URL = process.env.OP_SEPOLIA_RPC_URL || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";

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
      blockConfirmations: 3,
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
      blockConfirmations: 3,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      // Accounts already provided by localhost

      // Still use hardhat's chainId
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  solidity: {
    compilers: [{ version: "0.6.18" }, { version: "0.8.18" }],
  },
};
