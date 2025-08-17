"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  Calendar,
  CheckSquare,
  Settings,
  Database,
  BarChart3,
  Activity,
  Film,
  Edit,
  Youtube,
  Globe,
  Briefcase,
} from "lucide-react"

interface AppSidebarProps {
  activeView: string
  setActiveView: (view: string) => void
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

export function AppSidebar({ activeView, setActiveView, collapsed, setCollapsed }: AppSidebarProps) {
  const [hovering, setHovering] = useState(false)

  const handleMouseEnter = () => {
    if (typeof setCollapsed === "function") {
      setHovering(true)
      if (collapsed) {
        setCollapsed(false)
      }
    }
  }

  const handleMouseLeave = () => {
    if (typeof setCollapsed === "function") {
      setHovering(false)
      if (!collapsed) {
        setCollapsed(true)
      }
    }
  }

  const handleViewChange = (view: string) => {
    if (typeof setActiveView === "function") {
      setActiveView(view)
    }
  }

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, badge: null },
    { id: "tasks", label: "Task Board", icon: CheckSquare, badge: null },
    { id: "calendar", label: "Calendar", icon: Calendar, badge: null },
    { id: "film", label: "Film", icon: Film, badge: null },
    { id: "edit", label: "Edit", icon: Edit, badge: null },
    { id: "youtube", label: "YouTube", icon: Youtube, badge: null },
    { id: "web", label: "Web", icon: Globe, badge: null },
    { id: "business", label: "Business", icon: Briefcase, badge: null },
    { id: "systems", label: "Systems", icon: Activity, badge: null },
    { id: "analytics", label: "Analytics", icon: BarChart3, badge: null },
    { id: "database", label: "Database", icon: Database, badge: null },
  ]

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-gray-900/95 backdrop-blur-sm border-r border-gray-700/50 transition-all duration-300 z-50 ${
        collapsed && !hovering ? "w-16" : "w-64"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-gray-700/50">
          <div className="flex items-center justify-between">
            {(!collapsed || hovering) && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center">
                  <span className="text-white font-bold text-sm">TC</span>
                </div>
                <span className="text-white font-semibold">TACTICAL COMMAND</span>
              </div>
            )}
            {collapsed && !hovering && (
              <div className="w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-sm">TC</span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeView === item.id

            return (
              <Button
                key={item.id}
                variant="ghost"
                className={`w-full justify-start h-10 px-3 transition-colors ${
                  isActive
                    ? "bg-red-600/20 text-red-400 border border-red-600/30"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                } ${collapsed && !hovering ? "px-2" : ""}`}
                onClick={() => handleViewChange(item.id)}
              >
                <Icon className={`h-4 w-4 ${collapsed && !hovering ? "mx-auto" : "mr-3"}`} />
                {(!collapsed || hovering) && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="bg-red-600 text-white text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700/50">
          <Button
            variant="ghost"
            className={`w-full justify-start h-10 px-3 text-gray-400 hover:text-white hover:bg-gray-800/50 ${
              collapsed && !hovering ? "px-2" : ""
            }`}
            onClick={() => handleViewChange("settings")}
          >
            <Settings className={`h-4 w-4 ${collapsed && !hovering ? "mx-auto" : "mr-3"}`} />
            {(!collapsed || hovering) && <span>Settings</span>}
          </Button>
        </div>
      </div>
    </div>
  )
}
