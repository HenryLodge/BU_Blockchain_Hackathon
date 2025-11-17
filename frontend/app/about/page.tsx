"use client";

import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-4 flex items-center justify-between border-b bg-white">
        <Link href="/">
          <h1 className="text-3xl font-bold tracking-tight text-blue-600 hover:text-blue-700 transition-colors cursor-pointer">
            LostChain
          </h1>
        </Link>
        
        <nav className="flex items-center gap-8">
          <Link href="/find" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            Find Item
          </Link>
          <Link href="/report" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            Report Item
          </Link>
          <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            Dashboard
          </Link>
          <Link href="/about" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
            About
          </Link>
          <ConnectButton />
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">About LostChain</h2>
          <p className="text-xl text-blue-100 leading-relaxed">
            A blockchain-powered lost and found platform designed to reunite college students 
            with their belongings through trustless, transparent, and incentivized matching.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We believe that losing something shouldn't mean it's gone forever. LostChain leverages 
            blockchain technology to create a secure, fraud-resistant platform that rewards honesty 
            and makes it easy to return lost items to their rightful owners.
          </p>
        </div>

        {/* Core Values */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <Card className="text-center">
            <CardContent className="p-8">
              <div className="text-4xl mb-4">🔒</div>
              <h4 className="text-xl font-semibold mb-3">Privacy First</h4>
              <p className="text-gray-600">
                Cryptographic hashing ensures item details remain private until a match is confirmed, 
                protecting both finders and owners.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-8">
              <div className="text-4xl mb-4">🤝</div>
              <h4 className="text-xl font-semibold mb-3">Trustless System</h4>
              <p className="text-gray-600">
                Smart contracts eliminate the need for intermediaries, automatically matching items 
                and distributing rewards without human intervention.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-8">
              <div className="text-4xl mb-4">💎</div>
              <h4 className="text-xl font-semibold mb-3">Incentivized Honesty</h4>
              <p className="text-gray-600">
                Finders are rewarded with cryptocurrency for reporting items, creating a positive 
                incentive structure that encourages good behavior.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
          
          <div className="space-y-12">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                1
              </div>
              <div className="flex-1">
                <h4 className="text-2xl font-semibold mb-3">Report a Found Item</h4>
                <p className="text-gray-600 text-lg">
                  A finder discovers a lost item and reports it on LostChain. They provide detailed 
                  information including the item name, brand, color, distinctive features, and where 
                  it was found. This information is hashed using cryptographic algorithms before being 
                  stored on the blockchain.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                2
              </div>
              <div className="flex-1">
                <h4 className="text-2xl font-semibold mb-3">Submit a Lost Item Claim</h4>
                <p className="text-gray-600 text-lg">
                  The owner realizes their item is missing and submits a claim with matching details. 
                  They also attach an ETH reward (minimum 0.001 ETH) that gets locked in the smart 
                  contract as escrow. The claim details are also hashed for privacy.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                3
              </div>
              <div className="flex-1">
                <h4 className="text-2xl font-semibold mb-3">Automatic Matching</h4>
                <p className="text-gray-600 text-lg">
                  The smart contract automatically compares the cryptographic hashes of all found and 
                  lost reports. When all hashes match (item name, brand, model, color, condition, 
                  location, and distinctive features), a potential match is created.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                4
              </div>
              <div className="flex-1">
                <h4 className="text-2xl font-semibold mb-3">Confirm Exchange & Get Rewarded</h4>
                <p className="text-gray-600 text-lg">
                  Both parties are notified of the match and can coordinate the physical exchange. 
                  Once either party confirms the exchange in the app, the smart contract automatically 
                  releases the escrowed ETH reward to the finder's wallet. No intermediaries needed!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h3 className="text-3xl font-bold text-center mb-12">Built With Cutting-Edge Technology</h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <h4 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <span className="text-2xl">⛓️</span>
                Blockchain & Smart Contracts
              </h4>
              <p className="text-gray-600 mb-3">
                Built on Ethereum using Solidity smart contracts for trustless, automated matching 
                and payment distribution. All transactions are transparent and immutable.
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-6 list-disc">
                <li>Solidity 0.8.2+ for secure contract development</li>
                <li>Reentrancy protection on all ETH transfers</li>
                <li>Automated escrow and payment system</li>
                <li>Event-driven architecture for real-time updates</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h4 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <span className="text-2xl">🔐</span>
                Cryptographic Privacy
              </h4>
              <p className="text-gray-600 mb-3">
                Uses Keccak256 hashing to protect sensitive item details while enabling accurate 
                matching. Only matching hashes reveal the connection between reports.
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-6 list-disc">
                <li>Client-side hashing before blockchain submission</li>
                <li>Salt-based protection against rainbow tables</li>
                <li>Text normalization for consistent matching</li>
                <li>Privacy-preserving commitment scheme</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h4 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <span className="text-2xl">💻</span>
                Modern Frontend
              </h4>
              <p className="text-gray-600 mb-3">
                Built with Next.js 15 and TypeScript for a fast, responsive, and type-safe user 
                experience. Beautiful UI powered by Tailwind CSS and shadcn/ui components.
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-6 list-disc">
                <li>Next.js 15 with App Router</li>
                <li>TypeScript for type safety</li>
                <li>Tailwind CSS for modern styling</li>
                <li>shadcn/ui component library</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h4 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <span className="text-2xl">🔗</span>
                Web3 Integration
              </h4>
              <p className="text-gray-600 mb-3">
                Seamless wallet connection and blockchain interaction using RainbowKit and Wagmi. 
                Support for all major Ethereum wallets.
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-6 list-disc">
                <li>RainbowKit for wallet connection</li>
                <li>Wagmi hooks for Ethereum interactions</li>
                <li>Viem for low-level blockchain operations</li>
                <li>Multi-wallet support (MetaMask, WalletConnect, etc.)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Blockchain Section */}
      <section className="bg-blue-50 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-8">Why Blockchain?</h3>
          <div className="space-y-6 text-lg text-gray-700">
            <p>
              Traditional lost and found systems rely on centralized databases and manual verification, 
              which can be slow, opaque, and vulnerable to fraud. LostChain uses blockchain technology 
              to solve these problems:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-white p-6 rounded-lg">
                <h4 className="font-semibold text-blue-600 mb-2">🚫 No Intermediaries</h4>
                <p className="text-gray-600">
                  Smart contracts automatically match items and distribute rewards without requiring 
                  a trusted third party.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg">
                <h4 className="font-semibold text-blue-600 mb-2">🔍 Complete Transparency</h4>
                <p className="text-gray-600">
                  All transactions are recorded on the blockchain, creating an auditable trail that 
                  anyone can verify.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg">
                <h4 className="font-semibold text-blue-600 mb-2">🛡️ Fraud Prevention</h4>
                <p className="text-gray-600">
                  Cryptographic hashing prevents malicious actors from claiming items they don't own 
                  or gaming the system.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg">
                <h4 className="font-semibold text-blue-600 mb-2">⚡ Instant Payments</h4>
                <p className="text-gray-600">
                  Rewards are automatically released the moment an exchange is confirmed—no waiting 
                  for manual processing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto py-16 px-6 text-center">
        <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
        <p className="text-lg text-gray-600 mb-8">
          Join LostChain today and help create a more honest, efficient lost and found system for your campus.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/report">
            <Button size="lg" className="text-lg px-8">
              Report Found Item
            </Button>
          </Link>
          <Link href="/find">
            <Button size="lg" variant="outline" className="text-lg px-8">
              Find Lost Item
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-gray-500 text-sm bg-white">
        <p>&copy; 2025 LostChain. Built for college campuses everywhere.</p>
        <p className="mt-2">Powered by Ethereum • Secured by Cryptography • Driven by Community</p>
      </footer>
    </main>
  );
}
