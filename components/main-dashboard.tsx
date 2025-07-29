"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TacticalTable } from "@/components/tactical-table"
import { OperationalChart } from "@/components/operational-chart"
import { ActivityLog } from "@/components/activity-log"
import { useMissionData } from "@/hooks/use-mission-data"

export function MainDashboard() {
  const { missionData } = useMissionData()
  const { systemStatus } = missionData

  return (
    <main className="flex-1 p-4 space-y-4 overflow-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Asset Status */}
        <Card className="border-border bg-card">
          <CardHeader className="border-b border-border pb-2">
            <CardTitle className="text-xs font-mono uppercase tracking-wider">ASSET STATUS</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <TacticalTable />
          </CardContent>
        </Card>

        {/* Operational Metrics */}
        <Card className="border-border bg-card">
          <CardHeader className="border-b border-border pb-2">
            <CardTitle className="text-xs font-mono uppercase tracking-wider">OPERATIONAL METRICS</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <OperationalChart />
          </CardContent>
        </Card>

        {/* Activity Log */}
        <Card className="border-border bg-card">
          <CardHeader className="border-b border-border pb-2">
            <CardTitle className="text-xs font-mono uppercase tracking-wider">ACTIVITY LOG</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ActivityLog />
          </CardContent>
        </Card>
      </div>

      {/* Mission Overview */}
      <Card className="border-border bg-card">
        <CardHeader className="border-b border-border pb-2">
          <CardTitle className="text-xs font-mono uppercase tracking-wider">MISSION OVERVIEW</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">ACTIVE ASSETS</div>
              <div className="text-2xl font-mono text-tactical-green">{systemStatus.activeAssets}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">ALERTS</div>
              <div className="text-2xl font-mono text-tactical-amber">{systemStatus.alerts}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">THREATS</div>
              <div className="text-2xl font-mono text-tactical-red">{systemStatus.threats}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">UPTIME</div>
              <div className="text-2xl font-mono text-tactical-green">{systemStatus.uptime}%</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
