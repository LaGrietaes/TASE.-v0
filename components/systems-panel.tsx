"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Database, Cpu, HardDrive, Thermometer, AlertTriangle, CheckCircle, Power } from "lucide-react"

interface SystemsPanelProps {
  compact?: boolean
}

export function SystemsPanel({ compact = false }: SystemsPanelProps) {
  const [systems, setSystems] = useState([
    {
      name: "PRIMARY SERVER",
      status: "ONLINE",
      cpu: 45,
      memory: 67,
      disk: 34,
      temp: 42,
      uptime: "72:45:12",
    },
    {
      name: "BACKUP SERVER",
      status: "ONLINE",
      cpu: 23,
      memory: 45,
      disk: 28,
      temp: 38,
      uptime: "72:45:12",
    },
    {
      name: "COMM RELAY",
      status: "WARNING",
      cpu: 78,
      memory: 89,
      disk: 56,
      temp: 65,
      uptime: "48:23:07",
    },
    {
      name: "RADAR ARRAY",
      status: "ONLINE",
      cpu: 56,
      memory: 72,
      disk: 41,
      temp: 44,
      uptime: "120:15:33",
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setSystems((prev) =>
        prev.map((system) => ({
          ...system,
          cpu: Math.max(10, Math.min(95, system.cpu + (Math.random() - 0.5) * 10)),
          memory: Math.max(20, Math.min(95, system.memory + (Math.random() - 0.5) * 8)),
          temp: Math.max(30, Math.min(70, system.temp + (Math.random() - 0.5) * 5)),
        })),
      )
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ONLINE":
        return "text-green-400 bg-green-400/20 border-green-400/50 status-online"
      case "WARNING":
        return "text-yellow-400 bg-yellow-400/20 border-yellow-400/50"
      case "OFFLINE":
        return "text-red-400 bg-red-400/20 border-red-400/50"
      default:
        return "text-gray-400 bg-gray-400/20 border-gray-400/50"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ONLINE":
        return CheckCircle
      case "WARNING":
        return AlertTriangle
      case "OFFLINE":
        return Power
      default:
        return AlertTriangle
    }
  }

  const displaySystems = compact ? systems.slice(0, 2) : systems

  return (
    <Card className="bg-slate-900/50 border-white/30 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-white font-mono flex items-center gap-2">
          <Database className="w-5 h-5" />
          SYSTEM STATUS
          <Badge className="bg-green-400/20 text-green-400 border-green-400/50 ml-auto status-online">
            {systems.filter((s) => s.status === "ONLINE").length}/{systems.length} ONLINE
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {displaySystems.map((system, index) => {
          const StatusIcon = getStatusIcon(system.status)
          return (
            <Card key={index} className="bg-slate-800/50 border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <StatusIcon className="w-4 h-4 text-white" />
                    <h3 className="font-mono font-bold text-white text-sm">{system.name}</h3>
                  </div>
                  <Badge className={`text-xs ${getStatusColor(system.status)}`}>{system.status}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white/70 flex items-center gap-1">
                        <Cpu className="w-3 h-3" />
                        CPU
                      </span>
                      <span className="text-white">{system.cpu.toFixed(0)}%</span>
                    </div>
                    <Progress value={system.cpu} className="h-1 bg-slate-700" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white/70 flex items-center gap-1">
                        <HardDrive className="w-3 h-3" />
                        MEM
                      </span>
                      <span className="text-white">{system.memory.toFixed(0)}%</span>
                    </div>
                    <Progress value={system.memory} className="h-1 bg-slate-700" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white/70 flex items-center gap-1">
                        <Database className="w-3 h-3" />
                        DISK
                      </span>
                      <span className="text-white">{system.disk}%</span>
                    </div>
                    <Progress value={system.disk} className="h-1 bg-slate-700" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white/70 flex items-center gap-1">
                        <Thermometer className="w-3 h-3" />
                        TEMP
                      </span>
                      <span
                        className={`${system.temp > 60 ? "text-red-400" : system.temp > 50 ? "text-yellow-400" : "text-white"}`}
                      >
                        {system.temp.toFixed(0)}°C
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-white/20 text-xs text-white/70">
                  <span>UPTIME: {system.uptime}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}

        {!compact && (
          <div className="flex gap-2 pt-2">
            <Button className="bg-white/20 text-white border border-white/50 hover:bg-white/30 font-mono text-xs">
              DIAGNOSTICS
            </Button>
            <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10 font-mono text-xs">
              MAINTENANCE
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
