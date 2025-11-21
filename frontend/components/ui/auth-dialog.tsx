"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUserProfile, getUserProfile, updateUserProfile } from "@/lib/data-store";
import { useAccount } from "wagmi";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProfileComplete?: () => void;
}

export function ProfileDialog({ open, onOpenChange, onProfileComplete }: ProfileDialogProps) {
  const { address } = useAccount();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    university: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load existing profile data when dialog opens
  useEffect(() => {
    if (open && address) {
      const profile = getUserProfile(address);
      if (profile) {
        setFormData({
          fullName: profile.fullName,
          email: profile.email,
          phoneNumber: profile.phoneNumber,
          university: profile.university || "",
        });
      }
    }
  }, [open, address]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!address) {
      setError("Please connect your wallet first");
      return;
    }

    // Validate phone number format
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      setError("Please enter a valid phone number");
      return;
    }

    // Validate email
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Check if profile exists to determine if we're creating or updating
      const existingProfile = getUserProfile(address);
      
      if (existingProfile) {
        // Update existing profile
        updateUserProfile(address, {
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          university: formData.university,
        });
        console.log("Profile updated successfully");
      } else {
        // Create new profile
        createUserProfile({
          walletAddress: address,
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          university: formData.university,
        });
        console.log("Profile created successfully");
      }

      onOpenChange(false);
      onProfileComplete?.();
    } catch (err) {
      setError("Failed to save profile. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(""); // Clear error when user types
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Complete Your Profile
          </DialogTitle>
          <DialogDescription className="text-center">
            We need some information to help reunite you with your items
          </DialogDescription>
        </DialogHeader>
        
        {error && (
          <Alert className="border-red-500 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSignup} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@university.edu"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number *</Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="(123) 456-7890"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              required
            />
            <p className="text-xs text-gray-500">
              We'll use this to contact you when your item is found
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="university">University (Optional)</Label>
            <Input
              id="university"
              type="text"
              placeholder="Boston University"
              value={formData.university}
              onChange={(e) => handleInputChange("university", e.target.value)}
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating Profile..." : "Complete Profile"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
