# LostChain

A blockchain-powered lost and found platform for college campuses.

## Overview

LostChain uses blockchain technology to create a trustless, transparent, and incentivized lost and found system. By leveraging smart contracts and cryptographic commitments, we ensure privacy, prevent fraud, and automatically reward honest finders.

## Features

- **Privacy-Preserving**: Cryptographic commitment hashes prevent malicious claims
- **Instant Rewards**: Smart contracts automatically release rewards to finders
- **Fraud-Resistant**: Commitment-reveal protocol ensures only true owners can claim items
- **Decentralized**: Built on Ethereum with transparent, immutable transactions

## Tech Stack

### Frontend
- Next.js 15
- TypeScript
- TailwindCSS
- RainbowKit (Wallet Connection)
- Wagmi (Ethereum interactions)
- shadcn/ui components

### Backend
- Solidity smart contracts
- Ethereum blockchain


## How It Works

### User Flow

1. **Report Found Item**: A finder reports a lost item with detailed information (item name, brand, model, color, condition, distinct features, location, date)
2. **Cryptographic Commitment**: The description is hashed and stored on-chain as a commitment hash
3. **Submit Claim**: The owner submits their own description of the lost item through the "Find Item" form
4. **Match & Reward**: If descriptions match, the smart contract releases the reward and provides pickup information, including the finder's phone number for coordination


#### Blockchain Implementation

**Smart Contract Architecture (Solidity)**

The core of LostChain relies on several blockchain features:

1. **Cryptographic Commitment Scheme**
   - When a finder reports an item, the item details are hashed using `keccak256` (Ethereum's native hashing function)
   - The hash is stored on-chain without revealing the actual details
   - This prevents malicious actors from viewing item descriptions and making false claims

2. **Commitment-Reveal Protocol**
   - Owner submits their description, which is also hashed
   - Smart contract compares the two hashes
   - Only matching hashes trigger the reward release
   - This ensures only the true owner with accurate details can claim the item

3. **Automated Escrow & Rewards**
   - Finders deposit a small stake when reporting items (incentivizes honest reporting)
   - Owners deposit a reward when submitting a claim
   - Smart contract automatically releases funds when a match is confirmed
   - No intermediaries or manual verification needed

4. **Immutable Record Keeping**
   - All item reports and claims are permanently recorded on the blockchain
   - Provides transparent audit trail
   - Prevents tampering or deletion of records

5. **Decentralized Identity**
   - Wallet addresses serve as user identities
   - No centralized database of user information
   - Privacy-preserving while maintaining accountability

**Key Blockchain Features Used:**
- **Smart Contracts**: Automated matching and reward distribution
- **Cryptographic Hashing**: Privacy-preserving item descriptions
- **Immutability**: Permanent, tamper-proof records
- **Trustless Execution**: No need for a central authority
- **Transparent Transactions**: All actions verifiable on-chain

#### Privacy & Security

- **Phone numbers** are stored encrypted on-chain and only revealed upon successful match
- **Item descriptions** are never stored in plain text on the blockchain
- **Wallet signatures** authenticate all transactions
- **Gas optimization** ensures cost-effective operations


