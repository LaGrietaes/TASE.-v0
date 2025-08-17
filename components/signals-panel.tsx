"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Zap, Radio, Wifi, Satellite, Activity, TrendingUp, Volume2 } from "lucide-react"

export function SignalsPanel() {
  const [signals, setSignals] = useState([
    {
      frequency: "145.500 MHz",
      type: "VHF",
      strength: 85,
      quality: 92,
      source: "TACTICAL-1",
      encrypted: true,
      active: true,
    },
    {
      frequency: "2.4 GHz",
      type: "WIFI",
      strength: 67,
      quality: 78,
      source: "DATA-LINK",
      encrypted: true,
      active: true,
    },
    {
      frequency: "1.575 GHz",
      type: "GPS",
      strength: 94,
      quality: 96,
      source: "SATELLITE",
      encrypted: false,
      active: true,
    },
    {
      frequency: "433.920 MHz",
      type: "UHF",
      strength: 45,
      quality: 52,
      source: "REMOTE-SENSOR",
      encrypted: false,
      active: false,
    },
  ])

  const [waveformData, setWaveformData] = useState(Array.from({ length: 50 }, () => Math.random() * 100))

  useEffect(() => {
    const interval = setInterval(() => {
      setSignals((prev) =>
        prev.map((signal) => ({
          ...signal,
          strength: Math.max(20, Math.min(100, signal.strength + (Math.random() - 0.5) * 10)),
          quality: Math.max(30, Math.min(100, signal.quality + (Math.random() - 0.5) * 8)),
        })),
      )

      setWaveformData((prev) => [...prev.slice(1), Math.random() * 100])
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const getSignalColor = (strength: number) => {
    if (strength > 80) return "text-green-400"
    if (strength > 60) return "text-yellow-400"
    if (strength > 40) return "text-orange-400"
    return "text-red-400"
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-mono text-green-400">SIGNALS INTELLIGENCE</h1>
        <Badge className="bg-green-400/20 text-green-400 border-green-400/50">
          {signals.filter((s) => s.active).length} ACTIVE CHANNELS
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-900/50 border-green-400/30 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-green-400 font-mono flex items-center gap-2">
              <Activity className="w-5 h-5" />
              SIGNAL WAVEFORM
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 bg-slate-800/50 border border-green-400/20 rounded p-2 relative overflow-hidden">
              <svg className="w-full h-full">
                <polyline
                  fill="none"
                  stroke="rgb(74, 222, 128)"
                  strokeWidth="2"
                  points={waveformData
                    .map((value, index) => `${(index / (waveformData.length - 1)) * 100}%,${100 - value}%`)
                    .join(" ")}
                />
              </svg>
              <div className="absolute top-2 left-2 text-xs text-green-400/70 font-mono">
                REAL-TIME SPECTRUM ANALYSIS
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-green-400/30 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-green-400 font-mono flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              SIGNAL STATISTICS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-800/50 border border-green-400/20 rounded p-3 text-center">
                <div className="text-2xl font-bold text-green-400 font-mono">
                  {signals.filter((s) => s.active).length}
                </div>
                <div className="text-green-400/70">ACTIVE</div>
              </div>
              <div className="bg-slate-800/50 border border-green-400/20 rounded p-3 text-center">
                <div className="text-2xl font-bold text-green-400 font-mono">
                  {signals.filter((s) => s.encrypted).length}
                </div>
                <div className="text-green-400/70">ENCRYPTED</div>
              </div>
              <div className="bg-slate-800/50 border border-green-400/20 rounded p-3 text-center">
                <div className="text-2xl font-bold text-green-400 font-mono">
                  {Math.round(signals.reduce((sum, s) => sum + s.strength, 0) / signals.length)}%
                </div>
                <div className="text-green-400/70">AVG STRENGTH</div>
              </div>
              <div className="bg-slate-800/50 border border-green-400/20 rounded p-3 text-center">
                <div className="text-2xl font-bold text-green-400 font-mono">
                  {Math.round(signals.reduce((sum, s) => sum + s.quality, 0) / signals.length)}%
                </div>
                <div className="text-green-400/70">AVG QUALITY</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-900/50 border-green-400/30 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-green-400 font-mono flex items-center gap-2">
            <Radio className="w-5 h-5" />
            FREQUENCY MONITOR
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {signals.map((signal, index) => {
              const getTypeIcon = (type: string) => {
                switch (type) {
                  case "VHF":
                    return Radio
                  case "UHF":
                    return Radio
                  case "WIFI":
                    return Wifi
                  case "GPS":
                    return Satellite
                  default:
                    return Zap
                }
              }
              const TypeIcon = getTypeIcon(signal.type)

              return (
                <Card key={index} className="bg-slate-800/50 border-green-400/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <TypeIcon className="w-4 h-4 text-green-400" />
                        <div>
                          <h3 className="font-mono font-bold text-green-400 text-sm">{signal.frequency}</h3>
                          <p className="text-xs text-green-400/70">{signal.source}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={`text-xs ${signal.active ? "bg-green-400/20 text-green-400 border-green-400/50" : "bg-gray-400/20 text-gray-400 border-gray-400/50"}`}
                        >
                          {signal.type}
                        </Badge>
                        {signal.encrypted && <div className="w-2 h-2 bg-green-400 rounded-full" title="Encrypted" />}
                        {signal.active && <Volume2 className="w-3 h-3 text-green-400 animate-pulse" />}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-green-400/70">STRENGTH</span>
                          <span className={getSignalColor(signal.strength)}>{signal.strength.toFixed(0)}%</span>
                        </div>
                        <Progress value={signal.strength} className="h-1 bg-slate-700" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-green-400/70">QUALITY</span>
                          <span className={getSignalColor(signal.quality)}>{signal.quality.toFixed(0)}%</span>
                        </div>
                        <Progress value={signal.quality} className="h-1 bg-slate-700" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="flex gap-2 pt-4 border-t border-green-400/20 mt-4">
            <Button className="bg-green-400/20 text-green-400 border border-green-400/50 hover:bg-green-400/30 font-mono text-xs">
              SCAN FREQUENCIES
            </Button>
            <Button
              variant="ghost"
              className="text-green-400/70 hover:text-green-400 hover:bg-green-400/10 font-mono text-xs"
            >
              JAMMING PROTOCOLS
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
