"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Shield, Activity, AlertTriangle, Zap, Radio, Satellite, Target, Eye } from "lucide-react"

interface StatusGridProps {
  alertLevel?: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
  systemStatus?: number
}

export function StatusGrid({ alertLevel = "LOW", systemStatus = 95 }: StatusGridProps) {
  const [activeMissions, setActiveMissions] = useState(4)
  const [threatLevel, setThreatLevel] = useState(7)
  const [commChannels, setCommChannels] = useState(12)
  const [satelliteStatus, setSatelliteStatus] = useState(98)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMissions((prev) => Math.max(1, Math.min(8, prev + Math.floor(Math.random() * 3) - 1)))
      setThreatLevel((prev) => Math.max(1, Math.min(10, prev + Math.floor(Math.random() * 3) - 1)))
      setCommChannels((prev) => Math.max(8, Math.min(16, prev + Math.floor(Math.random() * 3) - 1)))
      setSatelliteStatus((prev) => Math.max(85, Math.min(100, prev + (Math.random() - 0.5) * 3)))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const statusCards = [
    {
      title: "ACTIVE MISSIONS",
      value: activeMissions.toString(),
      subtitle: "Operations in Progress",
      icon: Shield,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      borderColor: "border-blue-400/30",
    },
    {
      title: "SYSTEM STATUS",
      value: `${Math.round(systemStatus)}%`,
      subtitle: "Overall Health",
      icon: Activity,
      color: systemStatus > 90 ? "text-white" : systemStatus > 75 ? "text-yellow-400" : "text-red-400",
      bgColor: systemStatus > 90 ? "bg-white/10" : systemStatus > 75 ? "bg-yellow-400/10" : "bg-red-400/10",
      borderColor:
        systemStatus > 90 ? "border-white/30" : systemStatus > 75 ? "border-yellow-400/30" : "border-red-400/30",
      showProgress: true,
      progressValue: systemStatus,
    },
    {
      title: "THREAT LEVEL",
      value: alertLevel,
      subtitle: `Level ${threatLevel}/10`,
      icon: AlertTriangle,
      color:
        alertLevel === "CRITICAL"
          ? "text-red-400"
          : alertLevel === "HIGH"
            ? "text-orange-400"
            : alertLevel === "MEDIUM"
              ? "text-yellow-400"
              : "text-white",
      bgColor:
        alertLevel === "CRITICAL"
          ? "bg-red-400/10"
          : alertLevel === "HIGH"
            ? "bg-orange-400/10"
            : alertLevel === "MEDIUM"
              ? "bg-yellow-400/10"
              : "bg-white/10",
      borderColor:
        alertLevel === "CRITICAL"
          ? "border-red-400/30"
          : alertLevel === "HIGH"
            ? "border-orange-400/30"
            : alertLevel === "MEDIUM"
              ? "border-yellow-400/30"
              : "border-white/30",
    },
    {
      title: "POWER GRID",
      value: "STABLE",
      subtitle: "All Systems Nominal",
      icon: Zap,
      color: "text-white",
      bgColor: "bg-white/10",
      borderColor: "border-white/30",
    },
    {
      title: "COMM CHANNELS",
      value: commChannels.toString(),
      subtitle: "Active Frequencies",
      icon: Radio,
      color: "text-cyan-400",
      bgColor: "bg-cyan-400/10",
      borderColor: "border-cyan-400/30",
    },
    {
      title: "SATELLITE LINK",
      value: `${Math.round(satelliteStatus)}%`,
      subtitle: "Signal Strength",
      icon: Satellite,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      borderColor: "border-purple-400/30",
      showProgress: true,
      progressValue: satelliteStatus,
    },
    {
      title: "TARGETS TRACKED",
      value: "23",
      subtitle: "Active Contacts",
      icon: Target,
      color: "text-orange-400",
      bgColor: "bg-orange-400/10",
      borderColor: "border-orange-400/30",
    },
    {
      title: "SURVEILLANCE",
      value: "ACTIVE",
      subtitle: "All Sectors Monitored",
      icon: Eye,
      color: "text-white",
      bgColor: "bg-white/10",
      borderColor: "border-white/30",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statusCards.map((card, index) => {
        const Icon = card.icon
        return (
          <Card key={index} className={`${card.bgColor} ${card.borderColor} border bg-slate-900/50 backdrop-blur`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-mono font-medium text-white/70">{card.title}</CardTitle>
              <Icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold font-mono ${card.color} mb-1`}>{card.value}</div>
              <p className="text-xs text-white/60 mb-2">{card.subtitle}</p>
              {card.showProgress && <Progress value={card.progressValue} className="h-1 bg-slate-800" />}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
