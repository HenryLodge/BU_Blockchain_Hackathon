"use client";

import Link from "next/link";
import { AuthButton } from "@/components/auth-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { getLostItems, getFoundItems, getActivity, getMatches, getStats, getUserProfile } from "@/lib/data-store";
import type { LostItemReport, FoundItemReport, Activity, Match, UserProfile } from "@/lib/data-store";
import { useAccount } from "wagmi";
import { ProfileDialog } from "@/components/ui/auth-dialog";
import { User } from "lucide-react";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    itemsFound: 0,
    itemsLost: 0,
    activeMatches: 0,
    rewardsEarned: "0.000",
    rewardsPaid: "0.000",
  });
  const [foundReports, setFoundReports] = useState<FoundItemReport[]>([]);
  const [lostReports, setLostReports] = useState<LostItemReport[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [activity, setActivity] = useState<Activity[]>([]);
  const { address, isConnected } = useAccount();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showProfileDialog, setShowProfileDialog] = useState(false);

  useEffect(() => {
    // Load data from storage for the connected user
    if (address) {
      setStats(getStats(address));
      setFoundReports(getFoundItems(address));
      setLostReports(getLostItems(address));
      setMatches(getMatches(address));
      setActivity(getActivity(address));
      setUserProfile(getUserProfile(address));
    }
  }, [address]);
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
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
            Dashboard
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            About
          </Link>
          <AuthButton />
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
              <div className="text-3xl font-bold text-blue-600">{stats.itemsFound}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Items Lost</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">{stats.itemsLost}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Active Matches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.activeMatches}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Rewards Earned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-600">{stats.rewardsEarned} ETH</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Rewards Paid</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">{stats.rewardsPaid} ETH</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="found" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="found">Found Items</TabsTrigger>
            <TabsTrigger value="lost">Lost Items</TabsTrigger>
            <TabsTrigger value="matches">Matches</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
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
              {foundReports.length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center text-gray-500">
                    No found items reported yet. <Link href="/report" className="text-blue-600 hover:underline">Report your first item</Link>.
                  </CardContent>
                </Card>
              ) : (
                foundReports.map((report) => (
                  <Card key={report.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-semibold">{report.itemType} - {report.brand}</h4>
                            {getStatusBadge(report.status)}
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p><span className="font-medium">Brand:</span> {report.brand}</p>
                            <p><span className="font-medium">Location Found:</span> {report.locationFound}</p>
                            <p><span className="font-medium">Date Found:</span> {report.dateFound}</p>
                            <p><span className="font-medium">Color:</span> {report.color}</p>
                            {report.reward && (
                              <p className="text-green-600 font-medium">Reward: {report.reward} ETH</p>
                            )}
                          </div>
                        </div>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
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
              {lostReports.length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center text-gray-500">
                    No lost items reported yet. <Link href="/find" className="text-blue-600 hover:underline">Report your first lost item</Link>.
                  </CardContent>
                </Card>
              ) : (
                lostReports.map((report) => (
                  <Card key={report.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-semibold">{report.itemType} - {report.brand}</h4>
                            {getStatusBadge(report.status)}
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p><span className="font-medium">Brand:</span> {report.brand}</p>
                            <p><span className="font-medium">Location Lost:</span> {report.location}</p>
                            <p><span className="font-medium">Date Lost:</span> {report.dateLost}</p>
                            <p><span className="font-medium">Color:</span> {report.color}</p>
                            <p className="text-orange-600 font-medium">Reward Offered: {report.rewardAmount} ETH</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Matches Tab */}
          <TabsContent value="matches" className="space-y-4">
            <h3 className="text-xl font-semibold">Your Matches</h3>
            
            <div className="grid gap-4">
              {matches.length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center text-gray-500">
                    No matches found yet. Matches will appear here when items are matched.
                  </CardContent>
                </Card>
              ) : (
                matches.map((match) => (
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
                ))
              )}
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-4">
            <h3 className="text-xl font-semibold">Recent Activity</h3>
            
            <Card>
              <CardContent className="p-6">
                {activity.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    No activity yet. Your activity will appear here when you report items.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {activity.map((activityItem) => (
                      <div key={activityItem.id} className="flex items-start gap-4 pb-4 border-b last:border-b-0 last:pb-0">
                        <div className="text-2xl">{getActivityIcon(activityItem.type)}</div>
                        <div className="flex-1">
                          <p className="font-medium">{activityItem.message}</p>
                          <p className="text-sm text-gray-500">{activityItem.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4">
            <h3 className="text-xl font-semibold">Your Profile</h3>
            
            {userProfile ? (
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-4 flex-1">
                        <div>
                          <p className="text-sm text-gray-500">Full Name</p>
                          <p className="text-lg font-medium">{userProfile.fullName}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="text-lg font-medium">{userProfile.email}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500">Phone Number</p>
                          <p className="text-lg font-medium">{userProfile.phoneNumber}</p>
                        </div>
                        
                        {userProfile.university && (
                          <div>
                            <p className="text-sm text-gray-500">University</p>
                            <p className="text-lg font-medium">{userProfile.university}</p>
                          </div>
                        )}
                        
                        <div>
                          <p className="text-sm text-gray-500">Wallet Address</p>
                          <p className="text-sm font-mono text-gray-700">{userProfile.walletAddress}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500">Member Since</p>
                          <p className="text-sm text-gray-700">
                            {new Date(userProfile.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={() => setShowProfileDialog(true)}
                        variant="outline"
                      >
                        <User className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6 text-center text-gray-500">
                  No profile found. Please complete your profile to get started.
                  <div className="mt-4">
                    <Button onClick={() => setShowProfileDialog(true)}>
                      Complete Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </section>

      {/* Profile Dialog */}
      <ProfileDialog 
        open={showProfileDialog} 
        onOpenChange={setShowProfileDialog}
        onProfileComplete={() => {
          // Reload profile data
          if (address) {
            setUserProfile(getUserProfile(address));
          }
          setShowProfileDialog(false);
        }}
      />
    </main>
  );
}
