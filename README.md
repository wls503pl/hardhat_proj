# Hardhat Learning Projects

A collection of Solidity smart contract projects built with Hardhat, designed for learning blockchain development.

**Author:** Peile Wu  
**Email:** peile.wu.1990@gmail.com  
**Last Updated:** October 22, 2025

---

## Overview

This repository contains multiple Hardhat projects exploring different aspects of smart contract development. Each project is self-contained with its own documentation and configuration.

## Projects

### Project 1: Hardhat_SimpleStorage (hh_ss_fcc/)

A foundational Hardhat project demonstrating the complete development workflow:

- Contract creation, compilation, and deployment
- Local development with Hardhat network
- Sepolia testnet deployment and verification
- Custom Hardhat tasks
- Hardhat Console for interactive development
- Contract testing with Mocha/Chai framework

**Full Documentation:** [hh_ss_fcc.md](./hh_ss_fcc/hh_ss_fcc.md)

---

## Quick Start

1. Clone and install:

```bash
git clone https://github.com/your-username/hardhat_proj.git
cd hardhat_proj/hh_ss_fcc
yarn install
```

2. Compile contracts:

```bash
yarn hardhat compile
```

3. Deploy locally:

```bash
yarn hardhat run scripts/deploy.js
```

## Core Commands

| Command                                                | Purpose                   |
| ------------------------------------------------------ | ------------------------- |
| `yarn hardhat compile`                                 | Compile contracts         |
| `yarn hardhat run scripts/deploy.js`                   | Deploy to local network   |
| `yarn hardhat run scripts/deploy.js --network sepolia` | Deploy to Sepolia testnet |
| `yarn hardhat test`                                    | Run test suite            |
| `yarn hardhat node`                                    | Start local node          |
| `yarn hardhat console --network localhost`             | Interactive console       |
| `yarn hardhat verify --network sepolia <address>`      | Verify on Etherscan       |

## Prerequisites

- Node.js: v22.10.0
- Yarn: v1.22.22
- Git: v2.44.0.windows.1

## Environment Setup

Create `.env` file for testnet deployment:

```env
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID
PRIVATE_KEY=your_test_wallet_private_key
ETHERSCAN_API_KEY=your_etherscan_api_key
```

⚠️ **Never commit `.env` files. Use test wallets with minimal funds only.**

## Key Resources

- [Hardhat Documentation](https://hardhat.org/docs)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [Sepolia Etherscan](https://sepolia.etherscan.io/)
- [Chainlist](https://chainlist.org/)

## Project Structure

```
hh_ss_fcc/
├── contracts/           # Smart contracts
├── scripts/             # Deployment scripts
├── tasks/               # Custom Hardhat tasks
├── test/                # Test files
├── hardhat.config.js    # Hardhat configuration
├── .env                 # Environment variables (not in repo)
└── hh_ss_fcc.md         # Full project documentation
```

## Security & Testing

Testing is essential for smart contract security. This project includes comprehensive Mocha/Chai tests covering:

- State initialization
- Function behavior
- Transaction handling
- Edge cases

Run tests with:

```bash
yarn hardhat test
yarn hardhat test --grep "keyword"
```

For security best practices, see [hardhat_test.md](./hardhat_test.md)

## License

MIT

---

**Note:** For educational purposes. Always validate on testnet before mainnet deployment.
