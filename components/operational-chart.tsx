"use client"

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { useMissionData } from "@/hooks/use-mission-data"

export function OperationalChart() {
  const { missionData } = useMissionData()
  const { metrics } = missionData

  // Transform metrics data for the chart
  const chartData = metrics.slice(-24).map((metric) => ({
    time: new Date(metric.timestamp).toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    }),
    value: Math.round(metric.value),
  }))

  return (
    <div className="h-32">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: "#6B7280" }}
            interval="preserveStartEnd"
          />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#6B7280" }} domain={[0, 100]} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#CD2027"
            strokeWidth={2}
            dot={{ fill: "#CD2027", strokeWidth: 0, r: 2 }}
            connectNulls={false}
          />
        </LineChart>
      </ResponsiveContainer>
      {chartData.length === 0 && (
        <div className="flex items-center justify-center h-full text-xs font-mono text-muted-foreground">
          NO METRICS DATA
        </div>
      )}
    </div>
  )
}
