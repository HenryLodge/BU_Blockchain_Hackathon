"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ProfileDialog } from "@/components/ui/auth-dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { getUserProfile, isProfileComplete } from "@/lib/data-store";
import { AuthButton } from "@/components/auth-button";
import { AnimatedCard } from "@/components/animated-card";
import { ShimmerButton } from "@/components/shimmer-button";
import { motion } from "framer-motion";

export default function LandingPage() {
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const { address, isConnected } = useAccount();
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    if (address) {
      setHasProfile(isProfileComplete(address));
    }
  }, [address]);
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
          <AuthButton />
        </nav>
      </header>

      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-24 px-6 max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center md:items-start text-center md:text-left"
        >
          <h2 className="text-5xl font-bold tracking-tight max-w-2xl">
            Lost Something on Campus?
            <br />
            <span className="text-blue-600">We've Got You Covered.</span>
          </h2>

          <p className="text-gray-600 text-lg mt-4 max-w-xl">
            LostChain is a blockchain-powered lost and found platform designed for college campuses. 
            Report found items, claim what's yours, and earn rewards. All secured by smart contracts 
            that protect privacy and prevent fraud.
          </p>

          {/* Get Started CTA */}
          <div className="mt-8 flex gap-4">
            {!isConnected ? (
              <div className="flex flex-col gap-3">
                <p className="text-sm text-gray-600">Connect your wallet to get started</p>
                <AuthButton />
              </div>
            ) : !hasProfile ? (
              <ShimmerButton 
                size="lg" 
                className="px-12 py-6 text-lg"
                onClick={() => setShowProfileDialog(true)}
              >
                Complete Profile
              </ShimmerButton>
            ) : (
              <div className="flex gap-4">
                <Link href="/find">
                  <ShimmerButton size="lg" className="px-8 py-6 text-lg">
                    Report Lost Item
                  </ShimmerButton>
                </Link>
                <Link href="/report">
                  <Button size="lg" variant="outline" className="px-8 py-6 text-lg hover:bg-blue-50">
                    Report Found Item
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 z-10" />
          <Image
            src="/college-students.png"
            alt="College students on campus"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </section>

      {/* Feature Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 px-6 max-w-5xl mx-auto mb-20">
        <AnimatedCard delay={0.1}>
          <CardContent className="p-6">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="text-xl font-semibold text-blue-600">Privacy Preserved</h3>
            <p className="text-gray-600 mt-2">
              Owners reveal detailed descriptions only after a finder logs a
              cryptographic commitment hash.
            </p>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard delay={0.2}>
          <CardContent className="p-6">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="text-xl font-semibold text-blue-600">Instant Rewards</h3>
            <p className="text-gray-600 mt-2">
              The smart contract automatically pays the finder when a valid claim
              matches their commitment.
            </p>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard delay={0.3}>
          <CardContent className="p-6">
            <div className="text-4xl mb-3">🛡️</div>
            <h3 className="text-xl font-semibold text-blue-600">Fraud-Resistant</h3>
            <p className="text-gray-600 mt-2">
              No one can fake ownership or front-run claims due to the hash-based
              verification scheme.
            </p>
          </CardContent>
        </AnimatedCard>
      </section>

      <Separator />

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm">
        &copy; 2025 LostChain. All rights reserved.
      </footer>

      {/* Profile Dialog */}
      <ProfileDialog 
        open={showProfileDialog} 
        onOpenChange={setShowProfileDialog}
        onProfileComplete={() => {
          setHasProfile(true);
          setShowProfileDialog(false);
        }}
      />
    </main>
  );
}
