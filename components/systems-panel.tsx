"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Settings, Power, RefreshCw, AlertTriangle, CheckCircle, XCircle, Cpu, HardDrive } from "lucide-react"
import { useMissionData } from "@/hooks/use-mission-data"

export function SystemsPanel() {
  const { missionData } = useMissionData()
  const { systems } = missionData

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ONLINE":
        return "text-tactical-green border-tactical-green bg-tactical-green/10"
      case "MAINTENANCE":
        return "text-tactical-amber border-tactical-amber bg-tactical-amber/10"
      case "ERROR":
        return "text-tactical-red border-tactical-red bg-tactical-red/10"
      case "OFFLINE":
        return "text-muted-foreground border-muted-foreground bg-muted/10"
      default:
        return "text-muted-foreground border-border"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ONLINE":
        return <CheckCircle className="h-3 w-3" />
      case "MAINTENANCE":
        return <Settings className="h-3 w-3" />
      case "ERROR":
        return <XCircle className="h-3 w-3" />
      case "OFFLINE":
        return <Power className="h-3 w-3" />
      default:
        return <AlertTriangle className="h-3 w-3" />
    }
  }

  const onlineCount = systems.filter((s) => s.status === "ONLINE").length
  const maintenanceCount = systems.filter((s) => s.status === "MAINTENANCE").length
  const errorCount = systems.filter((s) => s.status === "ERROR").length
  const offlineCount = systems.filter((s) => s.status === "OFFLINE").length

  return (
    <div className="space-y-4">
      {/* Systems Overview */}
      <Card className="border-border bg-card">
        <CardHeader className="border-b border-border pb-2">
          <CardTitle className="text-xs font-mono uppercase tracking-wider flex items-center gap-2">
            <Settings className="h-3 w-3" />
            SYSTEM MODULES STATUS
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">ONLINE</div>
              <div className="text-2xl font-mono text-tactical-green">{onlineCount}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">MAINTENANCE</div>
              <div className="text-2xl font-mono text-tactical-amber">{maintenanceCount}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">ERROR</div>
              <div className="text-2xl font-mono text-tactical-red">{errorCount}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">OFFLINE</div>
              <div className="text-2xl font-mono text-muted-foreground">{offlineCount}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {systems.map((system) => (
          <Card
            key={system.id}
            className={`border-2 ${getStatusColor(system.status).split(" ")[1]} ${getStatusColor(system.status).split(" ")[2]}`}
          >
            <CardHeader className="border-b border-border pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-mono uppercase tracking-wider">{system.name}</CardTitle>
                <div className="flex items-center gap-1">
                  {getStatusIcon(system.status)}
                  <span className={`text-xs font-mono ${getStatusColor(system.status).split(" ")[0]}`}>
                    {system.status}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <div className="text-muted-foreground">VERSION</div>
                  <div className="font-mono">{system.version}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">UPTIME</div>
                  <div className="font-mono">{system.uptime.toFixed(1)}%</div>
                </div>
              </div>

              {/* CPU Usage */}
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Cpu className="h-3 w-3" />
                  CPU: {system.cpu.toFixed(1)}%
                </div>
                <div className="w-full bg-secondary h-2">
                  <div
                    className={`h-2 ${system.cpu > 80 ? "bg-tactical-red" : system.cpu > 60 ? "bg-tactical-amber" : "bg-tactical-green"}`}
                    style={{ width: `${Math.min(100, system.cpu)}%` }}
                  />
                </div>
              </div>

              {/* Memory Usage */}
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <HardDrive className="h-3 w-3" />
                  MEMORY: {system.memory.toFixed(1)}%
                </div>
                <div className="w-full bg-secondary h-2">
                  <div
                    className={`h-2 ${system.memory > 80 ? "bg-tactical-red" : system.memory > 60 ? "bg-tactical-amber" : "bg-tactical-green"}`}
                    style={{ width: `${Math.min(100, system.memory)}%` }}
                  />
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                Last Restart: {new Date(system.lastRestart).toLocaleDateString()}
              </div>

              <div className="flex gap-2">
                <Button className="tactical-button h-6 px-2 text-xs flex-1">
                  <RefreshCw className="h-3 w-3 mr-1" />
                  RESTART
                </Button>
                <Button className="tactical-button h-6 px-2 text-xs flex-1">
                  <Settings className="h-3 w-3 mr-1" />
                  CONFIG
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Actions */}
      <Card className="border-border bg-card">
        <CardHeader className="border-b border-border pb-2">
          <CardTitle className="text-xs font-mono uppercase tracking-wider">SYSTEM ACTIONS</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="tactical-button h-10 flex flex-col items-center justify-center gap-1">
              <Power className="h-4 w-4" />
              <span className="text-xs">POWER CYCLE</span>
            </Button>
            <Button className="tactical-button h-10 flex flex-col items-center justify-center gap-1">
              <RefreshCw className="h-4 w-4" />
              <span className="text-xs">RESTART ALL</span>
            </Button>
            <Button className="tactical-button h-10 flex flex-col items-center justify-center gap-1">
              <Settings className="h-4 w-4" />
              <span className="text-xs">SYSTEM CONFIG</span>
            </Button>
            <Button className="tactical-button h-10 flex flex-col items-center justify-center gap-1">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-xs">EMERGENCY STOP</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
