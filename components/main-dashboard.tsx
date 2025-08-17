"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  TrendingUp,
  Target,
  Zap,
  Film,
  Edit,
  Youtube,
  Briefcase,
  Globe,
  UserCircle,
} from "lucide-react"
import { StatusGrid } from "@/components/status-grid"
import { MissionBoard } from "@/components/mission-board"
import { SystemsPanel } from "@/components/systems-panel"
import { IntelFeed } from "@/components/intel-feed"
import { CommLog } from "@/components/comm-log"

export function MainDashboard() {
  const categoryStats = [
    { name: "Film", count: 8, icon: Film, color: "text-purple-400", bgColor: "bg-purple-500/20" },
    { name: "Edit", count: 12, icon: Edit, color: "text-blue-400", bgColor: "bg-blue-500/20" },
    { name: "YouTube", count: 15, icon: Youtube, color: "text-red-400", bgColor: "bg-red-500/20" },
    { name: "Business", count: 6, icon: Briefcase, color: "text-amber-400", bgColor: "bg-amber-500/20" },
    { name: "Web Blog", count: 9, icon: Globe, color: "text-cyan-400", bgColor: "bg-cyan-500/20" },
    { name: "Personal", count: 4, icon: UserCircle, color: "text-pink-400", bgColor: "bg-pink-500/20" },
  ]

  return (
    <div className="space-y-6">
      {/* Status Overview */}
      <StatusGrid />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Mission Control</h1>
          <p className="text-slate-400 mt-1">Welcome back, Commander. Here's your creative project overview.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-green-500 text-green-400">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            All Systems Operational
          </Badge>
        </div>
      </div>

      {/* Category Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categoryStats.map((category) => {
          const IconComponent = category.icon
          return (
            <Card key={category.name} className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-200">{category.name}</CardTitle>
                <IconComponent className={`h-4 w-4 ${category.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{category.count}</div>
                <p className="text-xs text-slate-400">active tasks</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">Active Projects</CardTitle>
            <Target className="h-4 w-4 text-[#cd2027]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">18</div>
            <p className="text-xs text-slate-400">+3 from last week</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">Team Members</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">12</div>
            <p className="text-xs text-slate-400">6 online now</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">87%</div>
            <p className="text-xs text-slate-400">+8% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">System Status</CardTitle>
            <Zap className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">99.9%</div>
            <p className="text-xs text-slate-400">Uptime this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Mission Board */}
        <div className="lg:col-span-2">
          <MissionBoard />
        </div>

        {/* Right Column - Systems Panel */}
        <div>
          <SystemsPanel />
        </div>
      </div>

      {/* Project Progress by Category */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Active Projects Progress</CardTitle>
            <CardDescription className="text-slate-400">Current project completion status by category</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                name: "Documentary Film",
                progress: 85,
                status: "Post-Production",
                category: "Film",
                color: "text-purple-400",
              },
              {
                name: "YouTube Series Edit",
                progress: 62,
                status: "In Progress",
                category: "Edit",
                color: "text-blue-400",
              },
              {
                name: "Channel Optimization",
                progress: 94,
                status: "Near Complete",
                category: "YouTube",
                color: "text-red-400",
              },
              {
                name: "Client Proposal",
                progress: 38,
                status: "Early Stage",
                category: "Business",
                color: "text-amber-400",
              },
            ].map((project, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{project.name}</span>
                    <Badge variant="outline" className={`text-xs ${project.color} border-current`}>
                      {project.category}
                    </Badge>
                  </div>
                  <Badge variant="outline" className="border-slate-600 text-slate-300">
                    {project.status}
                  </Badge>
                </div>
                <Progress value={project.progress} className="h-2" />
                <div className="text-xs text-slate-400">{project.progress}% complete</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
            <CardDescription className="text-slate-400">Latest updates across all categories</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              {
                type: "success",
                message: "YouTube video uploaded successfully",
                time: "Just now",
                category: "YouTube",
                color: "text-red-400",
              },
              {
                type: "info",
                message: "Film editing session completed",
                time: "5 minutes ago",
                category: "Edit",
                color: "text-blue-400",
              },
              {
                type: "warning",
                message: "Blog post deadline approaching",
                time: "1 hour ago",
                category: "Web Blog",
                color: "text-cyan-400",
              },
            ].map((alert, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-slate-900/50">
                {alert.type === "warning" && <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />}
                {alert.type === "success" && <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />}
                {alert.type === "info" && <Clock className="h-4 w-4 text-blue-500 mt-0.5" />}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-white">{alert.message}</p>
                    <Badge variant="outline" className={`text-xs ${alert.color} border-current`}>
                      {alert.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-400">{alert.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <IntelFeed />
        <CommLog />
      </div>
    </div>
  )
}
