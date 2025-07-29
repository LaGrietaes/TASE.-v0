"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Radio, Lock, Unlock, MapPin, Clock, Activity, TrendingUp } from "lucide-react"
import { useMissionData } from "@/hooks/use-mission-data"

export function SignalsPanel() {
  const { missionData } = useMissionData()
  const { signals } = missionData

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case "FRIENDLY":
        return "text-tactical-green border-tactical-green bg-tactical-green/10"
      case "HOSTILE":
        return "text-tactical-red border-tactical-red bg-tactical-red/10"
      case "UNKNOWN":
        return "text-tactical-amber border-tactical-amber bg-tactical-amber/10"
      case "NEUTRAL":
        return "text-tactical-blue border-tactical-blue bg-tactical-blue/10"
      default:
        return "text-muted-foreground border-border"
    }
  }

  const getSignalStrengthColor = (strength: number) => {
    if (strength > 80) return "text-tactical-green"
    if (strength > 50) return "text-tactical-amber"
    if (strength > 20) return "text-tactical-red"
    return "text-muted-foreground"
  }

  const friendlyCount = signals.filter((s) => s.classification === "FRIENDLY").length
  const hostileCount = signals.filter((s) => s.classification === "HOSTILE").length
  const unknownCount = signals.filter((s) => s.classification === "UNKNOWN").length
  const encryptedCount = signals.filter((s) => s.encrypted).length

  const frequencies = [...new Set(signals.map((s) => s.frequency))]
  const recentSignals = signals.slice(0, 10)

  return (
    <div className="space-y-4">
      {/* Signals Overview */}
      <Card className="border-border bg-card">
        <CardHeader className="border-b border-border pb-2">
          <CardTitle className="text-xs font-mono uppercase tracking-wider flex items-center gap-2">
            <Radio className="h-3 w-3" />
            SIGNAL INTELLIGENCE OVERVIEW
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">FRIENDLY</div>
              <div className="text-2xl font-mono text-tactical-green">{friendlyCount}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">HOSTILE</div>
              <div className="text-2xl font-mono text-tactical-red">{hostileCount}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">UNKNOWN</div>
              <div className="text-2xl font-mono text-tactical-amber">{unknownCount}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">ENCRYPTED</div>
              <div className="text-2xl font-mono text-tactical-blue">{encryptedCount}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Signals */}
        <Card className="border-border bg-card">
          <CardHeader className="border-b border-border pb-2">
            <CardTitle className="text-xs font-mono uppercase tracking-wider">RECENT SIGNALS</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-96 overflow-auto">
              <div className="space-y-2 p-4">
                {recentSignals.map((signal) => (
                  <div
                    key={signal.id}
                    className={`border-l-2 pl-3 py-2 ${getClassificationColor(signal.classification)}`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-mono font-semibold">{signal.frequency}</div>
                        <div className="flex items-center gap-2">
                          {signal.encrypted ? (
                            <Lock className="h-3 w-3 text-tactical-green" />
                          ) : (
                            <Unlock className="h-3 w-3 text-tactical-amber" />
                          )}
                          <span
                            className={`text-xs font-mono ${getClassificationColor(signal.classification).split(" ")[0]}`}
                          >
                            {signal.classification}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Radio className="h-3 w-3" />
                          {signal.source}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {signal.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          <span className={getSignalStrengthColor(signal.strength)}>{signal.strength.toFixed(0)}%</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {new Date(signal.timestamp).toLocaleTimeString()}
                      </div>
                      <div className="w-full bg-secondary h-1 mt-1">
                        <div
                          className={`h-1 ${getSignalStrengthColor(signal.strength).replace("text-", "bg-")}`}
                          style={{ width: `${Math.min(100, signal.strength)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Frequency Analysis */}
        <Card className="border-border bg-card">
          <CardHeader className="border-b border-border pb-2">
            <CardTitle className="text-xs font-mono uppercase tracking-wider">FREQUENCY ANALYSIS</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              {frequencies.map((frequency) => {
                const frequencySignals = signals.filter((s) => s.frequency === frequency)
                const avgStrength = frequencySignals.reduce((sum, s) => sum + s.strength, 0) / frequencySignals.length
                const hostileInFreq = frequencySignals.filter((s) => s.classification === "HOSTILE").length

                return (
                  <div key={frequency} className="border border-border p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-mono font-semibold">{frequency}</div>
                      <div
                        className={`text-xs font-mono ${hostileInFreq > 0 ? "text-tactical-red" : "text-tactical-green"}`}
                      >
                        {hostileInFreq > 0 ? "THREAT DETECTED" : "CLEAR"}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">{frequencySignals.length} signals detected</div>
                    <div className="text-xs text-muted-foreground">Avg Strength: {avgStrength.toFixed(1)}%</div>
                    <div className="w-full bg-secondary h-2">
                      <div
                        className={`h-2 ${getSignalStrengthColor(avgStrength).replace("text-", "bg-")}`}
                        style={{ width: `${Math.min(100, avgStrength)}%` }}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button className="tactical-button h-6 px-2 text-xs flex-1">MONITOR</Button>
                      <Button className="tactical-button h-6 px-2 text-xs flex-1">ANALYZE</Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Signal Actions */}
      <Card className="border-border bg-card">
        <CardHeader className="border-b border-border pb-2">
          <CardTitle className="text-xs font-mono uppercase tracking-wider">SIGNAL OPERATIONS</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="tactical-button h-10 flex flex-col items-center justify-center gap-1">
              <Radio className="h-4 w-4" />
              <span className="text-xs">SCAN SPECTRUM</span>
            </Button>
            <Button className="tactical-button h-10 flex flex-col items-center justify-center gap-1">
              <Activity className="h-4 w-4" />
              <span className="text-xs">SIGNAL ANALYSIS</span>
            </Button>
            <Button className="tactical-button h-10 flex flex-col items-center justify-center gap-1">
              <Lock className="h-4 w-4" />
              <span className="text-xs">DECRYPT</span>
            </Button>
            <Button className="tactical-button h-10 flex flex-col items-center justify-center gap-1">
              <MapPin className="h-4 w-4" />
              <span className="text-xs">TRIANGULATE</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
