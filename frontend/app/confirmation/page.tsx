"use client";

import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ArrowRight, Bell, Search, FileText } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type"); // 'find' or 'report'
  const isFind = type === "find";

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

      {/* Confirmation Section */}
      <section className="max-w-3xl mx-auto mt-16 px-6 pb-12 w-full">
        {/* Success Icon and Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            {isFind ? "Lost Item Report Submitted!" : "Found Item Report Submitted!"}
          </h1>
          <p className="text-xl text-gray-600">
            {isFind 
              ? "Your report has been recorded on the blockchain. We'll notify you if a match is found."
              : "Thank you for helping! The owner will be notified if there's a match."}
          </p>
        </div>

        {/* What Happens Next */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowRight className="w-5 h-5 text-blue-600" />
              What Happens Next?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isFind ? (
              <>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Smart Contract Matching</h3>
                    <p className="text-gray-600 text-sm">
                      Our blockchain system will automatically search for matching found items based on your description.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Notification</h3>
                    <p className="text-gray-600 text-sm">
                      If a match is found, you'll receive a notification with details about where to pick up your item.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Verification & Reward</h3>
                    <p className="text-gray-600 text-sm">
                      Verify ownership by providing the distinct features you described. Your reward will be automatically released to the finder.
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Blockchain Recording</h3>
                    <p className="text-gray-600 text-sm">
                      Your found item report is now permanently recorded on the blockchain for transparency and security.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Automatic Matching</h3>
                    <p className="text-gray-600 text-sm">
                      The system will check for matching lost item reports and notify the owner if there's a match.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Reward Collection</h3>
                    <p className="text-gray-600 text-sm">
                      Once the owner verifies and picks up their item, you'll automatically receive the reward in ETH.
                    </p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <Link href="/dashboard">
              <CardHeader className="pb-3">
                <Bell className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle className="text-lg">View Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Track your submissions and check for matches
                </CardDescription>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <Link href={isFind ? "/report" : "/find"}>
              <CardHeader className="pb-3">
                <Search className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle className="text-lg">
                  {isFind ? "Report Found Item" : "Find Lost Item"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  {isFind ? "Found something? Report it here" : "Lost something else? Report it"}
                </CardDescription>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <Link href="/about">
              <CardHeader className="pb-3">
                <FileText className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle className="text-lg">Learn More</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  How LostChain works and our mission
                </CardDescription>
              </CardContent>
            </Link>
          </Card>
        </div>

        {/* Return Home Button */}
        <div className="text-center">
          <Link href="/">
            <Button size="lg" className="px-8">
              Return to Home
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
