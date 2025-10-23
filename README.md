# Hardhat Learning Projects

A collection of Solidity smart contract projects built with Hardhat, designed for learning blockchain development.

**Author:** Peile Wu  
**Email:** peile.wu.1990@gmail.com  
**Last Updated:** October 23, 2025

---

## Overview

This repository contains educational Hardhat projects exploring different aspects of smart contract development. Each project is self-contained with comprehensive documentation organized in the `README.md/` directory.

---

## Project 1: Hardhat_SimpleStorage (hh_ss_fcc/)

A foundational project demonstrating the complete development workflow with full TypeScript support:

**Core Features:**

- Smart contract creation, compilation, and deployment to local/testnet networks
- Sepolia testnet deployment with contract verification on Etherscan
- Custom Hardhat tasks for chain interaction
- Interactive development with Hardhat Console
- Comprehensive testing with Mocha/Chai framework
- Gas cost analysis and code coverage measurement
- TypeScript support with TypeChain for type-safe contract interaction

**Documentation** (in `README.md/` directory):

- [hh_ss_fcc.md](./README.md/hh_ss_fcc.md) - Core setup, deployment, and verification
- [hardhat_test.md](./README.md/hardhat_test.md) - Testing, gas reporting, and coverage
- [SimpleStorage_Typescript.md](./README.md/SimpleStorage_Typescript.md) - TypeScript migration

---

## Quick Start

```bash
# Install dependencies
yarn install

# Compile contracts
yarn hardhat compile

# Run tests
yarn hardhat test

# Deploy to local network
yarn hardhat run scripts/deploy.ts

# Deploy to Sepolia testnet
yarn hardhat run scripts/deploy.ts --network sepolia
```

---

## Essential Commands

| Command                                           | Purpose                       |
| ------------------------------------------------- | ----------------------------- |
| `yarn hardhat compile`                            | Compile contracts             |
| `yarn hardhat test`                               | Run all tests                 |
| `yarn hardhat test --grep "keyword"`              | Run specific tests            |
| `yarn hardhat coverage`                           | Measure test coverage         |
| `yarn hardhat block-number`                       | Custom task: get block number |
| `yarn hardhat node`                               | Start local development node  |
| `yarn hardhat console --network localhost`        | Interactive console           |
| `yarn hardhat verify --network sepolia <address>` | Verify on Etherscan           |

---

## Setup for Testnet Deployment

Create `.env` file in project root:

```env
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID
PRIVATE_KEY=your_test_wallet_private_key
ETHERSCAN_API_KEY=your_etherscan_api_key
COINMARKETCAP_API_KEY=your_coinmarketcap_api_key
```

⚠️ **Never commit `.env`. Use test wallets with minimal funds only.**

---

## Project Structure

```
hh_ss_fcc/
├── contracts/              # Solidity smart contracts
├── scripts/                # Deployment scripts (TypeScript)
├── tasks/                  # Custom Hardhat tasks
├── test/                   # Test suite (TypeScript)
├── typechain-types/        # Auto-generated contract types
├── hardhat.config.ts       # Configuration
└── tsconfig.json           # TypeScript config
```

---

## Why Testing Matters

Smart contracts are publicly deployed on the blockchain and exposed to anyone. Comprehensive testing is your first line of defense against bugs and exploits. Many projects have failed due to insufficient testing—see [rekt.news](https://rekt.news/) for real examples.

**Key aspects covered:**

- Unit tests with Mocha/Chai framework
- Gas optimization analysis
- Code coverage measurement (aim for 80-90%)

Refer to [hardhat_test.md](./README.md/hardhat_test.md) for detailed testing practices and security considerations.

---

## Resources

- [Hardhat Documentation](https://hardhat.org/docs)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [Sepolia Etherscan](https://sepolia.etherscan.io/)
- [rekt.news](https://rekt.news/) - Learn from security failures
- [Chainlist](https://chainlist.org/) - Network configurations

---

## License

MIT

---

**Note:** For educational purposes. Always test thoroughly on testnet before any mainnet deployment.
