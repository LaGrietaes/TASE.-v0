"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Search, Settings, User, LogOut, Eye, Plus } from "lucide-react";
import { auth } from "@/lib/firebase"; // Assuming auth is exported from your firebase file
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react"; // Import useEffect and React

interface TopNavigationProps {
  onToggleTaskTracker: () => void;
  trackedTasksCount: number;
  sidebarCollapsed?: boolean;
}

export function TopNavigation({
  onToggleTaskTracker,
  trackedTasksCount,
  sidebarCollapsed = false,
}: TopNavigationProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // State variables for authentication
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  console.log("🔝 TopNavigation render:", {
    trackedTasksCount,
    sidebarCollapsed,
  });

  // Effect to listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array means this effect runs only once on mount

  // Function to handle user sign-in
  const handleSignIn = async () => {
    setError(null); // Clear previous errors
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // User state will be updated by the onAuthStateChanged listener
      setEmail(""); // Clear form
      setPassword(""); // Clear form
    } catch (error: any) {
      setError(error.message); // Display error message
      console.error("Error signing in:", error);
    }
  };

  // Function to handle user sign-out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // User state will be updated by the onAuthStateChanged listener
    } catch (error: any) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header
      className={`fixed top-0 right-0 h-16 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700/50 z-30 transition-all duration-300 ${
        sidebarCollapsed ? "left-16" : "left-0"
      }`}
    >
      <div className="flex items-center justify-between h-full px-6">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search tasks, projects, or commands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Quick Add */}
          <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-800">
            <Plus className="h-4 w-4" />
          </Button>

          {/* Task Tracker Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleTaskTracker}
            className="relative text-gray-300 hover:text-white hover:bg-gray-800"
          >
            <Eye className="h-4 w-4" />
            {trackedTasksCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-blue-600 text-white border-0 flex items-center justify-center">
              {trackedTasksCount}
              </Badge>
            )}
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative text-gray-300 hover:text-white hover:bg-gray-800">
            <Bell className="h-4 w-4" />
            {/* Corrected Badge className */}
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-blue-600 text-white border-0 flex items-center justify-center">
              3
            </Badge>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="User" />
                  <AvatarFallback className="bg-gray-700 text-white">TC</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700" align="end" forceMount>
              {/* Conditional rendering based on 'user' state */}
              {user ? (
                // User Profile (show when logged in)
                <>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      {/* Use user.displayName if available, otherwise show "User" */}
                      <p className="text-sm font-medium leading-none text-white">{user.displayName || "User"}</p>
                      {/* Display user's email */}
                      <p className="text-xs leading-none text-gray-400">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  {/* Profile, Settings, Logout items here */}
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </>
              ) : (
                // Login Form (show when NOT logged in)
                <div className="p-4 space-y-4">
                  <p className="text-sm font-medium leading-none text-white text-center">Sign In</p>
                  <div className="space-y-2">
                    <Input
                      type="email"
                      placeholder="Email"
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 text-sm"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                      type="password"
                      placeholder="Password"
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 text-sm"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {/* Display error message if exists */}
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm"
                    onClick={handleSignIn} // Call handleSignIn on click
                  >
                    Login
                  </Button>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
