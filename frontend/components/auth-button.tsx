"use client";

import { Button } from "@/components/ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";
import { getUserProfile } from "@/lib/data-store";
import { useState, useEffect } from "react";
import { ProfileDialog } from "@/components/ui/auth-dialog";
import { LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AuthButton() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [showProfileDialog, setShowProfileDialog] = useState(false);

  useEffect(() => {
    if (address) {
      setUserProfile(getUserProfile(address));
    } else {
      setUserProfile(null);
    }
  }, [address]);

  const handleLogout = () => {
    disconnect();
    setUserProfile(null);
  };

  // Not connected - show connect button
  if (!isConnected) {
    return <ConnectButton />;
  }

  // Connected but no profile - show complete profile button
  if (!userProfile) {
    return (
      <>
        <Button onClick={() => setShowProfileDialog(true)}>
          Complete Profile to Login
        </Button>
        <ProfileDialog
          open={showProfileDialog}
          onOpenChange={setShowProfileDialog}
          onProfileComplete={() => {
            if (address) {
              setUserProfile(getUserProfile(address));
            }
          }}
        />
      </>
    );
  }

  // Logged in - show user menu
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <User className="h-4 w-4" />
            {userProfile.fullName}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-sm text-gray-600">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowProfileDialog(true)}>
            <User className="mr-2 h-4 w-4" />
            Edit Profile
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ProfileDialog
        open={showProfileDialog}
        onOpenChange={setShowProfileDialog}
        onProfileComplete={() => {
          if (address) {
            setUserProfile(getUserProfile(address));
          }
        }}
      />
    </>
  );
}
