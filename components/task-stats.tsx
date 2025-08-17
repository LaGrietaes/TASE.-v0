"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, AlertTriangle, Users } from "lucide-react"

export function TaskStats() {
  const stats = [
    {
      title: "Completed",
      value: "24",
      change: "+12%",
      icon: CheckCircle,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
    },
    {
      title: "In Progress",
      value: "18",
      change: "+5%",
      icon: Clock,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
    {
      title: "Overdue",
      value: "3",
      change: "-2%",
      icon: AlertTriangle,
      color: "text-red-400",
      bgColor: "bg-red-400/10",
    },
    {
      title: "Team Members",
      value: "12",
      change: "0%",
      icon: Users,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-slate-800/50 border-slate-700/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">{stat.title}</CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="flex items-center space-x-2 text-xs">
              <Badge variant={stat.change.startsWith("+") ? "default" : "destructive"} className="text-xs">
                {stat.change}
              </Badge>
              <span className="text-slate-400">from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
