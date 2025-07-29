"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Clock, User, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import { useMissionData } from "@/hooks/use-mission-data"

export function OverridesPanel() {
  const { missionData } = useMissionData()
  const { overrides } = missionData

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "text-tactical-green border-tactical-green bg-tactical-green/10"
      case "EXPIRED":
        return "text-tactical-amber border-tactical-amber bg-tactical-amber/10"
      case "REVOKED":
        return "text-tactical-red border-tactical-red bg-tactical-red/10"
      default:
        return "text-muted-foreground border-border"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <CheckCircle className="h-3 w-3" />
      case "EXPIRED":
        return <Clock className="h-3 w-3" />
      case "REVOKED":
        return <XCircle className="h-3 w-3" />
      default:
        return <AlertTriangle className="h-3 w-3" />
    }
  }

  const activeOverrides = overrides.filter((o) => o.status === "ACTIVE")
  const expiredOverrides = overrides.filter((o) => o.status === "EXPIRED")

  return (
    <div className="space-y-4">
      {/* Override Status Overview */}
      <Card className="border-border bg-card">
        <CardHeader className="border-b border-border pb-2">
          <CardTitle className="text-xs font-mono uppercase tracking-wider flex items-center gap-2">
            <Shield className="h-3 w-3" />
            SYSTEM OVERRIDES STATUS
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">ACTIVE</div>
              <div className="text-2xl font-mono text-tactical-green">{activeOverrides.length}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">EXPIRED</div>
              <div className="text-2xl font-mono text-tactical-amber">{expiredOverrides.length}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">REVOKED</div>
              <div className="text-2xl font-mono text-tactical-red">
                {overrides.filter((o) => o.status === "REVOKED").length}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">TOTAL</div>
              <div className="text-2xl font-mono text-tactical-blue">{overrides.length}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Active Overrides */}
        <Card className="border-border bg-card">
          <CardHeader className="border-b border-border pb-2">
            <CardTitle className="text-xs font-mono uppercase tracking-wider">ACTIVE OVERRIDES</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-96 overflow-auto">
              {activeOverrides.length > 0 ? (
                <div className="space-y-2 p-4">
                  {activeOverrides.map((override) => (
                    <div key={override.id} className={`border-l-2 pl-3 py-2 ${getStatusColor(override.status)}`}>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="text-xs font-mono font-semibold">{override.system}</div>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(override.status)}
                            <span className="text-xs font-mono">{override.status}</span>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {override.parameter}: {override.originalValue} → {override.overrideValue}
                        </div>
                        <div className="text-xs text-muted-foreground">{override.reason}</div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {override.authorizedBy}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Expires: {new Date(override.expiresAt).toLocaleString()}
                          </div>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <Button className="tactical-button h-6 px-2 text-xs">EXTEND</Button>
                          <Button className="tactical-button h-6 px-2 text-xs bg-tactical-red">REVOKE</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-muted-foreground text-xs font-mono">NO ACTIVE OVERRIDES</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Override History */}
        <Card className="border-border bg-card">
          <CardHeader className="border-b border-border pb-2">
            <CardTitle className="text-xs font-mono uppercase tracking-wider">OVERRIDE HISTORY</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-96 overflow-auto">
              <div className="space-y-2 p-4">
                {overrides.slice(0, 10).map((override) => (
                  <div key={override.id} className={`border-l-2 pl-3 py-2 ${getStatusColor(override.status)}`}>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-mono font-semibold">{override.system}</div>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(override.status)}
                          <span className="text-xs font-mono">{override.status}</span>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {override.parameter}: {override.originalValue} → {override.overrideValue}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {override.authorizedBy}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(override.timestamp).toLocaleString()}
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

      {/* System Override Controls */}
      <Card className="border-border bg-card">
        <CardHeader className="border-b border-border pb-2">
          <CardTitle className="text-xs font-mono uppercase tracking-wider">SYSTEM CONTROLS</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {["RADAR", "COMMS", "NAVIGATION", "WEAPONS", "SENSORS", "POWER"].map((system) => {
              const systemOverrides = overrides.filter((o) => o.system === system && o.status === "ACTIVE")
              return (
                <div key={system} className="border border-border p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-mono font-semibold">{system}</div>
                    <div
                      className={`text-xs font-mono ${systemOverrides.length > 0 ? "text-tactical-amber" : "text-tactical-green"}`}
                    >
                      {systemOverrides.length > 0 ? "OVERRIDDEN" : "NORMAL"}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">{systemOverrides.length} active override(s)</div>
                  <div className="flex gap-2">
                    <Button className="tactical-button h-6 px-2 text-xs flex-1">OVERRIDE</Button>
                    <Button className="tactical-button h-6 px-2 text-xs flex-1">RESET</Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
