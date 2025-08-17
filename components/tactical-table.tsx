"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Target } from "lucide-react"

interface TacticalData {
  id: string
  callsign: string
  status: "active" | "standby" | "offline"
  location: string
  lastUpdate: string
  mission: string
}

export function TacticalTable() {
  const tacticalData: TacticalData[] = [
    {
      id: "UNIT-001",
      callsign: "Alpha-1",
      status: "active",
      location: "Grid 7-A",
      lastUpdate: "14:32:15",
      mission: "Perimeter Sweep",
    },
    {
      id: "UNIT-002",
      callsign: "Bravo-2",
      status: "standby",
      location: "Base",
      lastUpdate: "14:30:42",
      mission: "Ready Reserve",
    },
    {
      id: "UNIT-003",
      callsign: "Charlie-3",
      status: "active",
      location: "Grid 12-B",
      lastUpdate: "14:31:18",
      mission: "Intel Gathering",
    },
    {
      id: "UNIT-004",
      callsign: "Delta-4",
      status: "offline",
      location: "Unknown",
      lastUpdate: "13:45:33",
      mission: "Maintenance",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "standby":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "offline":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <Card className="bg-card/50 border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-mono flex items-center gap-2">
          <Target className="h-4 w-4" />
          TACTICAL UNITS
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs font-mono">CALLSIGN</TableHead>
              <TableHead className="text-xs font-mono">STATUS</TableHead>
              <TableHead className="text-xs font-mono">LOCATION</TableHead>
              <TableHead className="text-xs font-mono">MISSION</TableHead>
              <TableHead className="text-xs font-mono">LAST UPDATE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tacticalData.map((unit) => (
              <TableRow key={unit.id}>
                <TableCell className="font-mono text-xs font-bold text-blue-400">{unit.callsign}</TableCell>
                <TableCell>
                  <Badge className={`text-xs ${getStatusColor(unit.status)}`}>{unit.status.toUpperCase()}</Badge>
                </TableCell>
                <TableCell className="font-mono text-xs">{unit.location}</TableCell>
                <TableCell className="text-xs">{unit.mission}</TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">{unit.lastUpdate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
