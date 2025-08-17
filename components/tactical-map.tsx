"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Map, MapPin, Target, Users, Eye, Crosshair } from "lucide-react"

export function TacticalMap() {
  const [mapData, setMapData] = useState({
    friendlyUnits: [
      { id: "ALPHA-1", x: 25, y: 30, status: "ACTIVE" },
      { id: "BRAVO-2", x: 60, y: 45, status: "ACTIVE" },
      { id: "CHARLIE-3", x: 40, y: 70, status: "STANDBY" },
    ],
    hostileContacts: [
      { id: "H-001", x: 80, y: 20, threat: "HIGH" },
      { id: "H-002", x: 70, y: 60, threat: "MEDIUM" },
    ],
    objectives: [
      { id: "OBJ-A", x: 85, y: 25, status: "PENDING" },
      { id: "OBJ-B", x: 75, y: 65, status: "SECURED" },
      { id: "OBJ-C", x: 30, y: 80, status: "PENDING" },
    ],
    waypoints: [
      { id: "WP-1", x: 45, y: 35 },
      { id: "WP-2", x: 65, y: 50 },
      { id: "WP-3", x: 55, y: 75 },
    ],
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMapData((prev) => ({
        ...prev,
        friendlyUnits: prev.friendlyUnits.map((unit) => ({
          ...unit,
          x: Math.max(5, Math.min(95, unit.x + (Math.random() - 0.5) * 4)),
          y: Math.max(5, Math.min(95, unit.y + (Math.random() - 0.5) * 4)),
        })),
        hostileContacts: prev.hostileContacts.map((contact) => ({
          ...contact,
          x: Math.max(5, Math.min(95, contact.x + (Math.random() - 0.5) * 2)),
          y: Math.max(5, Math.min(95, contact.y + (Math.random() - 0.5) * 2)),
        })),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-mono text-green-400">TACTICAL OVERVIEW</h1>
        <div className="flex gap-2">
          <Badge className="bg-blue-400/20 text-blue-400 border-blue-400/50">
            {mapData.friendlyUnits.length} FRIENDLY
          </Badge>
          <Badge className="bg-red-400/20 text-red-400 border-red-400/50">
            {mapData.hostileContacts.length} HOSTILE
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-slate-900/50 border-green-400/30 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-green-400 font-mono flex items-center gap-2">
                <Map className="w-5 h-5" />
                BATTLEFIELD MAP
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative bg-slate-800/50 border border-green-400/20 rounded aspect-square overflow-hidden">
                {/* Grid lines */}
                <svg className="absolute inset-0 w-full h-full opacity-30">
                  <defs>
                    <pattern id="grid" width="10%" height="10%" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgb(74, 222, 128)" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>

                {/* Friendly Units */}
                {mapData.friendlyUnits.map((unit) => (
                  <div
                    key={unit.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                    style={{ left: `${unit.x}%`, top: `${unit.y}%` }}
                  >
                    <div className="w-4 h-4 bg-blue-400 rounded-full border-2 border-blue-300 animate-pulse cursor-pointer">
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-mono text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {unit.id}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Hostile Contacts */}
                {mapData.hostileContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                    style={{ left: `${contact.x}%`, top: `${contact.y}%` }}
                  >
                    <div className="w-4 h-4 bg-red-400 rounded-full border-2 border-red-300 animate-pulse cursor-pointer">
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-mono text-red-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {contact.id} - {contact.threat}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Objectives */}
                {mapData.objectives.map((obj) => (
                  <div
                    key={obj.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                    style={{ left: `${obj.x}%`, top: `${obj.y}%` }}
                  >
                    <div
                      className={`w-3 h-3 border-2 rotate-45 cursor-pointer ${
                        obj.status === "SECURED" ? "bg-green-400 border-green-300" : "bg-yellow-400 border-yellow-300"
                      }`}
                    >
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 -rotate-45 text-xs font-mono text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {obj.id} - {obj.status}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Waypoints */}
                {mapData.waypoints.map((wp) => (
                  <div
                    key={wp.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${wp.x}%`, top: `${wp.y}%` }}
                  >
                    <div className="w-2 h-2 bg-green-400 rounded-full opacity-60"></div>
                  </div>
                ))}

                {/* Coordinate display */}
                <div className="absolute bottom-2 left-2 text-xs font-mono text-green-400/70">GRID: 1000m x 1000m</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-slate-900/50 border-green-400/30 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-green-400 font-mono flex items-center gap-2">
                <Users className="w-5 h-5" />
                UNIT STATUS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mapData.friendlyUnits.map((unit) => (
                <div key={unit.id} className="bg-slate-800/50 border border-blue-400/20 rounded p-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-blue-400 text-sm">{unit.id}</span>
                    <Badge className="bg-blue-400/20 text-blue-400 border-blue-400/50 text-xs">{unit.status}</Badge>
                  </div>
                  <div className="text-xs text-green-400/70 mt-1">
                    POS: {unit.x.toFixed(0)}, {unit.y.toFixed(0)}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-green-400/30 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-green-400 font-mono flex items-center gap-2">
                <Target className="w-5 h-5" />
                THREATS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mapData.hostileContacts.map((contact) => (
                <div key={contact.id} className="bg-slate-800/50 border border-red-400/20 rounded p-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-red-400 text-sm">{contact.id}</span>
                    <Badge
                      className={`text-xs ${
                        contact.threat === "HIGH"
                          ? "bg-red-400/20 text-red-400 border-red-400/50"
                          : "bg-orange-400/20 text-orange-400 border-orange-400/50"
                      }`}
                    >
                      {contact.threat}
                    </Badge>
                  </div>
                  <div className="text-xs text-green-400/70 mt-1">
                    POS: {contact.x.toFixed(0)}, {contact.y.toFixed(0)}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-green-400/30 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-green-400 font-mono flex items-center gap-2">
                <Crosshair className="w-5 h-5" />
                OBJECTIVES
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mapData.objectives.map((obj) => (
                <div key={obj.id} className="bg-slate-800/50 border border-yellow-400/20 rounded p-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-yellow-400 text-sm">{obj.id}</span>
                    <Badge
                      className={`text-xs ${
                        obj.status === "SECURED"
                          ? "bg-green-400/20 text-green-400 border-green-400/50"
                          : "bg-yellow-400/20 text-yellow-400 border-yellow-400/50"
                      }`}
                    >
                      {obj.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-green-400/70 mt-1">
                    POS: {obj.x.toFixed(0)}, {obj.y.toFixed(0)}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex gap-2">
        <Button className="bg-green-400/20 text-green-400 border border-green-400/50 hover:bg-green-400/30 font-mono text-xs">
          <Eye className="w-3 h-3 mr-1" />
          SATELLITE VIEW
        </Button>
        <Button
          variant="ghost"
          className="text-green-400/70 hover:text-green-400 hover:bg-green-400/10 font-mono text-xs"
        >
          <MapPin className="w-3 h-3 mr-1" />
          ADD WAYPOINT
        </Button>
        <Button
          variant="ghost"
          className="text-green-400/70 hover:text-green-400 hover:bg-green-400/10 font-mono text-xs"
        >
          <Target className="w-3 h-3 mr-1" />
          MARK TARGET
        </Button>
      </div>
    </div>
  )
}
