"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Lock, Unlock, Clock, Radio } from "lucide-react"
import { useMissionData } from "@/hooks/use-mission-data"

export function CommLog() {
  const { missionData } = useMissionData()
  const { communications } = missionData

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "URGENT":
        return "text-tactical-red border-tactical-red"
      case "HIGH":
        return "text-tactical-amber border-tactical-amber"
      case "MEDIUM":
        return "text-tactical-blue border-tactical-blue"
      case "LOW":
        return "text-tactical-green border-tactical-green"
      default:
        return "text-muted-foreground border-border"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACKNOWLEDGED":
        return "text-tactical-green"
      case "RECEIVED":
        return "text-tactical-blue"
      case "SENT":
        return "text-tactical-amber"
      case "FAILED":
        return "text-tactical-red"
      default:
        return "text-muted-foreground"
    }
  }

  const channels = [...new Set(communications.map((c) => c.channel))]
  const recentComms = communications.slice(0, 15)

  return (
    <div className="space-y-4">
      {/* Communication Overview */}
      <Card className="border-border bg-card">
        <CardHeader className="border-b border-border pb-2">
          <CardTitle className="text-xs font-mono uppercase tracking-wider flex items-center gap-2">
            <MessageSquare className="h-3 w-3" />
            COMMUNICATION STATUS
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">ACTIVE CHANNELS</div>
              <div className="text-2xl font-mono text-tactical-green">{channels.length}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">ENCRYPTED</div>
              <div className="text-2xl font-mono text-tactical-blue">
                {communications.filter((c) => c.encrypted).length}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">URGENT</div>
              <div className="text-2xl font-mono text-tactical-red">
                {communications.filter((c) => c.priority === "URGENT").length}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">FAILED</div>
              <div className="text-2xl font-mono text-tactical-red">
                {communications.filter((c) => c.status === "FAILED").length}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Communications */}
        <Card className="border-border bg-card lg:col-span-2">
          <CardHeader className="border-b border-border pb-2">
            <CardTitle className="text-xs font-mono uppercase tracking-wider">RECENT COMMUNICATIONS</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-96 overflow-auto">
              {recentComms.length > 0 ? (
                <div className="space-y-2 p-4">
                  {recentComms.map((comm) => (
                    <div key={comm.id} className={`border-l-2 pl-3 py-2 ${getPriorityColor(comm.priority)}`}>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="text-xs font-mono font-semibold">
                            {comm.from} → {comm.to}
                          </div>
                          <div className="flex items-center gap-2">
                            {comm.encrypted ? (
                              <Lock className="h-3 w-3 text-tactical-green" />
                            ) : (
                              <Unlock className="h-3 w-3 text-tactical-amber" />
                            )}
                            <div className={`text-xs font-mono ${getStatusColor(comm.status)}`}>{comm.status}</div>
                          </div>
                        </div>
                        <div className="text-xs text-foreground">{comm.message}</div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Radio className="h-3 w-3" />
                            {comm.channel}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(comm.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-muted-foreground text-xs font-mono">NO RECENT COMMUNICATIONS</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Channel Status */}
        <Card className="border-border bg-card">
          <CardHeader className="border-b border-border pb-2">
            <CardTitle className="text-xs font-mono uppercase tracking-wider">CHANNEL STATUS</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              {channels.map((channel) => {
                const channelComms = communications.filter((c) => c.channel === channel)
                const recentActivity = channelComms.filter(
                  (c) => new Date(c.timestamp) > new Date(Date.now() - 3600000),
                ).length

                return (
                  <div key={channel} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-mono font-semibold">{channel}</div>
                      <div className="text-xs font-mono text-tactical-green">ACTIVE</div>
                    </div>
                    <div className="text-xs text-muted-foreground">{channelComms.length} total messages</div>
                    <div className="text-xs text-muted-foreground">{recentActivity} in last hour</div>
                    <div className="w-full bg-secondary h-1">
                      <div
                        className="h-1 bg-tactical-green"
                        style={{ width: `${Math.min(100, (recentActivity / 10) * 100)}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
