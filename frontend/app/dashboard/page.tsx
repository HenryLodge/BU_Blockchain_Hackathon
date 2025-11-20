"use client";

import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data - replace with blockchain data later
const mockStats = {
  itemsFound: 3,
  itemsLost: 1,
  activeMatches: 2,
  rewardsEarned: "0.015",
  rewardsPaid: "0.005",
};

const mockFoundReports = [
  {
    id: 1,
    itemName: "Black Backpack",
    brand: "Nike",
    location: "Student Center",
    dateFound: "2025-01-15",
    status: "matched",
    reward: "0.01",
  },
  {
    id: 2,
    itemName: "iPhone 14",
    brand: "Apple",
    location: "Library 3rd Floor",
    dateFound: "2025-01-14",
    status: "pending",
    reward: null,
  },
  {
    id: 3,
    itemName: "Blue Water Bottle",
    brand: "Hydro Flask",
    location: "Gym",
    dateFound: "2025-01-13",
    status: "confirmed",
    reward: "0.005",
  },
];

const mockLostReports = [
  {
    id: 1,
    itemName: "Laptop Charger",
    brand: "Dell",
    location: "Computer Lab",
    dateLost: "2025-01-12",
    status: "matched",
    reward: "0.005",
  },
];

const mockMatches = [
  {
    id: 1,
    itemName: "Black Backpack",
    matchDate: "2025-01-16",
    status: "pending_confirmation",
    reward: "0.01",
    otherParty: "0x742d...4e5f",
  },
  {
    id: 2,
    itemName: "Laptop Charger",
    matchDate: "2025-01-15",
    status: "confirmed",
    reward: "0.005",
    otherParty: "0x8a3c...9d2b",
  },
];

const mockActivity = [
  {
    id: 1,
    type: "match",
    message: "Match found for Black Backpack",
    timestamp: "2025-01-16 14:30",
  },
  {
    id: 2,
    type: "report",
    message: "Reported found item: iPhone 14",
    timestamp: "2025-01-14 10:15",
  },
  {
    id: 3,
    type: "confirmation",
    message: "Exchange confirmed for Laptop Charger",
    timestamp: "2025-01-15 16:45",
  },
  {
    id: 4,
    type: "reward",
    message: "Received 0.005 ETH reward",
    timestamp: "2025-01-15 16:46",
  },
];

export default function DashboardPage() {
  const getStatusBadge = (status: string) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      matched: "bg-blue-100 text-blue-800 border-blue-300",
      confirmed: "bg-green-100 text-green-800 border-green-300",
      pending_confirmation: "bg-purple-100 text-purple-800 border-purple-300",
    };
    const labels = {
      pending: "Pending",
      matched: "Matched",
      confirmed: "Confirmed",
      pending_confirmation: "Pending Confirmation",
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getActivityIcon = (type: string) => {
    const icons = {
      match: "🎯",
      report: "📝",
      confirmation: "✅",
      reward: "💰",
    };
    return icons[type as keyof typeof icons] || "📌";
  };

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
          <Link href="/category" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            Category Search
          </Link>
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
            Dashboard
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            About
          </Link>
          <ConnectButton />
        </nav>
      </header>

      {/* Dashboard Content */}
      <section className="max-w-7xl mx-auto mt-8 px-6 pb-12 w-full">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-gray-600 mt-2">
            Track your found items, lost items, and matches all in one place.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Items Found</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{mockStats.itemsFound}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Items Lost</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">{mockStats.itemsLost}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Active Matches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{mockStats.activeMatches}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Rewards Earned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-600">{mockStats.rewardsEarned} ETH</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Rewards Paid</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">{mockStats.rewardsPaid} ETH</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="found" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="found">Found Items</TabsTrigger>
            <TabsTrigger value="lost">Lost Items</TabsTrigger>
            <TabsTrigger value="matches">Matches</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          {/* Found Items Tab */}
          <TabsContent value="found" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Your Found Item Reports</h3>
              <Link href="/report">
                <Button>Report New Item</Button>
              </Link>
            </div>
            
            <div className="grid gap-4">
              {mockFoundReports.map((report) => (
                <Card key={report.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-semibold">{report.itemName}</h4>
                          {getStatusBadge(report.status)}
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p><span className="font-medium">Brand:</span> {report.brand}</p>
                          <p><span className="font-medium">Location Found:</span> {report.location}</p>
                          <p><span className="font-medium">Date Found:</span> {report.dateFound}</p>
                          {report.reward && (
                            <p className="text-green-600 font-medium">Reward: {report.reward} ETH</p>
                          )}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Lost Items Tab */}
          <TabsContent value="lost" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Your Lost Item Reports</h3>
              <Link href="/find">
                <Button>Report Lost Item</Button>
              </Link>
            </div>
            
            <div className="grid gap-4">
              {mockLostReports.map((report) => (
                <Card key={report.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-semibold">{report.itemName}</h4>
                          {getStatusBadge(report.status)}
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p><span className="font-medium">Brand:</span> {report.brand}</p>
                          <p><span className="font-medium">Location Lost:</span> {report.location}</p>
                          <p><span className="font-medium">Date Lost:</span> {report.dateLost}</p>
                          <p className="text-orange-600 font-medium">Reward Offered: {report.reward} ETH</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Matches Tab */}
          <TabsContent value="matches" className="space-y-4">
            <h3 className="text-xl font-semibold">Your Matches</h3>
            
            <div className="grid gap-4">
              {mockMatches.map((match) => (
                <Card key={match.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-semibold">{match.itemName}</h4>
                          {getStatusBadge(match.status)}
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p><span className="font-medium">Match Date:</span> {match.matchDate}</p>
                          <p><span className="font-medium">Other Party:</span> {match.otherParty}</p>
                          <p className="text-green-600 font-medium">Reward: {match.reward} ETH</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {match.status === "pending_confirmation" && (
                          <Button size="sm">Confirm Exchange</Button>
                        )}
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-4">
            <h3 className="text-xl font-semibold">Recent Activity</h3>
            
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {mockActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 pb-4 border-b last:border-b-0 last:pb-0">
                      <div className="text-2xl">{getActivityIcon(activity.type)}</div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.message}</p>
                        <p className="text-sm text-gray-500">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
