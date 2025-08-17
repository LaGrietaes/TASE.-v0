"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Clock, User, Activity } from "lucide-react"

interface ActivityItem {
  id: string
  timestamp: string
  user: string
  action: string
  details: string
  type: "info" | "warning" | "error" | "success"
}

export function ActivityLog() {
  const activities: ActivityItem[] = [
    {
      id: "ACT-001",
      timestamp: "2024-01-16T14:32:15Z",
      user: "ADMIN-001",
      action: "System Override Created",
      details: "Emergency power mode enabled",
      type: "warning",
    },
    {
      id: "ACT-002",
      timestamp: "2024-01-16T14:30:42Z",
      user: "OPS-002",
      action: "Mission Status Updated",
      details: "Mission M001 progress updated to 65%",
      type: "info",
    },
    {
      id: "ACT-003",
      timestamp: "2024-01-16T14:28:18Z",
      user: "SEC-001",
      action: "Security Alert",
      details: "Unauthorized access attempt detected",
      type: "error",
    },
    {
      id: "ACT-004",
      timestamp: "2024-01-16T14:25:33Z",
      user: "TECH-003",
      action: "System Diagnostic",
      details: "All systems health check completed",
      type: "success",
    },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "info":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "warning":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "error":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "success":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString()
  }

  return (
    <Card className="bg-card/50 border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-mono flex items-center gap-2">
          <Activity className="h-4 w-4" />
          ACTIVITY LOG
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px]">
          <div className="space-y-2 p-4">
            {activities.map((activity) => (
              <div key={activity.id} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs font-mono text-muted-foreground">{formatTime(activity.timestamp)}</span>
                  </div>
                  <Badge className={`text-xs ${getTypeColor(activity.type)}`}>{activity.type.toUpperCase()}</Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <User className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs font-mono text-blue-400">{activity.user}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs font-semibold">{activity.action}</span>
                  </div>
                  <p className="text-xs text-muted-foreground ml-5">{activity.details}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
