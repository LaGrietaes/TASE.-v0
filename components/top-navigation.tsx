"use client"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Activity, Wifi, WifiOff, AlertCircle, RefreshCw, Plus } from "lucide-react"
import { useMissionData } from "@/hooks/use-mission-data"

export function TopNavigation() {
  const { missionData, connectionStatus, lastUpdate, refreshData, error } = useMissionData()
  const { systemStatus } = missionData

  const getStatusColor = (status: string) => {
    switch (status) {
      case "OPERATIONAL":
      case "SECURE":
      case "CONNECTED":
        return "text-tactical-green"
      case "DEGRADED":
      case "UNSECURE":
      case "CONNECTING":
        return "text-tactical-amber"
      case "OFFLINE":
      case "DISCONNECTED":
        return "text-tactical-red"
      default:
        return "text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "OPERATIONAL":
        return <Activity className="h-3 w-3" />
      case "CONNECTED":
      case "SECURE":
        return <Wifi className="h-3 w-3" />
      case "DISCONNECTED":
        return <WifiOff className="h-3 w-3" />
      default:
        return <AlertCircle className="h-3 w-3" />
    }
  }

  return (
    <header className="flex items-center justify-between border-b border-border bg-card px-4 py-2">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="tactical-button h-6 w-6 p-1" />
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-tactical-red" />
          <h1 className="font-mono text-sm uppercase tracking-wider">OPERATION NIGHTFALL - COMMAND CENTER</h1>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Quick Add Task */}
        <Button
          className="tactical-button h-6 px-2"
          onClick={() => window.dispatchEvent(new CustomEvent("openQuickAdd"))}
        >
          <Plus className="h-3 w-3 mr-1" />
          QUICK ADD
        </Button>

        {/* System Status */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">SYS:</span>
          <div className={`flex items-center gap-1 ${getStatusColor(systemStatus.overall)}`}>
            {getStatusIcon(systemStatus.overall)}
            <span className="text-xs font-mono uppercase">{systemStatus.overall}</span>
          </div>
        </div>

        {/* Connection Status */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">CONN:</span>
          <div className={`flex items-center gap-1 ${getStatusColor(connectionStatus)}`}>
            {getStatusIcon(connectionStatus)}
            <span className="text-xs font-mono uppercase">{connectionStatus}</span>
          </div>
        </div>

        <Button
          className="tactical-button h-6 px-2 py-0"
          onClick={refreshData}
          disabled={connectionStatus === "CONNECTING"}
        >
          <RefreshCw className="h-3 w-3 mr-1" />
          REFRESH
        </Button>

        {error && <div className="text-xs font-mono text-tactical-red">ERROR: {error}</div>}
      </div>
    </header>
  )
}
