"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, AlertTriangle, MapPin, Clock } from "lucide-react"
import { useMissionData } from "@/hooks/use-mission-data"

export function IntelFeed() {
  const { missionData } = useMissionData()
  const { threats, activities, assets } = missionData

  const getThreatColor = (level: string) => {
    switch (level) {
      case "CRITICAL":
        return "text-tactical-red border-tactical-red bg-tactical-red/10"
      case "HIGH":
        return "text-tactical-amber border-tactical-amber bg-tactical-amber/10"
      case "MEDIUM":
        return "text-tactical-blue border-tactical-blue bg-tactical-blue/10"
      case "LOW":
        return "text-tactical-green border-tactical-green bg-tactical-green/10"
      default:
        return "text-muted-foreground border-border"
    }
  }

  const criticalActivities = activities.filter((a) => a.level === "CRITICAL" || a.level === "ERROR")
  const offlineAssets = assets.filter((a) => a.status === "OFFLINE")

  return (
    <div className="space-y-4">
      {/* Threat Overview */}
      <Card className="border-border bg-card">
        <CardHeader className="border-b border-border pb-2">
          <CardTitle className="text-xs font-mono uppercase tracking-wider flex items-center gap-2">
            <Eye className="h-3 w-3" />
            THREAT ASSESSMENT
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">CRITICAL</div>
              <div className="text-2xl font-mono text-tactical-red">
                {threats.filter((t) => t.level === "CRITICAL").length}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">HIGH</div>
              <div className="text-2xl font-mono text-tactical-amber">
                {threats.filter((t) => t.level === "HIGH").length}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">MEDIUM</div>
              <div className="text-2xl font-mono text-tactical-blue">
                {threats.filter((t) => t.level === "MEDIUM").length}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">LOW</div>
              <div className="text-2xl font-mono text-tactical-green">
                {threats.filter((t) => t.level === "LOW").length}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Active Threats */}
        <Card className="border-border bg-card">
          <CardHeader className="border-b border-border pb-2">
            <CardTitle className="text-xs font-mono uppercase tracking-wider">ACTIVE THREATS</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-96 overflow-auto">
              {threats.length > 0 ? (
                <div className="space-y-2 p-4">
                  {threats.map((threat) => (
                    <div key={threat.id} className={`border-l-2 pl-3 py-2 ${getThreatColor(threat.level)}`}>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="text-xs font-mono font-semibold">{threat.description}</div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {threat.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {new Date(threat.timestamp).toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                        <div className={`text-xs font-mono ${getThreatColor(threat.level).split(" ")[0]}`}>
                          {threat.level}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-muted-foreground text-xs font-mono">
                  NO ACTIVE THREATS DETECTED
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Critical Events */}
        <Card className="border-border bg-card">
          <CardHeader className="border-b border-border pb-2">
            <CardTitle className="text-xs font-mono uppercase tracking-wider">CRITICAL EVENTS</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-96 overflow-auto">
              {criticalActivities.length > 0 ? (
                <div className="space-y-2 p-4">
                  {criticalActivities.slice(0, 10).map((activity) => (
                    <div key={activity.id} className="border-l-2 border-tactical-red pl-3 py-2">
                      <div className="space-y-1">
                        <div className="text-xs font-mono font-semibold">{activity.event}</div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            {activity.source}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(activity.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-muted-foreground text-xs font-mono">NO CRITICAL EVENTS</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Asset Status Alert */}
      <Card className="border-border bg-card">
        <CardHeader className="border-b border-border pb-2">
          <CardTitle className="text-xs font-mono uppercase tracking-wider">ASSET STATUS ALERTS</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          {offlineAssets.length > 0 ? (
            <div className="space-y-2">
              <div className="text-xs font-mono text-tactical-red mb-2">{offlineAssets.length} ASSET(S) OFFLINE</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {offlineAssets.map((asset) => (
                  <div key={asset.id} className="border border-tactical-red bg-tactical-red/10 p-2">
                    <div className="text-xs font-mono font-semibold text-tactical-red">{asset.id}</div>
                    <div className="text-xs text-muted-foreground">{asset.location}</div>
                    <div className="text-xs text-muted-foreground">
                      Last seen: {new Date(asset.lastUpdate).toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-xs font-mono text-tactical-green">ALL ASSETS OPERATIONAL</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
