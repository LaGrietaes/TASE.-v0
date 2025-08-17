"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, CheckSquare, Users, Calendar } from "lucide-react"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "task_completed",
      title: "Completed task",
      description: "Design new landing page",
      time: "2 hours ago",
      icon: CheckSquare,
      color: "text-green-600",
    },
    {
      id: 2,
      type: "project_created",
      title: "Created project",
      description: "Mobile App Development",
      time: "1 day ago",
      icon: Users,
      color: "text-blue-600",
    },
    {
      id: 3,
      type: "meeting_scheduled",
      title: "Scheduled meeting",
      description: "Team standup for tomorrow",
      time: "2 days ago",
      icon: Calendar,
      color: "text-purple-600",
    },
    {
      id: 4,
      type: "task_updated",
      title: "Updated task",
      description: "API Integration progress",
      time: "3 days ago",
      icon: Activity,
      color: "text-orange-600",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 border">
              <activity.icon className={`h-4 w-4 mt-1 ${activity.color}`} />
              <div className="flex-1">
                <p className="font-medium">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
