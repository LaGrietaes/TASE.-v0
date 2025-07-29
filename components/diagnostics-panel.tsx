"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, XCircle, Clock, Activity, Thermometer, Zap, Gauge } from "lucide-react"
import { useMissionData } from "@/hooks/use-mission-data"

export function DiagnosticsPanel() {
  const { missionData } = useMissionData()
  const { diagnostics } = missionData

  const getStatusColor = (status: string) => {
    switch (status) {
      case "HEALTHY":
        return "text-tactical-green border-tactical-green bg-tactical-green/10"
      case "WARNING":
        return "text-tactical-amber border-tactical-amber bg-tactical-amber/10"
      case "CRITICAL":
        return "text-tactical-red border-tactical-red bg-tactical-red/10"
      case "OFFLINE":
        return "text-muted-foreground border-muted-foreground bg-muted/10"
      default:
        return "text-muted-foreground border-border"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "HEALTHY":
        return <CheckCircle className="h-3 w-3" />
      case "WARNING":
        return <AlertTriangle className="h-3 w-3" />
      case "CRITICAL":
        return <XCircle className="h-3 w-3" />
      case "OFFLINE":
        return <XCircle className="h-3 w-3" />
      default:
        return <AlertTriangle className="h-3 w-3" />
    }
  }

  const healthyCount = diagnostics.filter((d) => d.status === "HEALTHY").length
  const warningCount = diagnostics.filter((d) => d.status === "WARNING").length
  const criticalCount = diagnostics.filter((d) => d.status === "CRITICAL").length
  const offlineCount = diagnostics.filter((d) => d.status === "OFFLINE").length

  return (
    <div className="space-y-4">
      {/* Diagnostics Overview */}
      <Card className="border-border bg-card">
        <CardHeader className="border-b border-border pb-2">
          <CardTitle className="text-xs font-mono uppercase tracking-wider flex items-center gap-2">
            <Activity className="h-3 w-3" />
            SYSTEM DIAGNOSTICS OVERVIEW
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">HEALTHY</div>
              <div className="text-2xl font-mono text-tactical-green">{healthyCount}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">WARNING</div>
              <div className="text-2xl font-mono text-tactical-amber">{warningCount}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">CRITICAL</div>
              <div className="text-2xl font-mono text-tactical-red">{criticalCount}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">OFFLINE</div>
              <div className="text-2xl font-mono text-muted-foreground">{offlineCount}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* System Health Status */}
        <Card className="border-border bg-card">
          <CardHeader className="border-b border-border pb-2">
            <CardTitle className="text-xs font-mono uppercase tracking-wider">SYSTEM HEALTH STATUS</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-96 overflow-auto">
              <div className="space-y-2 p-4">
                {diagnostics.map((diagnostic) => (
                  <div key={diagnostic.id} className={`border-l-2 pl-3 py-2 ${getStatusColor(diagnostic.status)}`}>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-mono font-semibold">
                          {diagnostic.system} - {diagnostic.component}
                        </div>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(diagnostic.status)}
                          <span className="text-xs font-mono">{diagnostic.status}</span>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">{diagnostic.details}</div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Last: {new Date(diagnostic.lastCheck).toLocaleTimeString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Next: {new Date(diagnostic.nextCheck).toLocaleTimeString()}
                        </div>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Button className="tactical-button h-6 px-2 text-xs">RUN CHECK</Button>
                        <Button className="tactical-button h-6 px-2 text-xs">VIEW LOGS</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Metrics */}
        <Card className="border-border bg-card">
          <CardHeader className="border-b border-border pb-2">
            <CardTitle className="text-xs font-mono uppercase tracking-wider">SYSTEM METRICS</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-96 overflow-auto">
              <div className="space-y-3 p-4">
                {diagnostics.slice(0, 6).map((diagnostic) => (
                  <div key={diagnostic.id} className="border border-border p-3 space-y-2">
                    <div className="text-xs font-mono font-semibold">
                      {diagnostic.system} - {diagnostic.component}
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Thermometer className="h-3 w-3" />
                          TEMP
                        </div>
                        <div className="text-xs font-mono">{diagnostic.metrics.temperature?.toFixed(1) || "N/A"}°C</div>
                        <div className="w-full bg-secondary h-1">
                          <div
                            className={`h-1 ${diagnostic.metrics.temperature > 60 ? "bg-tactical-red" : diagnostic.metrics.temperature > 45 ? "bg-tactical-amber" : "bg-tactical-green"}`}
                            style={{ width: `${Math.min(100, (diagnostic.metrics.temperature / 80) * 100)}%` }}
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Zap className="h-3 w-3" />
                          VOLT
                        </div>
                        <div className="text-xs font-mono">{diagnostic.metrics.voltage?.toFixed(1) || "N/A"}V</div>
                        <div className="w-full bg-secondary h-1">
                          <div
                            className={`h-1 ${diagnostic.metrics.voltage < 11 || diagnostic.metrics.voltage > 13 ? "bg-tactical-red" : "bg-tactical-green"}`}
                            style={{ width: `${Math.min(100, (diagnostic.metrics.voltage / 15) * 100)}%` }}
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Gauge className="h-3 w-3" />
                          AMP
                        </div>
                        <div className="text-xs font-mono">{diagnostic.metrics.current?.toFixed(1) || "N/A"}A</div>
                        <div className="w-full bg-secondary h-1">
                          <div
                            className={`h-1 ${diagnostic.metrics.current > 4 ? "bg-tactical-red" : diagnostic.metrics.current > 3 ? "bg-tactical-amber" : "bg-tactical-green"}`}
                            style={{ width: `${Math.min(100, (diagnostic.metrics.current / 5) * 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-border bg-card">
        <CardHeader className="border-b border-border pb-2">
          <CardTitle className="text-xs font-mono uppercase tracking-wider">DIAGNOSTIC ACTIONS</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="tactical-button h-10 flex flex-col items-center justify-center gap-1">
              <Activity className="h-4 w-4" />
              <span className="text-xs">RUN FULL SCAN</span>
            </Button>
            <Button className="tactical-button h-10 flex flex-col items-center justify-center gap-1">
              <CheckCircle className="h-4 w-4" />
              <span className="text-xs">HEALTH CHECK</span>
            </Button>
            <Button className="tactical-button h-10 flex flex-col items-center justify-center gap-1">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-xs">VIEW ALERTS</span>
            </Button>
            <Button className="tactical-button h-10 flex flex-col items-center justify-center gap-1">
              <Clock className="h-4 w-4" />
              <span className="text-xs">SCHEDULE MAINT</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
