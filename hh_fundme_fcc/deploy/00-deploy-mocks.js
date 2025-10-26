/*
 * 00-deploy-mocks.js
 *
 * This script conditionally deploys mock contracts on local development networks (hardhat, localhost).
 * It checks the current chainId against a list of development chains, and if matched, deploys a MockV3Aggregator contract
 * with predefined parameters (DECIMALS and INITIAL_ANSWER) to simulate real Chainlink price feeds for local testing.
 * This allows developers to test contract interactions without relying on external oracle services during development.
 */
const { network } = require("hardhat");
const {
  developmentChains,
  DECIMALS,
  INITIAL_ANSWER,
} = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  if (developmentChains.includes(network.name)) {
    log("Local network detected! Deploying mocks ...");

    await deploy("MockV3Aggregator", {
      contract: "MockV3Aggregator",
      from: deployer,
      log: true,
      args: [DECIMALS, INITIAL_ANSWER], // parameters for MockV3Aggregator's constructor
    });

    log("Mocks deployed!");
    log("----------------------------------------------");
  }
};
module.exports.tags = ["all", "mocks"];
