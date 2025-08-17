"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Search, Settings, User, LogOut, Eye, Plus } from "lucide-react"

interface TopNavigationProps {
  onToggleTaskTracker: () => void
  trackedTasksCount: number
  sidebarCollapsed?: boolean
}

export function TopNavigation({
  onToggleTaskTracker,
  trackedTasksCount,
  sidebarCollapsed = false,
}: TopNavigationProps) {
  const [searchQuery, setSearchQuery] = useState("")

  console.log("🔝 TopNavigation render:", {
    trackedTasksCount,
    sidebarCollapsed,
  })

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
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-600 text-white border-0 flex items-center justify-center">
                {trackedTasksCount}
              </Badge>
            )}
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative text-gray-300 hover:text-white hover:bg-gray-800">
            <Bell className="h-4 w-4" />
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
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-white">Tactical Command</p>
                  <p className="text-xs leading-none text-gray-400">admin@tacticalcommand.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
