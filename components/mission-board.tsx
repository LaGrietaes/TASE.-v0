"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Shield, MapPin, Clock, Users, CheckCircle, Play, Pause } from "lucide-react"

interface MissionBoardProps {
  compact?: boolean
}

export function MissionBoard({ compact = false }: MissionBoardProps) {
  const [missions, setMissions] = useState([
    {
      id: "OP-001",
      name: "OPERATION NIGHTFALL",
      status: "ACTIVE",
      priority: "HIGH",
      progress: 75,
      location: "SECTOR 7-G",
      team: "ALPHA",
      eta: "02:45:00",
      objectives: 4,
      completed: 3,
    },
    {
      id: "OP-002",
      name: "OPERATION STEEL RAIN",
      status: "PLANNING",
      priority: "CRITICAL",
      progress: 25,
      location: "SECTOR 12-A",
      team: "BRAVO",
      eta: "06:30:00",
      objectives: 6,
      completed: 1,
    },
    {
      id: "OP-003",
      name: "OPERATION GHOST PROTOCOL",
      status: "ACTIVE",
      priority: "MEDIUM",
      progress: 90,
      location: "SECTOR 3-C",
      team: "CHARLIE",
      eta: "00:30:00",
      objectives: 3,
      completed: 3,
    },
    {
      id: "OP-004",
      name: "OPERATION DARK HORSE",
      status: "STANDBY",
      priority: "LOW",
      progress: 0,
      location: "SECTOR 15-B",
      team: "DELTA",
      eta: "12:00:00",
      objectives: 5,
      completed: 0,
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setMissions((prev) =>
        prev.map((mission) => ({
          ...mission,
          progress:
            mission.status === "ACTIVE" ? Math.min(100, mission.progress + Math.random() * 2) : mission.progress,
        })),
      )
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "text-green-400 bg-green-400/20 border-green-400/50 status-online"
      case "PLANNING":
        return "text-yellow-400 bg-yellow-400/20 border-yellow-400/50"
      case "STANDBY":
        return "text-blue-400 bg-blue-400/20 border-blue-400/50"
      case "COMPLETED":
        return "text-green-400 bg-green-400/20 border-green-400/50 status-online"
      default:
        return "text-gray-400 bg-gray-400/20 border-gray-400/50"
    }
  }

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

  const displayMissions = compact ? missions.slice(0, 2) : missions

  return (
    <Card className="bg-slate-900/50 border-white/30 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-white font-mono flex items-center gap-2">
          <Shield className="w-5 h-5" />
          MISSION BOARD
          <Badge className="bg-blue-400/20 text-blue-400 border-blue-400/50 ml-auto">
            {missions.filter((m) => m.status === "ACTIVE").length} ACTIVE
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {displayMissions.map((mission) => (
          <Card key={mission.id} className="bg-slate-800/50 border-white/20">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-mono font-bold text-white">{mission.id}</h3>
                    <Badge className={`text-xs ${getStatusColor(mission.status)}`}>{mission.status}</Badge>
                    <Badge className={`text-xs ${getPriorityColor(mission.priority)}`}>{mission.priority}</Badge>
                  </div>
                  <p className="text-sm text-white/80 font-mono">{mission.name}</p>
                </div>
                <div className="flex gap-1">
                  {mission.status === "ACTIVE" ? (
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-white hover:bg-white/20">
                      <Pause className="w-3 h-3" />
                    </Button>
                  ) : (
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-white hover:bg-white/20">
                      <Play className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs text-white/70 mb-3">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{mission.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>TEAM {mission.team}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>ETA: {mission.eta}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>
                    {mission.completed}/{mission.objectives} OBJ
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-white/70">PROGRESS</span>
                  <span className="text-white">{mission.progress.toFixed(0)}%</span>
                </div>
                <Progress value={mission.progress} className="h-2 bg-slate-700" />
              </div>
            </CardContent>
          </Card>
        ))}

        {!compact && (
          <div className="flex gap-2 pt-2">
            <Button className="bg-white/20 text-white border border-white/50 hover:bg-white/30 font-mono text-xs">
              NEW MISSION
            </Button>
            <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10 font-mono text-xs">
              VIEW ALL
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
