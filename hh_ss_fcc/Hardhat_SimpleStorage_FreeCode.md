# HH_SS_FCC - Hardhat SimpleStorage Project

**Author:** Peile Wu  
**Email:** peile.wu.1990@gmail.com  
**Date:** October 19, 2025

---

A beginner-friendly Solidity smart contract project built with Hardhat. This project demonstrates how to create, compile, and deploy a simple smart contract to both local and testnet environments.

## Project Overview

This is an educational project showcasing the basics of Hardhat development workflow, including contract compilation, local deployment, and testnet integration.

### Key Features

- **SimpleStorage Smart Contract**: A basic Solidity contract demonstrating state variables, mappings, and struct usage
- **Local Development**: Deploy and test contracts on Hardhat's built-in local network
- **Testnet Deployment**: Deploy contracts to Sepolia testnet with environment configuration
- **Automated Deployment Scripts**: Ready-to-use deployment scripts for streamlined contract deployment

## Project Structure

```
HH_SS_FCC/
├── artifacts/              # Compiled contract artifacts
├── cache/                  # Hardhat cache directory
├── contracts/
│   └── SimpleStorage.sol   # Main smart contract
├── scripts/
│   └── deploy.js          # Contract deployment script
├── test/                  # Test files directory
├── .env                   # Environment variables (not included in repo)
├── .gitignore             # Git ignore rules
├── hardhat.config.js      # Hardhat configuration
├── package.json           # Project dependencies
└── README.md              # This file
```

## Prerequisites

- **Node.js**: v14 or higher
- **Yarn**: Package manager (or npm)
- **MetaMask or similar**: For testnet interactions (optional)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/HH_SS_FCC.git
cd HH_SS_FCC
```

2. Install dependencies:

```bash
yarn install
```

**Setup with Yarn:**

![yarn_init](img/yarn_init.png)

3. Compile contracts:

```bash
yarn hardhat compile
```

**Create Hardhat Project:**

![hardhat_project_choose](img/hardhat_project_choose.png)

**Edit Contract:**

![edit_contract](img/edit_contract.png)

4. Check Hardhat version:

```bash
npm view hardhat versions --json
```

![hardhat_version](img/hardhat_version.png)

## Configuration

### Local Development (No Setup Required)

To deploy on Hardhat's local network, simply run:

```bash
yarn hardhat run scripts/deploy.js
```

### Sepolia Testnet Deployment

To deploy on Sepolia testnet, follow these steps:

1. Create a `.env` file in the project root:

```env
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID
PRIVATE_KEY=your_private_key_here
```

2. Obtain credentials:

   - **RPC URL**: Get from [Infura](https://infura.io/) or [Alchemy](https://www.alchemy.com/)
   - **Private Key**: Export from MetaMask (use a test wallet only)

3. Configure hardhat.config.js to include Sepolia network settings:

![add_sepolia_testnet](img/add_sepolia_testnet.png)

4. Deploy to Sepolia:

```bash
yarn hardhat run scripts/deploy.js --network sepolia
```

⚠️ **Security Warning**: Never commit your `.env` file to version control. The private key should only be used with test wallets containing minimal funds.

## Smart Contract Details

### SimpleStorage.sol

A foundational smart contract demonstrating core Solidity concepts:

**State Variables:**

- `favoriteNumber`: Stores a uint256 value
- `nameTofavoriteNumber`: Mapping from name to favorite number
- `people`: Array of People structs

**Key Functions:**

- `store(uint256)`: Updates the favorite number
- `retrieve()`: Retrieves the current favorite number
- `add()`: Pure function demonstrating basic math
- `addPerson(string, uint256)`: Adds a person to the people array

**Solidity Version:** 0.8.18+

## Deployment

### Local Network

```bash
yarn hardhat run scripts/deploy.js
```

### Sepolia Testnet

```bash
yarn hardhat run scripts/deploy.js --network sepolia
```

**Deployment Example:**

![contract_deployed](img/contract_deployed.png)

**View on Sepolia Etherscan:**

![sepolia_etherscan](img/sepolia_etherscan.png)

## Available Scripts

```bash
# Compile contracts
yarn hardhat compile

# Deploy to local network
yarn hardhat run scripts/deploy.js

# Deploy to Sepolia testnet
yarn hardhat run scripts/deploy.js --network sepolia

# Run tests
yarn hardhat test

# Start local network node
yarn hardhat node

# Get help
yarn hardhat help
```

## Technologies Used

- **Hardhat**: Ethereum development environment (v2.26.3)
- **Solidity**: Smart contract language
- **Ethers.js**: Ethereum library integration
- **dotenv**: Environment variable management

## Chain IDs

- **Sepolia Testnet**: 11155111
- **Hardhat Local Network**: 31337 (default)

## Useful Resources

- [Hardhat Documentation](https://hardhat.org/docs)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [Sepolia Etherscan](https://sepolia.etherscan.io/)
- [Chainlist](https://chainlist.org/) - RPC endpoints and chain IDs
- [Infura](https://infura.io/) - RPC provider

## License

MIT

---

This project is for educational purposes. Always use test wallets and testnet funds when learning and experimenting with smart contracts.
