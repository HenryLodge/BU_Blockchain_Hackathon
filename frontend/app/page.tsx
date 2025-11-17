"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { AuthDialog } from "@/components/auth-dialog";
import Image from "next/image";

export default function LandingPage() {
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
          <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            About
          </Link>
          <ConnectButton />
        </nav>
      </header>

      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-24 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-4xl font-bold tracking-tight max-w-2xl">
            Lost Something on Campus?
            <span className="text-blue-600"> We've Got You Covered.</span>
          </h2>

          <p className="text-gray-600 text-lg mt-4 max-w-xl">
            LostChain is a blockchain-powered lost and found platform designed for college campuses. 
            Report found items, claim what's yours, and earn rewards—all secured by smart contracts 
            that protect privacy and prevent fraud.
          </p>

          {/* Get Started CTA */}
          <div className="mt-8">
            <AuthDialog />
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
          <Image
            src="/college-students.png"
            alt="College students on campus"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Feature Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 px-6 max-w-5xl mx-auto mb-20">
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold">🔒 Privacy Preserved</h3>
            <p className="text-gray-600 mt-2">
              Owners reveal detailed descriptions only after a finder logs a
              cryptographic commitment hash.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold">⚡ Instant Rewards</h3>
            <p className="text-gray-600 mt-2">
              The smart contract automatically pays the finder when a valid claim
              matches their commitment.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold">🛡️ Fraud-Resistant</h3>
            <p className="text-gray-600 mt-2">
              No one can fake ownership or front-run claims due to the hash-based
              verification scheme.
            </p>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm">
        &copy; 2025 LostChain. All rights reserved.
      </footer>
    </main>
  );
}
