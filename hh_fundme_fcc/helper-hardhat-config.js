/*
 * helper-hardhat-config.js
 *
 * This file maintains a chainId-based configuration mapping that stores network-specific contract addresses and parameters.
 * Similar to Aave's approach, it enables dynamic address resolution based on the current blockchain network.
 * When deploying or interacting with contracts, the code queries this config to retrieve the correct oracle addresses,
 * token addresses, and other network-specific data, allowing seamless multi-chain deployment without hardcoding addresses.
 */

const networkConfig = {
  // Sepolia testnet chainId is 11155111
  11155111: {
    name: "sepolia",
    ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
  },

  // Arbitrum Sepolia chainId is 421614
  421614: {
    name: "arbitrumSepolia",
    ethUsdPriceFeed: "0xd30e2101a97dcbAeBCBC04F14C3f624E67A35165",
  },

  // OP Sepolia chainId is 11155420
  11155420: {
    name: "opSepolia",
    ethUsdPriceFeed: "0x61Ec26aA57019C486B10502285c5A3D4A4750AD7",
  },
};

const developmentChains = ["hardhat", "localhost"];
const DECIMALS = 8;
const INITIAL_ANSWER = 200000000000;

module.exports = { networkConfig, developmentChains, DECIMALS, INITIAL_ANSWER };
