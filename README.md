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
- Keccak256 cryptographic hashing
- Automated escrow system

## Smart Contract

The `LostChain.sol` smart contract is the core of the system, implementing a trustless matching and payment system.

### Key Components

**Data Structures**

1. **ItemDescription Struct**: Stores hashed item attributes
   - `itemNameHash`: Hashed item name
   - `brandHash`: Hashed brand name
   - `modelHash`: Hashed model number
   - `colorHash`: Hashed color
   - `conditionFeaturesHash`: Hashed condition
   - `locationBuildingHash`: Hashed location
   - `distinctiveFeaturesHash`: Hashed unique features

2. **ReportFoundItem Struct**: Stores found item reports
   - Item description hashes
   - Finder's wallet address
   - Date found and report timestamp
   - Salt for additional security
   - Payment status

3. **ReportLostItem Struct**: Stores lost item reports
   - Item description hashes
   - Owner's wallet address
   - ETH reward amount (locked in escrow)
   - Date lost and report timestamp
   - Salt for additional security
   - Match and refund status

4. **LostFoundMatch Struct**: Stores match information
   - Found and lost report IDs
   - Finder and owner addresses
   - Reward amount
   - Confirmation and payment status

### Core Functions

**1. reportFoundItem()**
- Finder submits item details (already hashed on frontend)
- Validates all required fields are present
- Stores report on-chain with unique ID
- Automatically checks for matches with existing lost reports
- Emits `FoundReportSubmitted` event

**2. reportLostItem()**
- Owner submits item details with ETH reward (minimum 0.001 ETH)
- Uses `nonReentrant` modifier to prevent reentrancy attacks
- Locks ETH in contract as escrow
- Stores report on-chain with unique ID
- Automatically checks for matches with existing found reports
- Emits `LostReportSubmitted` event

**3. checkForMatches()**
- Internal function called automatically after each report
- Iterates through all opposite-type reports (found checks lost, vice versa)
- Compares item description hashes using `descriptionsMatch()`
- Creates match record if all hashes match
- Locks the escrow for matched reports
- Emits `PotentialMatchFound` event

**4. descriptionsMatch()**
- Compares two ItemDescription structs
- Returns true only if ALL hashes match:
  - Item name, brand, model, color, condition, location
  - Distinctive features (optional - can be empty)
- Pure function - no state changes

**5. confirmExchange()**
- Either finder or owner can confirm the physical exchange
- Uses `nonReentrant` modifier for security
- Marks match as confirmed
- Automatically triggers payment to finder
- Emits `MatchConfirmed` event

**6. payFinder()**
- Internal function called after confirmation
- Releases escrowed ETH to finder's wallet
- Marks finder as paid (prevents double payment)
- Emits `RewardPaid` event

**7. cancelLostReport()**
- Allows owner to cancel report and get refund
- Only works if not yet matched
- Returns escrowed ETH to owner
- Uses `nonReentrant` modifier
- Emits `RewardRefunded` event

### Security Features

**Reentrancy Protection**
- `nonReentrant` modifier on all ETH transfer functions
- Prevents callback attacks during payment operations
- Uses lock/unlock pattern

**Text Normalization**
- `formatTextForHashing()` standardizes all text input
- Removes spaces and converts to lowercase
- Ensures consistent hashing regardless of formatting

**Hash-Based Privacy**
- Item details never stored in plain text on-chain
- Uses `keccak256` (Ethereum's native hash function)
- Salt added to prevent rainbow table attacks
- Only matching hashes reveal connection

**Escrow System**
- ETH locked in contract when lost report submitted
- Released only after match confirmation
- Owner can cancel and get refund if no match
- Prevents fraud and ensures payment

### Events

The contract emits events for all major actions:
- `FoundReportSubmitted`: When finder reports item
- `LostReportSubmitted`: When owner reports lost item
- `PotentialMatchFound`: When hashes match
- `MatchConfirmed`: When exchange confirmed
- `RewardPaid`: When finder receives payment
- `RewardRefunded`: When owner cancels and gets refund

These events allow the frontend to listen for real-time updates and notify users.

## How It Works

1. **Report Found Item**: A finder reports a lost item with detailed information (item name, brand, model, color, condition, distinct features, location, date)
2. **Cryptographic Commitment**: The description is hashed and stored on-chain as a commitment hash
3. **Submit Claim**: The owner submits their own description of the lost item through the "Find Item" form
4. **Match & Reward**: If descriptions match, the smart contract releases the reward and provides pickup information, including the finder's phone number for coordination


#### Blockchain Implementation

**Key Blockchain Features Used:**
- **Smart Contracts**: Automated matching and reward distribution
- **Cryptographic Hashing**: Privacy-preserving item descriptions
- **Immutability**: Permanent, tamper-proof records
- **Trustless Execution**: No need for a central authority
- **Transparent Transactions**: All actions verifiable on-chain


