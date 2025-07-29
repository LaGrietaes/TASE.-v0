"use client"

import { useMissionData } from "@/hooks/use-mission-data"

export function ActivityLog() {
  const { missionData } = useMissionData()
  const { activities } = missionData

  const getLevelColor = (level: string) => {
    switch (level) {
      case "SUCCESS":
        return "text-tactical-green"
      case "WARNING":
        return "text-tactical-amber"
      case "ERROR":
      case "CRITICAL":
        return "text-tactical-red"
      case "INFO":
      default:
        return "text-tactical-blue"
    }
  }

  return (
    <div className="overflow-auto max-h-64">
      <div className="space-y-1 p-2">
        {activities.length > 0 ? (
          activities.slice(0, 10).map((activity) => (
            <div key={activity.id} className="flex items-start gap-2 text-xs font-mono">
              <span className="text-muted-foreground shrink-0">
                {new Date(activity.timestamp).toLocaleTimeString()}
              </span>
              <span className={`shrink-0 ${getLevelColor(activity.level)}`}>[{activity.level}]</span>
              <span className="text-foreground">{activity.event}</span>
              <span className="text-muted-foreground ml-auto shrink-0">{activity.source}</span>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-muted-foreground text-xs font-mono">NO RECENT ACTIVITIES</div>
        )}
      </div>
    </div>
  )
}
