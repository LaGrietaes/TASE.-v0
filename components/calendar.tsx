"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, CalendarIcon, Clock, AlertTriangle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useMissionData } from "@/hooks/use-mission-data"
import type { Task } from "@/lib/types"

export function Calendar() {
  const { tasks } = useMissionData()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [showTaskDialog, setShowTaskDialog] = useState(false)

  console.log("Calendar render:", { tasksCount: tasks.length, currentDate })

  // Get tasks for a specific date
  const getTasksForDate = (date: Date): Task[] => {
    const dateStr = date.toISOString().split("T")[0]
    return tasks.filter((task) => {
      if (!task.dueDate) return false
      try {
        const taskDate = new Date(task.dueDate)
        if (isNaN(taskDate.getTime())) {
          console.warn("Invalid task date:", task.dueDate, "for task:", task.id)
          return false
        }
        const taskDateStr = taskDate.toISOString().split("T")[0]
        return taskDateStr === dateStr
      } catch (error) {
        console.error("Error parsing task date:", task.dueDate, error)
        return false
      }
    })
  }

  // Navigate months
  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  // Get calendar days
  const getCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = []
    const currentDateObj = new Date(startDate)

    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDateObj))
      currentDateObj.setDate(currentDateObj.getDate() + 1)
    }

    return days
  }

  const handleDateClick = (date: Date) => {
    const tasksForDate = getTasksForDate(date)
    if (tasksForDate.length > 0) {
      setSelectedDate(date)
      setShowTaskDialog(true)
    }
  }

  const getTaskIcon = (task: Task) => {
    switch (task.status.toLowerCase()) {
      case "completed":
        return <CheckCircle className="h-3 w-3 text-green-400" />
      case "in-progress":
        return <Clock className="h-3 w-3 text-blue-400" />
      case "blocked":
        return <AlertTriangle className="h-3 w-3 text-red-400" />
      default:
        return <CalendarIcon className="h-3 w-3 text-slate-400" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "critical":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "high":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  const calendarDays = getCalendarDays()
  const today = new Date()
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Mission Calendar</h1>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth("prev")}
            className="text-slate-300 border-slate-600 hover:bg-slate-800"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-lg font-semibold text-white min-w-[200px] text-center">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth("next")}
            className="text-slate-300 border-slate-600 hover:bg-slate-800"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardContent className="p-6">
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {dayNames.map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-slate-400">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((date, index) => {
              const isCurrentMonth = date.getMonth() === currentDate.getMonth()
              const isToday = date.toDateString() === today.toDateString()
              const tasksForDate = getTasksForDate(date)
              const hasEvents = tasksForDate.length > 0

              return (
                <div
                  key={index}
                  onClick={() => handleDateClick(date)}
                  className={`
                    min-h-[80px] p-2 border border-slate-700/30 rounded-lg transition-colors cursor-pointer
                    ${isCurrentMonth ? "bg-slate-900/30" : "bg-slate-900/10"}
                    ${isToday ? "ring-2 ring-[#cd2027] bg-[#cd2027]/10" : ""}
                    ${hasEvents ? "hover:bg-slate-700/30" : "hover:bg-slate-800/30"}
                  `}
                >
                  <div className={`text-sm font-medium mb-1 ${isCurrentMonth ? "text-white" : "text-slate-500"}`}>
                    {date.getDate()}
                  </div>

                  {hasEvents && (
                    <div className="space-y-1">
                      {tasksForDate.slice(0, 2).map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center space-x-1 text-xs bg-slate-800/50 rounded px-1 py-0.5"
                        >
                          {getTaskIcon(task)}
                          <span className="text-slate-300 truncate">
                            {task.title.length > 12 ? `${task.title.substring(0, 12)}...` : task.title}
                          </span>
                        </div>
                      ))}
                      {tasksForDate.length > 2 && (
                        <div className="text-xs text-slate-400 px-1">+{tasksForDate.length - 2} more</div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Task Dialog */}
      <Dialog open={showTaskDialog} onOpenChange={setShowTaskDialog}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5" />
              <span>
                Tasks for{" "}
                {selectedDate?.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {selectedDate &&
              getTasksForDate(selectedDate).map((task) => (
                <div key={task.id} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/30">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getTaskIcon(task)}
                      <h3 className="font-medium text-white">{task.title}</h3>
                    </div>
                  </div>

                  {task.description && <p className="text-sm text-slate-400 mb-3">{task.description}</p>}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={`text-xs ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </Badge>
                      <Badge variant="outline" className="text-xs text-slate-400 border-slate-600">
                        {task.status}
                      </Badge>
                    </div>

                    {task.assignee && <div className="text-sm text-slate-500">Assigned to: {task.assignee}</div>}
                  </div>
                </div>
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
