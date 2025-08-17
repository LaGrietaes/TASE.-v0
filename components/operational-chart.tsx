"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp } from "lucide-react"

interface ChartData {
  time: string
  systems: number
  missions: number
  alerts: number
}

export function OperationalChart() {
  const data: ChartData[] = [
    { time: "00:00", systems: 95, missions: 4, alerts: 2 },
    { time: "04:00", systems: 92, missions: 4, alerts: 3 },
    { time: "08:00", systems: 88, missions: 6, alerts: 1 },
    { time: "12:00", systems: 91, missions: 5, alerts: 4 },
    { time: "16:00", systems: 87, missions: 4, alerts: 2 },
    { time: "20:00", systems: 89, missions: 3, alerts: 1 },
  ]

  return (
    <Card className="bg-card/50 border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-mono flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          OPERATIONAL METRICS
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={10} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
              }}
            />
            <Line type="monotone" dataKey="systems" stroke="#22c55e" strokeWidth={2} name="System Health %" />
            <Line type="monotone" dataKey="missions" stroke="#3b82f6" strokeWidth={2} name="Active Missions" />
            <Line type="monotone" dataKey="alerts" stroke="#ef4444" strokeWidth={2} name="Active Alerts" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
