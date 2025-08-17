"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Settings, AlertTriangle, CheckCircle, XCircle, RefreshCw, Wrench, Activity } from "lucide-react"

export function DiagnosticsPanel() {
  const [diagnostics, setDiagnostics] = useState([
    {
      system: "RADAR ARRAY",
      status: "OPERATIONAL",
      lastCheck: "14:30:15",
      issues: 0,
      performance: 98,
      nextMaintenance: "72h",
    },
    {
      system: "COMMUNICATION RELAY",
      status: "WARNING",
      lastCheck: "14:28:42",
      issues: 2,
      performance: 85,
      nextMaintenance: "24h",
    },
    {
      system: "POWER GRID",
      status: "OPERATIONAL",
      lastCheck: "14:32:01",
      issues: 0,
      performance: 95,
      nextMaintenance: "168h",
    },
    {
      system: "COOLING SYSTEM",
      status: "CRITICAL",
      lastCheck: "14:25:33",
      issues: 1,
      performance: 67,
      nextMaintenance: "OVERDUE",
    },
    {
      system: "BACKUP GENERATORS",
      status: "OPERATIONAL",
      lastCheck: "14:31:18",
      issues: 0,
      performance: 92,
      nextMaintenance: "48h",
    },
  ])

  const [isRunningDiagnostics, setIsRunningDiagnostics] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setDiagnostics((prev) =>
        prev.map((diag) => ({
          ...diag,
          performance: Math.max(60, Math.min(100, diag.performance + (Math.random() - 0.5) * 5)),
          lastCheck: new Date().toLocaleTimeString("en-US", { hour12: false }),
        })),
      )
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const runDiagnostics = () => {
    setIsRunningDiagnostics(true)
    setTimeout(() => {
      setIsRunningDiagnostics(false)
      setDiagnostics((prev) =>
        prev.map((diag) => ({
          ...diag,
          lastCheck: new Date().toLocaleTimeString("en-US", { hour12: false }),
          issues: Math.max(0, diag.issues - Math.floor(Math.random() * 2)),
        })),
      )
    }, 3000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "OPERATIONAL":
        return "text-green-400 bg-green-400/20 border-green-400/50"
      case "WARNING":
        return "text-yellow-400 bg-yellow-400/20 border-yellow-400/50"
      case "CRITICAL":
        return "text-red-400 bg-red-400/20 border-red-400/50"
      case "OFFLINE":
        return "text-gray-400 bg-gray-400/20 border-gray-400/50"
      default:
        return "text-gray-400 bg-gray-400/20 border-gray-400/50"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "OPERATIONAL":
        return CheckCircle
      case "WARNING":
        return AlertTriangle
      case "CRITICAL":
        return XCircle
      case "OFFLINE":
        return XCircle
      default:
        return AlertTriangle
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-mono text-green-400">SYSTEM DIAGNOSTICS</h1>
        <div className="flex gap-2">
          <Button
            onClick={runDiagnostics}
            disabled={isRunningDiagnostics}
            className="bg-green-400/20 text-green-400 border border-green-400/50 hover:bg-green-400/30 font-mono"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRunningDiagnostics ? "animate-spin" : ""}`} />
            {isRunningDiagnostics ? "RUNNING..." : "RUN DIAGNOSTICS"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {diagnostics.map((diag, index) => {
          const StatusIcon = getStatusIcon(diag.status)
          return (
            <Card key={index} className="bg-slate-900/50 border-green-400/30 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-green-400 font-mono flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  {diag.system}
                  <Badge className={`ml-auto ${getStatusColor(diag.status)}`}>{diag.status}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-green-400/70">Last Check:</span>
                    <div className="text-green-400 font-mono">{diag.lastCheck}</div>
                  </div>
                  <div>
                    <span className="text-green-400/70">Issues:</span>
                    <div className={`font-mono ${diag.issues > 0 ? "text-red-400" : "text-green-400"}`}>
                      {diag.issues}
                    </div>
                  </div>
                  <div>
                    <span className="text-green-400/70">Performance:</span>
                    <div
                      className={`font-mono ${diag.performance > 90 ? "text-green-400" : diag.performance > 75 ? "text-yellow-400" : "text-red-400"}`}
                    >
                      {diag.performance.toFixed(0)}%
                    </div>
                  </div>
                  <div>
                    <span className="text-green-400/70">Next Maintenance:</span>
                    <div
                      className={`font-mono ${diag.nextMaintenance === "OVERDUE" ? "text-red-400" : "text-green-400"}`}
                    >
                      {diag.nextMaintenance}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-400/70">System Performance</span>
                    <span className="text-green-400">{diag.performance.toFixed(0)}%</span>
                  </div>
                  <Progress value={diag.performance} className="h-2 bg-slate-700" />
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    className="bg-blue-400/20 text-blue-400 border border-blue-400/50 hover:bg-blue-400/30 font-mono text-xs"
                  >
                    <Activity className="w-3 h-3 mr-1" />
                    DETAILS
                  </Button>
                  {diag.issues > 0 && (
                    <Button
                      size="sm"
                      className="bg-yellow-400/20 text-yellow-400 border border-yellow-400/50 hover:bg-yellow-400/30 font-mono text-xs"
                    >
                      <Wrench className="w-3 h-3 mr-1" />
                      REPAIR
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="bg-slate-900/50 border-green-400/30 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-green-400 font-mono">SYSTEM OVERVIEW</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="bg-slate-800/50 border border-green-400/20 rounded p-4">
              <div className="text-2xl font-bold text-green-400 font-mono">
                {diagnostics.filter((d) => d.status === "OPERATIONAL").length}
              </div>
              <div className="text-sm text-green-400/70">OPERATIONAL</div>
            </div>
            <div className="bg-slate-800/50 border border-yellow-400/20 rounded p-4">
              <div className="text-2xl font-bold text-yellow-400 font-mono">
                {diagnostics.filter((d) => d.status === "WARNING").length}
              </div>
              <div className="text-sm text-green-400/70">WARNING</div>
            </div>
            <div className="bg-slate-800/50 border border-red-400/20 rounded p-4">
              <div className="text-2xl font-bold text-red-400 font-mono">
                {diagnostics.filter((d) => d.status === "CRITICAL").length}
              </div>
              <div className="text-sm text-green-400/70">CRITICAL</div>
            </div>
            <div className="bg-slate-800/50 border border-green-400/20 rounded p-4">
              <div className="text-2xl font-bold text-green-400 font-mono">
                {diagnostics.reduce((sum, d) => sum + d.performance, 0) / diagnostics.length}%
              </div>
              <div className="text-sm text-green-400/70">AVG PERFORMANCE</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
