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

module.exports = { networkConfig };
