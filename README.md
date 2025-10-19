# Hardhat Learning Projects

A collection of Solidity smart contract projects built with Hardhat, designed for learning blockchain development.

**Author:** Peile Wu  
**Email:** peile.wu.1990@gmail.com  
**Last Updated:** October 19, 2025

---

## Overview

This repository contains multiple Hardhat projects exploring different aspects of smart contract development. Each project is self-contained with its own documentation and configuration.

## Projects

### Project 1: Hardhat_SimpleStorage

**Location:** `hh_ss_fcc/`

A foundational Hardhat project demonstrating contract creation, compilation, and deployment. Deploy a simple smart contract to Hardhat's local network and Sepolia testnet.

**More Details:** [hh_ss_fcc/README.md](./hh_ss_fcc/Hardhat_SimpleStorage_FreeCode.md)

---

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/your-username/hardhat_proj.git
cd hardhat_proj
```

2. Navigate to a project:

```bash
cd hh_ss_fcc  # or any other project
```

3. Install dependencies:

```bash
yarn install
```

## General Commands

```bash
yarn hardhat compile           # Compile contracts
yarn hardhat run scripts/deploy.js              # Deploy locally
yarn hardhat run scripts/deploy.js --network sepolia  # Deploy to testnet
yarn hardhat node              # Start local node
yarn hardhat test              # Run tests
```

## Prerequisites

- Node.js v22.10.0
- Yarn v1.22.22
- npm v10.9.0
- Git v2.44.0.windows.1

## Useful Resources

- [Hardhat Docs](https://hardhat.org/docs)
- [Solidity Docs](https://docs.soliditylang.org/)
- [Sepolia Etherscan](https://sepolia.etherscan.io/)
- [Chainlist](https://chainlist.org/)

## Security Notes

⚠️ Never commit `.env` files  
⚠️ Use test wallets with minimal funds  
⚠️ Keep private keys secure

## License

MIT

---

**Note:** For educational purposes. Always use testnet funds when learning.
