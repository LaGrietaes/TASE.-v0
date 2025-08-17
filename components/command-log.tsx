"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Terminal, Clock } from "lucide-react"

interface CommandEntry {
  id: string
  timestamp: string
  user: string
  command: string
  result: "success" | "error" | "warning"
  output: string
}

export function CommandLog() {
  const commands = [
    {
      id: "CMD-001",
      timestamp: "2024-01-16T14:32:15Z",
      user: "ADMIN-001",
      command: "system.override.power.emergency_mode = true",
      result: "success" as const,
      output: "Emergency power mode activated successfully",
    },
    {
      id: "CMD-002",
      timestamp: "2024-01-16T14:30:42Z",
      user: "OPS-002",
      command: "mission.update M001 --progress 65",
      result: "success" as const,
      output: "Mission M001 progress updated to 65%",
    },
    {
      id: "CMD-003",
      timestamp: "2024-01-16T14:28:18Z",
      user: "SEC-001",
      command: "security.scan --full --immediate",
      result: "warning" as const,
      output: "Scan completed with 3 warnings detected",
    },
    {
      id: "CMD-004",
      timestamp: "2024-01-16T14:25:33Z",
      user: "TECH-003",
      command: "diagnostics.run --all-systems",
      result: "error" as const,
      output: "Error: Camera network offline, diagnostic failed",
    },
  ]

  const getResultColor = (result: string) => {
    switch (result) {
      case "success":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "warning":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "error":
        return "bg-red-500/20 text-red-400 border-red-500/30"
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
          <Terminal className="h-4 w-4" />
          COMMAND LOG
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px]">
          <div className="space-y-2 p-4">
            {commands.map((cmd) => (
              <div key={cmd.id} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs font-mono text-muted-foreground">{formatTime(cmd.timestamp)}</span>
                    <span className="text-xs font-mono text-blue-400">{cmd.user}</span>
                  </div>
                  <Badge className={`text-xs ${getResultColor(cmd.result)}`}>{cmd.result.toUpperCase()}</Badge>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-mono bg-black/20 p-2 rounded border">
                    <span className="text-green-400">$</span> {cmd.command}
                  </div>
                  <div className="text-xs text-muted-foreground ml-2">{cmd.output}</div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
