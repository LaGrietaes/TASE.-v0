"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Clock, User, Plus, ChevronLeft, ChevronRight, Filter, Search } from "lucide-react"
import { useMissionData } from "@/hooks/use-mission-data"

export function MissionBoard() {
  const { missionData } = useMissionData()
  const { todos } = missionData
  const [currentDate, setCurrentDate] = useState(new Date())
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("ALL")
  const [filterStatus, setFilterStatus] = useState("ALL")

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "CRITICAL":
        return "text-tactical-red border-tactical-red"
      case "HIGH":
        return "text-tactical-amber border-tactical-amber"
      case "MEDIUM":
        return "text-tactical-blue border-tactical-blue"
      case "LOW":
        return "text-tactical-green border-tactical-green"
      default:
        return "text-muted-foreground border-border"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "text-tactical-green"
      case "IN_PROGRESS":
        return "text-tactical-amber"
      case "CANCELLED":
        return "text-tactical-red"
      case "PENDING":
      default:
        return "text-muted-foreground"
    }
  }

  // Calendar functionality
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1))
  }

  const getTodosForDate = (day: number) => {
    const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString()
    return todos.filter((todo) => new Date(todo.dueDate).toDateString() === dateStr)
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-20 border border-border bg-muted/20"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayTodos = getTodosForDate(day)
      const isToday =
        new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString()

      days.push(
        <div key={day} className={`h-20 border border-border bg-card p-1 ${isToday ? "bg-accent/20" : ""}`}>
          <div className={`text-xs font-mono mb-1 ${isToday ? "text-tactical-red font-bold" : ""}`}>{day}</div>
          <div className="space-y-1">
            {dayTodos.slice(0, 2).map((todo) => (
              <div
                key={todo.id}
                className={`text-xs px-1 py-0.5 border-l-2 ${getPriorityColor(todo.priority)} bg-background/50 truncate`}
              >
                {todo.title}
              </div>
            ))}
            {dayTodos.length > 2 && <div className="text-xs text-muted-foreground">+{dayTodos.length - 2} more</div>}
          </div>
        </div>,
      )
    }

    return days
  }

  // Filter todos
  const filteredTodos = todos.filter((todo) => {
    const matchesSearch =
      todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "ALL" || todo.category === filterCategory
    const matchesStatus = filterStatus === "ALL" || todo.status === filterStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const todaysTodos = filteredTodos.filter((todo) => {
    const dueDate = new Date(todo.dueDate)
    const today = new Date()
    return dueDate.toDateString() === today.toDateString()
  })

  const upcomingTodos = filteredTodos.filter((todo) => {
    const dueDate = new Date(todo.dueDate)
    const today = new Date()
    const nextWeek = new Date(today)
    nextWeek.setDate(nextWeek.getDate() + 7)
    return dueDate > today && dueDate <= nextWeek
  })

  return (
    <div className="space-y-4">
      {/* Compact Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border bg-card">
          <CardContent className="p-3">
            <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">TODAY'S TASKS</div>
            <div className="text-xl font-mono text-tactical-amber">{todaysTodos.length}</div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-3">
            <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">THIS WEEK</div>
            <div className="text-xl font-mono text-tactical-blue">{upcomingTodos.length}</div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-3">
            <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">CRITICAL</div>
            <div className="text-xl font-mono text-tactical-red">
              {filteredTodos.filter((t) => t.priority === "CRITICAL").length}
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-3">
            <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">COMPLETED</div>
            <div className="text-xl font-mono text-tactical-green">
              {filteredTodos.filter((t) => t.status === "COMPLETED").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-border bg-card">
        <CardContent className="p-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 flex-1">
              <Search className="h-3 w-3 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="tactical-button h-6 text-xs flex-1"
                placeholder="Search tasks..."
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-3 w-3 text-muted-foreground" />
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="tactical-button h-6 w-32 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">ALL CATEGORIES</SelectItem>
                  <SelectItem value="MISSION">MISSION</SelectItem>
                  <SelectItem value="MAINTENANCE">MAINTENANCE</SelectItem>
                  <SelectItem value="SECURITY">SECURITY</SelectItem>
                  <SelectItem value="INTEL">INTEL</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="tactical-button h-6 w-32 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">ALL STATUS</SelectItem>
                  <SelectItem value="PENDING">PENDING</SelectItem>
                  <SelectItem value="IN_PROGRESS">IN PROGRESS</SelectItem>
                  <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                  <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              className="tactical-button h-6 px-2"
              onClick={() => window.dispatchEvent(new CustomEvent("openQuickAdd"))}
            >
              <Plus className="h-3 w-3 mr-1" />
              ADD
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Calendar and Todo Layout - Side by Side */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 min-h-[600px]">
        {/* Calendar View - Left Side */}
        <Card className="border-border bg-card">
          <CardHeader className="border-b border-border pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-mono uppercase tracking-wider">
                {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" }).toUpperCase()}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button className="tactical-button h-6 w-6 p-0" onClick={() => navigateMonth(-1)}>
                  <ChevronLeft className="h-3 w-3" />
                </Button>
                <Button className="tactical-button h-6 px-2" onClick={() => setCurrentDate(new Date())}>
                  TODAY
                </Button>
                <Button className="tactical-button h-6 w-6 p-0" onClick={() => navigateMonth(1)}>
                  <ChevronRight className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
                <div key={day} className="text-xs font-mono text-center py-2 text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
          </CardContent>
        </Card>

        {/* Todo Lists - Right Side */}
        <div className="space-y-4">
          {/* Today's Tasks */}
          <Card className="border-border bg-card">
            <CardHeader className="border-b border-border pb-2">
              <CardTitle className="text-xs font-mono uppercase tracking-wider">
                TODAY'S TASKS ({todaysTodos.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-64 overflow-auto">
                {todaysTodos.length > 0 ? (
                  <div className="space-y-2 p-4">
                    {todaysTodos.map((todo) => (
                      <div key={todo.id} className={`border-l-2 pl-3 py-2 ${getPriorityColor(todo.priority)}`}>
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="text-xs font-mono font-semibold">{todo.title}</div>
                            <div className="text-xs text-muted-foreground">{todo.description}</div>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {todo.assignee}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {new Date(todo.dueDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                              </div>
                            </div>
                          </div>
                          <div className={`text-xs font-mono ${getStatusColor(todo.status)}`}>{todo.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-muted-foreground text-xs font-mono">
                    NO TASKS SCHEDULED FOR TODAY
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Tasks */}
          <Card className="border-border bg-card">
            <CardHeader className="border-b border-border pb-2">
              <CardTitle className="text-xs font-mono uppercase tracking-wider">
                UPCOMING TASKS ({upcomingTodos.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-64 overflow-auto">
                {upcomingTodos.length > 0 ? (
                  <div className="space-y-2 p-4">
                    {upcomingTodos.slice(0, 10).map((todo) => (
                      <div key={todo.id} className={`border-l-2 pl-3 py-2 ${getPriorityColor(todo.priority)}`}>
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="text-xs font-mono font-semibold">{todo.title}</div>
                            <div className="text-xs text-muted-foreground">{todo.description}</div>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {todo.assignee}
                              </div>
                              <div className="flex items-center gap-1">
                                <CalendarIcon className="h-3 w-3" />
                                {new Date(todo.dueDate).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <div className={`text-xs font-mono ${getStatusColor(todo.status)}`}>{todo.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-muted-foreground text-xs font-mono">NO UPCOMING TASKS</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Task Categories Summary - Bottom Section */}
      <Card className="border-border bg-card">
        <CardHeader className="border-b border-border pb-2">
          <CardTitle className="text-xs font-mono uppercase tracking-wider">TASK CATEGORIES OVERVIEW</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {["MISSION", "MAINTENANCE", "SECURITY", "INTEL"].map((category) => {
              const categoryTodos = filteredTodos.filter((t) => t.category === category)
              const completedCount = categoryTodos.filter((t) => t.status === "COMPLETED").length
              const pendingCount = categoryTodos.filter((t) => t.status === "PENDING").length
              const inProgressCount = categoryTodos.filter((t) => t.status === "IN_PROGRESS").length

              return (
                <div key={category} className="border border-border p-3 space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground border-b border-border pb-1">
                    {category} ({categoryTodos.length})
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-tactical-green">COMPLETED</span>
                      <span className="text-tactical-green">{completedCount}</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-tactical-amber">IN PROGRESS</span>
                      <span className="text-tactical-amber">{inProgressCount}</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-muted-foreground">PENDING</span>
                      <span className="text-muted-foreground">{pendingCount}</span>
                    </div>
                  </div>
                  <div className="w-full bg-secondary h-2">
                    <div
                      className="h-2 bg-tactical-green"
                      style={{
                        width: `${categoryTodos.length > 0 ? (completedCount / categoryTodos.length) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
