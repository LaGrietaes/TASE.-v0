"use client"

import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { TopNavigation } from "@/components/top-navigation"
import { TaskTracker } from "@/components/task-tracker"
import { MainDashboard } from "@/components/main-dashboard"
import { TaskBoard } from "@/components/task-board"
import { Calendar } from "@/components/calendar"
import { Projects } from "@/components/projects"
import { AIAssistant } from "@/components/ai-assistant"
import { RecentActivity } from "@/components/recent-activity"
import { Settings } from "@/components/settings"
import { Profile } from "@/components/profile"
import { useMissionData } from "@/hooks/use-mission-data"

export default function Page() {
  const [activeView, setActiveView] = useState("dashboard")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
  const [taskTrackerOpen, setTaskTrackerOpen] = useState(false)

  const { tasks, trackedTasks, trackTask, untrackTask, isTaskTracked } = useMissionData()

  console.log("🏠 Main Page render:", {
    activeView,
    sidebarCollapsed,
    taskTrackerOpen,
    trackedTasksCount: trackedTasks.length,
    totalTasks: tasks.length,
  })

  const handleToggleTracking = (taskId: string) => {
    console.log("🔄 Main page handleToggleTracking:", taskId)
    if (isTaskTracked(taskId)) {
      untrackTask(taskId)
    } else {
      trackTask(taskId)
    }
  }

  const handleViewChange = (view: string) => {
    console.log("📱 View change:", view)
    setActiveView(view)
  }

  const handleSidebarToggle = (collapsed: boolean) => {
    console.log("📱 Sidebar toggle:", collapsed)
    setSidebarCollapsed(collapsed)
  }

  const handleTaskTrackerToggle = () => {
    console.log("📱 Task tracker toggle:", !taskTrackerOpen)
    setTaskTrackerOpen(!taskTrackerOpen)
  }

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <MainDashboard />
      case "tasks":
        return <TaskBoard onToggleTracking={handleToggleTracking} trackedTasks={trackedTasks} />
      case "calendar":
        return <Calendar />
      case "projects":
        return <Projects />
      case "ai":
        return <AIAssistant />
      case "activity":
        return <RecentActivity />
      case "settings":
        return <Settings />
      case "profile":
        return <Profile />
      case "film":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Film Production</h1>
              <p className="text-gray-400">Manage film production tasks and workflows</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Active Projects</h3>
                <p className="text-gray-400">Track ongoing film productions</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Pre-Production</h3>
                <p className="text-gray-400">Planning and preparation tasks</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Post-Production</h3>
                <p className="text-gray-400">Editing and finishing work</p>
              </div>
            </div>
          </div>
        )
      case "edit":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Video Editing</h1>
              <p className="text-gray-400">Track video editing projects and timelines</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Current Edits</h3>
                <p className="text-gray-400">Active editing projects</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Review Queue</h3>
                <p className="text-gray-400">Videos awaiting review</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Completed</h3>
                <p className="text-gray-400">Finished editing work</p>
              </div>
            </div>
          </div>
        )
      case "youtube":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">YouTube Management</h1>
              <p className="text-gray-400">Manage YouTube content and publishing schedule</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Upload Queue</h3>
                <p className="text-gray-400">Videos ready for upload</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Analytics</h3>
                <p className="text-gray-400">Channel performance metrics</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Content Calendar</h3>
                <p className="text-gray-400">Publishing schedule</p>
              </div>
            </div>
          </div>
        )
      case "web":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Web Development</h1>
              <p className="text-gray-400">Track web development projects and blog content</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Active Sites</h3>
                <p className="text-gray-400">Current web projects</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Blog Posts</h3>
                <p className="text-gray-400">Content creation pipeline</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Maintenance</h3>
                <p className="text-gray-400">Site updates and fixes</p>
              </div>
            </div>
          </div>
        )
      case "business":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Business Operations</h1>
              <p className="text-gray-400">Manage business tasks and strategic initiatives</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Client Projects</h3>
                <p className="text-gray-400">Active client work</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Proposals</h3>
                <p className="text-gray-400">Business development</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Administration</h3>
                <p className="text-gray-400">Business admin tasks</p>
              </div>
            </div>
          </div>
        )
      case "systems":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Systems Management</h1>
              <p className="text-gray-400">Monitor and manage system operations</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Server Status</h3>
                <p className="text-gray-400">System health monitoring</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Backups</h3>
                <p className="text-gray-400">Data backup management</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Updates</h3>
                <p className="text-gray-400">System maintenance</p>
              </div>
            </div>
          </div>
        )
      case "analytics":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
              <p className="text-gray-400">View performance metrics and analytics</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Performance</h3>
                <p className="text-gray-400">System performance metrics</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Usage Stats</h3>
                <p className="text-gray-400">Application usage data</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Reports</h3>
                <p className="text-gray-400">Generated reports</p>
              </div>
            </div>
          </div>
        )
      case "database":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Database Management</h1>
              <p className="text-gray-400">Manage database operations and queries</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Connections</h3>
                <p className="text-gray-400">Active database connections</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Queries</h3>
                <p className="text-gray-400">Query performance</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Maintenance</h3>
                <p className="text-gray-400">Database optimization</p>
              </div>
            </div>
          </div>
        )
      default:
        return <MainDashboard />
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <SidebarProvider>
        <div className="flex">
          <AppSidebar
            activeView={activeView}
            setActiveView={handleViewChange}
            collapsed={sidebarCollapsed}
            setCollapsed={handleSidebarToggle}
          />

          <div
            className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ml-16 ${taskTrackerOpen ? "mr-96" : ""}`}
          >
            <TopNavigation
              onToggleTaskTracker={handleTaskTrackerToggle}
              trackedTasksCount={trackedTasks.length}
              sidebarCollapsed={sidebarCollapsed}
            />

            <main className="flex-1 pt-16 p-6 overflow-auto">{renderContent()}</main>
          </div>

          <TaskTracker
            isOpen={taskTrackerOpen}
            onClose={() => setTaskTrackerOpen(false)}
            trackedTasks={trackedTasks}
            onToggleTracking={handleToggleTracking}
          />
        </div>
      </SidebarProvider>
    </div>
  )
}
