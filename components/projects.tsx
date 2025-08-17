"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plus, Users, Calendar, MoreHorizontal, Film, Edit, Youtube, Briefcase, Globe, UserCircle } from "lucide-react"

export function Projects() {
  const projects = [
    {
      id: 1,
      name: "Documentary Series",
      description: "Complete documentary series about urban wildlife",
      category: "Film",
      status: "In Progress",
      progress: 65,
      team: ["Director", "Cinematographer", "Producer"],
      dueDate: "2024-02-15",
      tasks: { total: 24, completed: 16 },
      icon: Film,
      color: "text-purple-400",
      borderColor: "border-l-purple-400",
    },
    {
      id: 2,
      name: "YouTube Channel Rebrand",
      description: "Complete rebrand including new intro, thumbnails, and channel art",
      category: "YouTube",
      status: "Planning",
      progress: 25,
      team: ["Designer", "Content Manager", "Editor"],
      dueDate: "2024-03-30",
      tasks: { total: 18, completed: 5 },
      icon: Youtube,
      color: "text-red-400",
      borderColor: "border-l-red-400",
    },
    {
      id: 3,
      name: "Corporate Video Edit",
      description: "Post-production for client's promotional video campaign",
      category: "Edit",
      status: "In Progress",
      progress: 80,
      team: ["Editor", "Colorist"],
      dueDate: "2024-01-25",
      tasks: { total: 12, completed: 10 },
      icon: Edit,
      color: "text-blue-400",
      borderColor: "border-l-blue-400",
    },
    {
      id: 4,
      name: "Business Expansion Plan",
      description: "Strategic planning for studio expansion and new equipment",
      category: "Business",
      status: "Completed",
      progress: 100,
      team: ["Business Dev", "Finance", "Operations"],
      dueDate: "2024-01-10",
      tasks: { total: 15, completed: 15 },
      icon: Briefcase,
      color: "text-amber-400",
      borderColor: "border-l-amber-400",
    },
    {
      id: 5,
      name: "Portfolio Website",
      description: "New portfolio website showcasing recent film and video work",
      category: "Web Blog",
      status: "In Progress",
      progress: 45,
      team: ["Web Developer", "Designer", "Content Writer"],
      dueDate: "2024-02-20",
      tasks: { total: 22, completed: 10 },
      icon: Globe,
      color: "text-cyan-400",
      borderColor: "border-l-cyan-400",
    },
    {
      id: 6,
      name: "Skill Development",
      description: "Personal learning goals and professional development",
      category: "Personal",
      status: "In Progress",
      progress: 60,
      team: ["Self"],
      dueDate: "2024-04-01",
      tasks: { total: 8, completed: 5 },
      icon: UserCircle,
      color: "text-pink-400",
      borderColor: "border-l-pink-400",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500 text-white"
      case "In Progress":
        return "bg-blue-500 text-white"
      case "Planning":
        return "bg-yellow-500 text-white"
      case "On Hold":
        return "bg-gray-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const categoryStats = [
    { name: "Film", count: projects.filter((p) => p.category === "Film").length, color: "text-purple-400" },
    { name: "Edit", count: projects.filter((p) => p.category === "Edit").length, color: "text-blue-400" },
    { name: "YouTube", count: projects.filter((p) => p.category === "YouTube").length, color: "text-red-400" },
    { name: "Business", count: projects.filter((p) => p.category === "Business").length, color: "text-amber-400" },
    { name: "Web Blog", count: projects.filter((p) => p.category === "Web Blog").length, color: "text-cyan-400" },
    { name: "Personal", count: projects.filter((p) => p.category === "Personal").length, color: "text-pink-400" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <p className="text-slate-400">Manage and track your creative projects across all categories</p>
        </div>
        <Button className="bg-[#cd2027] hover:bg-[#cd2027]/80 text-white">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Category Overview */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Project Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categoryStats.map((category) => (
              <div key={category.name} className="text-center">
                <div className={`text-2xl font-bold ${category.color}`}>{category.count}</div>
                <p className="text-sm text-slate-400">{category.name}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => {
          const IconComponent = project.icon
          return (
            <Card key={project.id} className={`border-l-4 ${project.borderColor} bg-slate-800/50 border-slate-700`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <IconComponent className={`h-5 w-5 ${project.color} mt-1`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-lg text-white">{project.name}</CardTitle>
                        <Badge variant="outline" className={`text-xs ${project.color} border-current`}>
                          {project.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-400 mt-1">{project.description}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                  <span className="text-sm font-medium text-white">{project.progress}%</span>
                </div>

                <div className="space-y-2">
                  <Progress value={project.progress} className="h-2" />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>
                      {project.tasks.completed}/{project.tasks.total} tasks completed
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span className="text-slate-300">{project.team.join(", ")}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span className="text-slate-300">{project.dueDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Project Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{projects.length}</div>
              <p className="text-sm text-slate-400">Total Projects</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {projects.filter((p) => p.status === "In Progress").length}
              </div>
              <p className="text-sm text-slate-400">In Progress</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {projects.filter((p) => p.status === "Completed").length}
              </div>
              <p className="text-sm text-slate-400">Completed</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {projects.filter((p) => p.status === "Planning").length}
              </div>
              <p className="text-sm text-slate-400">Planning</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
