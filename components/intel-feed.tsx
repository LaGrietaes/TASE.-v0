"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Radar, Eye, MapPin, Clock, Star, Filter } from "lucide-react"

interface IntelFeedProps {
  compact?: boolean
}

export function IntelFeed({ compact = false }: IntelFeedProps) {
  const [intelReports, setIntelReports] = useState([
    {
      id: "INT-001",
      timestamp: "14:32:15",
      priority: "CRITICAL",
      source: "SATELLITE",
      location: "SECTOR 7-G",
      title: "HOSTILE MOVEMENT DETECTED",
      description: "Large convoy spotted moving northeast. Estimated 12 vehicles.",
      classification: "TOP SECRET",
      verified: true,
    },
    {
      id: "INT-002",
      timestamp: "14:28:43",
      priority: "HIGH",
      source: "HUMINT",
      location: "SECTOR 12-A",
      title: "COMMUNICATION INTERCEPT",
      description: "Encrypted radio chatter indicating possible operation planning.",
      classification: "SECRET",
      verified: false,
    },
    {
      id: "INT-003",
      timestamp: "14:25:12",
      priority: "MEDIUM",
      source: "SIGINT",
      location: "SECTOR 3-C",
      title: "ELECTRONIC SIGNATURE",
      description: "Unknown radar emissions detected. Pattern analysis ongoing.",
      classification: "CONFIDENTIAL",
      verified: true,
    },
    {
      id: "INT-004",
      timestamp: "14:20:07",
      priority: "LOW",
      source: "OSINT",
      location: "SECTOR 15-B",
      title: "WEATHER UPDATE",
      description: "Storm system approaching operational area. Visibility reduced.",
      classification: "UNCLASSIFIED",
      verified: true,
    },
    {
      id: "INT-005",
      timestamp: "14:15:33",
      priority: "HIGH",
      source: "DRONE",
      location: "SECTOR 9-F",
      title: "INFRASTRUCTURE DAMAGE",
      description: "Bridge destroyed. Alternative routes required for ground operations.",
      classification: "SECRET",
      verified: true,
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      const newReport = {
        id: `INT-${String(Math.floor(Math.random() * 999)).padStart(3, "0")}`,
        timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
        priority: ["LOW", "MEDIUM", "HIGH", "CRITICAL"][Math.floor(Math.random() * 4)],
        source: ["SATELLITE", "HUMINT", "SIGINT", "DRONE", "OSINT"][Math.floor(Math.random() * 5)],
        location: `SECTOR ${Math.floor(Math.random() * 20)}-${String.fromCharCode(65 + Math.floor(Math.random() * 7))}`,
        title: [
          "MOVEMENT DETECTED",
          "COMMUNICATION INTERCEPT",
          "ANOMALOUS ACTIVITY",
          "WEATHER ALERT",
          "EQUIPMENT MALFUNCTION",
        ][Math.floor(Math.random() * 5)],
        description: "Automated intelligence report generated from sensor data.",
        classification: ["UNCLASSIFIED", "CONFIDENTIAL", "SECRET", "TOP SECRET"][Math.floor(Math.random() * 4)],
        verified: Math.random() > 0.3,
      }

      setIntelReports((prev) => [newReport, ...prev.slice(0, 9)])
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "CRITICAL":
        return "text-red-400 bg-red-400/20 border-red-400/50"
      case "HIGH":
        return "text-orange-400 bg-orange-400/20 border-orange-400/50"
      case "MEDIUM":
        return "text-yellow-400 bg-yellow-400/20 border-yellow-400/50"
      case "LOW":
        return "text-white bg-white/20 border-white/50"
      default:
        return "text-gray-400 bg-gray-400/20 border-gray-400/50"
    }
  }

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case "TOP SECRET":
        return "text-red-400"
      case "SECRET":
        return "text-orange-400"
      case "CONFIDENTIAL":
        return "text-yellow-400"
      case "UNCLASSIFIED":
        return "text-white"
      default:
        return "text-gray-400"
    }
  }

  const displayReports = compact ? intelReports.slice(0, 3) : intelReports

  return (
    <Card className="bg-slate-900/50 border-white/30 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-white font-mono flex items-center gap-2">
          <Radar className="w-5 h-5" />
          INTELLIGENCE FEED
          <Badge className="bg-red-400/20 text-red-400 border-red-400/50 ml-auto">
            {intelReports.filter((r) => r.priority === "CRITICAL").length} CRITICAL
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className={compact ? "h-64" : "h-96"}>
          <div className="space-y-3">
            {displayReports.map((report) => (
              <Card key={report.id} className="bg-slate-800/50 border-white/20">
                <CardContent className="p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge className={`text-xs ${getPriorityColor(report.priority)}`}>{report.priority}</Badge>
                      <span className="text-xs text-white/70 font-mono">{report.id}</span>
                      {report.verified && <Star className="w-3 h-3 text-yellow-400 fill-current" />}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-white/70">
                      <Clock className="w-3 h-3" />
                      {report.timestamp}
                    </div>
                  </div>

                  <h4 className="font-mono font-bold text-white text-sm mb-1">{report.title}</h4>

                  <p className="text-xs text-white/80 mb-2">{report.description}</p>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span className="text-white/70 flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {report.source}
                      </span>
                      <span className="text-white/70 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {report.location}
                      </span>
                    </div>
                    <span className={`font-mono ${getClassificationColor(report.classification)}`}>
                      {report.classification}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>

        {!compact && (
          <div className="flex gap-2 pt-4 border-t border-white/20 mt-4">
            <Button className="bg-white/20 text-white border border-white/50 hover:bg-white/30 font-mono text-xs">
              <Filter className="w-3 h-3 mr-1" />
              FILTER
            </Button>
            <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10 font-mono text-xs">
              ARCHIVE
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
