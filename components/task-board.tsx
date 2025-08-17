"use client"

import type React from "react"

import { useState } from "react"
import {
  Eye,
  EyeOff,
  Clock,
  AlertTriangle,
  CheckCircle,
  Circle,
  ChevronDown,
  ChevronRight,
  User,
  Target,
  Edit,
  Save,
  X,
  Plus,
  MoreHorizontal,
  Film,
  Youtube,
  Briefcase,
  Globe,
  UserCircle,
  Wrench,
  Shield,
  Zap,
  Paperclip,
  LinkIcon,
  ImageIcon,
  CheckSquare,
  MessageSquare,
  Calendar,
  Upload,
  Twitter,
  Instagram,
  Facebook,
  Linkedin,
  Hash,
  ExternalLink,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useMissionData } from "@/hooks/use-mission-data"
import type { Task, ChecklistItem, Link, SocialAccount, Comment } from "@/lib/types"

interface TaskBoardProps {
  onToggleTracking: (taskId: string) => void
  trackedTasks: Task[]
}

export function TaskBoard({ onToggleTracking, trackedTasks }: TaskBoardProps) {
  const { tasks, isTaskTracked, updateTaskStatus } = useMissionData()
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    Film: true,
    Edit: true,
    YouTube: true,
    Business: true,
    "Web Blog": true,
    Personal: true,
    Maintenance: true,
    Security: true,
    Intel: true,
  })

  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedTask, setEditedTask] = useState<Task | null>(null)
  const [newChecklistItem, setNewChecklistItem] = useState("")
  const [newLink, setNewLink] = useState({ title: "", url: "", description: "" })
  const [newSocialAccount, setNewSocialAccount] = useState({ platform: "", username: "", url: "" })
  const [newComment, setNewComment] = useState("")

  console.log("TaskBoard render:", {
    tasksCount: tasks.length,
    trackedTasksCount: trackedTasks.length,
    tasks: tasks.map((t) => ({ id: t.id, title: t.title, tracked: isTaskTracked(t.id) })),
  })

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task)
    setEditedTask({ ...task })
    setIsDialogOpen(true)
    setIsEditing(false)
  }

  const handleEditToggle = () => {
    setIsEditing(!isEditing)
    if (!isEditing && selectedTask) {
      setEditedTask({ ...selectedTask })
    }
  }

  const handleSaveEdit = () => {
    if (editedTask) {
      console.log("Saving task:", editedTask)
      setSelectedTask(editedTask)
      setIsEditing(false)
    }
  }

  const handleInputChange = (field: keyof Task, value: any) => {
    if (editedTask) {
      setEditedTask({ ...editedTask, [field]: value })
    }
  }

  const addChecklistItem = () => {
    if (newChecklistItem.trim() && editedTask) {
      const newItem: ChecklistItem = {
        id: Date.now().toString(),
        text: newChecklistItem.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
      }
      setEditedTask({
        ...editedTask,
        checklist: [...editedTask.checklist, newItem],
      })
      setNewChecklistItem("")
    }
  }

  const toggleChecklistItem = (itemId: string) => {
    if (editedTask) {
      setEditedTask({
        ...editedTask,
        checklist: editedTask.checklist.map((item) =>
          item.id === itemId ? { ...item, completed: !item.completed } : item,
        ),
      })
    }
  }

  const removeChecklistItem = (itemId: string) => {
    if (editedTask) {
      setEditedTask({
        ...editedTask,
        checklist: editedTask.checklist.filter((item) => item.id !== itemId),
      })
    }
  }

  const addLink = () => {
    if (newLink.title.trim() && newLink.url.trim() && editedTask) {
      const link: Link = {
        id: Date.now().toString(),
        title: newLink.title.trim(),
        url: newLink.url.trim(),
        description: newLink.description.trim() || undefined,
        createdAt: new Date().toISOString(),
      }
      setEditedTask({
        ...editedTask,
        links: [...editedTask.links, link],
      })
      setNewLink({ title: "", url: "", description: "" })
    }
  }

  const removeLink = (linkId: string) => {
    if (editedTask) {
      setEditedTask({
        ...editedTask,
        links: editedTask.links.filter((link) => link.id !== linkId),
      })
    }
  }

  const addSocialAccount = () => {
    if (newSocialAccount.platform && newSocialAccount.username.trim() && editedTask) {
      const social: SocialAccount = {
        id: Date.now().toString(),
        platform: newSocialAccount.platform as any,
        username: newSocialAccount.username.trim(),
        url: newSocialAccount.url.trim() || `https://${newSocialAccount.platform}.com/${newSocialAccount.username}`,
        createdAt: new Date().toISOString(),
      }
      setEditedTask({
        ...editedTask,
        socialAccounts: [...editedTask.socialAccounts, social],
      })
      setNewSocialAccount({ platform: "", username: "", url: "" })
    }
  }

  const removeSocialAccount = (socialId: string) => {
    if (editedTask) {
      setEditedTask({
        ...editedTask,
        socialAccounts: editedTask.socialAccounts.filter((social) => social.id !== socialId),
      })
    }
  }

  const addComment = () => {
    if (newComment.trim() && editedTask) {
      const comment: Comment = {
        id: Date.now().toString(),
        text: newComment.trim(),
        author: "Current User", // In a real app, this would be the logged-in user
        createdAt: new Date().toISOString(),
      }
      setEditedTask({
        ...editedTask,
        comments: [...editedTask.comments, comment],
      })
      setNewComment("")
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Film":
        return Film
      case "Edit":
        return Edit
      case "YouTube":
        return Youtube
      case "Business":
        return Briefcase
      case "Web Blog":
        return Globe
      case "Personal":
        return UserCircle
      case "Maintenance":
        return Wrench
      case "Security":
        return Shield
      case "Intel":
        return Zap
      default:
        return Target
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Film":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case "Edit":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "YouTube":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "Business":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30"
      case "Web Blog":
        return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
      case "Personal":
        return "bg-pink-500/20 text-pink-400 border-pink-500/30"
      case "Maintenance":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Security":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "Intel":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-500/20 text-red-400"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400"
      case "low":
        return "bg-green-500/20 text-green-400"
      default:
        return "bg-slate-500/20 text-slate-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "in progress":
        return <Clock className="h-4 w-4 text-blue-400" />
      case "pending":
        return <Circle className="h-4 w-4 text-slate-400" />
      case "on hold":
        return <AlertTriangle className="h-4 w-4 text-orange-400" />
      default:
        return <Circle className="h-4 w-4 text-slate-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "in progress":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "pending":
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
      case "on hold":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  const getStatusProgress = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return 100
      case "in progress":
        return 60
      case "pending":
        return 0
      case "on hold":
        return 30
      default:
        return 0
    }
  }

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "twitter":
        return <Twitter className="h-4 w-4" />
      case "instagram":
        return <Instagram className="h-4 w-4" />
      case "facebook":
        return <Facebook className="h-4 w-4" />
      case "linkedin":
        return <Linkedin className="h-4 w-4" />
      case "youtube":
        return <Youtube className="h-4 w-4" />
      default:
        return <Hash className="h-4 w-4" />
    }
  }

  const handleToggleTracking = (taskId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    console.log("TaskBoard handleToggleTracking:", taskId)
    onToggleTracking(taskId)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && editedTask) {
      // In a real app, you would upload these files to a server
      // For now, we'll just create mock attachments
      const newAttachments = Array.from(files).map((file) => ({
        id: Date.now().toString() + Math.random(),
        name: file.name,
        url: URL.createObjectURL(file), // This is just for preview, in real app use server URL
        type: file.type.startsWith("image/") ? ("image" as const) : ("document" as const),
        size: file.size,
        uploadedAt: new Date().toISOString(),
      }))

      setEditedTask({
        ...editedTask,
        attachments: [...editedTask.attachments, ...newAttachments],
      })
    }
  }

  const removeAttachment = (attachmentId: string) => {
    if (editedTask) {
      setEditedTask({
        ...editedTask,
        attachments: editedTask.attachments.filter((att) => att.id !== attachmentId),
      })
    }
  }

  // Group tasks by category
  const tasksByCategory = tasks.reduce(
    (acc, task) => {
      if (!acc[task.category]) {
        acc[task.category] = []
      }
      acc[task.category].push(task)
      return acc
    },
    {} as Record<string, Task[]>,
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">TASK BOARD</h1>
          <p className="text-gray-400">Manage and track mission-critical tasks</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white border border-blue-500/30">
            <Plus className="w-4 h-4 mr-2" />
            ADD TASK
          </Button>
          <Badge variant="secondary" className="bg-slate-800 text-slate-300">
            {tasks.length} Total Tasks
          </Badge>
          <Badge variant="secondary" className="bg-[#cd2027] text-white">
            {trackedTasks.length} Tracked
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(tasksByCategory).map(([category, categoryTasks]) => {
          const IconComponent = getCategoryIcon(category)
          const isCollapsed = !openCategories[category]

          return (
            <Card key={category} className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
              <Collapsible open={openCategories[category]} onOpenChange={() => toggleCategory(category)}>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-gray-700/30 transition-colors border-b border-gray-700/50">
                    <CardTitle className="flex items-center justify-between text-white">
                      <div className="flex items-center space-x-3">
                        {isCollapsed ? (
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                        <IconComponent className="h-5 w-5 text-blue-400" />
                        <span>{category}</span>
                        <Badge className={`${getCategoryColor(category)}`}>{categoryTasks.length}</Badge>
                      </div>
                    </CardTitle>
                  </CardHeader>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {categoryTasks.map((task) => {
                        const tracked = trackedTasks.some((t) => t.id === task.id)
                        const progress = getStatusProgress(task.status)
                        const completedChecklist = task.checklist?.filter((item) => item.completed).length || 0
                        const totalChecklist = task.checklist?.length || 0

                        return (
                          <Card
                            key={task.id}
                            className={`bg-gray-800/50 border-gray-700/50 hover:border-blue-500/50 transition-colors cursor-pointer ${
                              tracked ? "border-[#cd2027]/50 bg-[#cd2027]/5" : ""
                            }`}
                            onClick={() => handleTaskClick(task)}
                          >
                            <CardContent className="p-4">
                              {/* Cover Image */}
                              {task.coverImage && (
                                <div className="mb-3 -mx-4 -mt-4">
                                  <img
                                    src={task.coverImage || "/placeholder.svg"}
                                    alt="Task cover"
                                    className="w-full h-32 object-cover rounded-t-lg"
                                  />
                                </div>
                              )}

                              <div className="flex items-start justify-between mb-3">
                                <h3 className="font-semibold text-white text-sm leading-tight flex-1">{task.title}</h3>
                                <div className="flex items-center gap-1 ml-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => handleToggleTracking(task.id, e)}
                                    className={`h-6 w-6 p-0 transition-all duration-200 ${
                                      tracked
                                        ? "text-[#cd2027] hover:text-[#cd2027]/80 bg-[#cd2027]/10 hover:bg-[#cd2027]/20 border border-[#cd2027]/30"
                                        : "text-gray-500 hover:text-blue-400 hover:bg-blue-400/10"
                                    }`}
                                  >
                                    {tracked ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => e.stopPropagation()}
                                    className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                                  >
                                    <MoreHorizontal className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>

                              <div className="space-y-3">
                                {/* Labels */}
                                {task.labels && task.labels.length > 0 && (
                                  <div className="flex flex-wrap gap-1">
                                    {task.labels.slice(0, 3).map((label) => (
                                      <Badge
                                        key={label.id}
                                        className="text-xs px-2 py-0"
                                        style={{ backgroundColor: label.color + "20", color: label.color }}
                                      >
                                        {label.name}
                                      </Badge>
                                    ))}
                                    {task.labels.length > 3 && (
                                      <Badge className="text-xs px-2 py-0 bg-gray-600 text-gray-300">
                                        +{task.labels.length - 3}
                                      </Badge>
                                    )}
                                  </div>
                                )}

                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                  <User className="h-3 w-3" />
                                  <span>{task.assignee || "Unassigned"}</span>
                                  {task.dueDate && (
                                    <>
                                      <Clock className="h-3 w-3 ml-2" />
                                      <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                                    </>
                                  )}
                                </div>

                                <div className="flex items-center gap-2">
                                  <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                                    {task.priority}
                                  </Badge>
                                  <Badge className={`text-xs ${getStatusColor(task.status)}`}>{task.status}</Badge>
                                </div>

                                {/* Progress */}
                                <div className="space-y-1">
                                  <div className="flex justify-between text-xs">
                                    <span className="text-gray-400">Progress</span>
                                    <span className="text-gray-400">{progress}%</span>
                                  </div>
                                  <Progress value={progress} className="h-1" />
                                </div>

                                {/* Task Indicators */}
                                <div className="flex items-center gap-3 text-xs text-gray-400">
                                  {totalChecklist > 0 && (
                                    <div className="flex items-center gap-1">
                                      <CheckSquare className="h-3 w-3" />
                                      <span>
                                        {completedChecklist}/{totalChecklist}
                                      </span>
                                    </div>
                                  )}
                                  {task.attachments && task.attachments.length > 0 && (
                                    <div className="flex items-center gap-1">
                                      <Paperclip className="h-3 w-3" />
                                      <span>{task.attachments.length}</span>
                                    </div>
                                  )}
                                  {task.comments && task.comments.length > 0 && (
                                    <div className="flex items-center gap-1">
                                      <MessageSquare className="h-3 w-3" />
                                      <span>{task.comments.length}</span>
                                    </div>
                                  )}
                                  {task.links && task.links.length > 0 && (
                                    <div className="flex items-center gap-1">
                                      <LinkIcon className="h-3 w-3" />
                                      <span>{task.links.length}</span>
                                    </div>
                                  )}
                                </div>

                                <p className="text-xs text-gray-500 line-clamp-2">{task.description}</p>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          )
        })}
      </div>

      {/* Enhanced Task Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {selectedTask && (
                  <>
                    {(() => {
                      const IconComponent = getCategoryIcon(selectedTask.category)
                      return <IconComponent className="w-5 h-5 text-blue-400" />
                    })()}
                    {isEditing ? "Edit Task" : selectedTask.title}
                  </>
                )}
              </div>
              <div className="flex items-center gap-2">
                {!isEditing ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleEditToggle}
                    className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 bg-transparent"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSaveEdit}
                      className="border-green-500/50 text-green-400 hover:bg-green-500/10 bg-transparent"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleEditToggle}
                      className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </DialogTitle>
          </DialogHeader>

          {selectedTask && (
            <ScrollArea className="max-h-[calc(90vh-8rem)]">
              <div className="space-y-6 pr-4">
                {isEditing && editedTask ? (
                  // Edit Mode with Tabs
                  <Tabs defaultValue="details" className="w-full">
                    <TabsList className="grid w-full grid-cols-6 bg-gray-800">
                      <TabsTrigger value="details">Details</TabsTrigger>
                      <TabsTrigger value="checklist">Checklist</TabsTrigger>
                      <TabsTrigger value="attachments">Files</TabsTrigger>
                      <TabsTrigger value="links">Links</TabsTrigger>
                      <TabsTrigger value="social">Social</TabsTrigger>
                      <TabsTrigger value="comments">Comments</TabsTrigger>
                    </TabsList>

                    <TabsContent value="details" className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="title" className="text-xs font-mono text-gray-400">
                            TITLE
                          </Label>
                          <Input
                            id="title"
                            value={editedTask.title}
                            onChange={(e) => handleInputChange("title", e.target.value)}
                            className="bg-gray-800 border-gray-600 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="assignee" className="text-xs font-mono text-gray-400">
                            ASSIGNEE
                          </Label>
                          <Input
                            id="assignee"
                            value={editedTask.assignee || ""}
                            onChange={(e) => handleInputChange("assignee", e.target.value)}
                            className="bg-gray-800 border-gray-600 text-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="priority" className="text-xs font-mono text-gray-400">
                            PRIORITY
                          </Label>
                          <Select
                            value={editedTask.priority}
                            onValueChange={(value) => handleInputChange("priority", value)}
                          >
                            <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-600">
                              <SelectItem value="Low">Low</SelectItem>
                              <SelectItem value="Medium">Medium</SelectItem>
                              <SelectItem value="High">High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="status" className="text-xs font-mono text-gray-400">
                            STATUS
                          </Label>
                          <Select
                            value={editedTask.status}
                            onValueChange={(value) => handleInputChange("status", value)}
                          >
                            <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-600">
                              <SelectItem value="Pending">Pending</SelectItem>
                              <SelectItem value="In Progress">In Progress</SelectItem>
                              <SelectItem value="Completed">Completed</SelectItem>
                              <SelectItem value="On Hold">On Hold</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category" className="text-xs font-mono text-gray-400">
                            CATEGORY
                          </Label>
                          <Select
                            value={editedTask.category}
                            onValueChange={(value) => handleInputChange("category", value)}
                          >
                            <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-600">
                              <SelectItem value="Film">Film</SelectItem>
                              <SelectItem value="Edit">Edit</SelectItem>
                              <SelectItem value="YouTube">YouTube</SelectItem>
                              <SelectItem value="Business">Business</SelectItem>
                              <SelectItem value="Web Blog">Web Blog</SelectItem>
                              <SelectItem value="Personal">Personal</SelectItem>
                              <SelectItem value="Maintenance">Maintenance</SelectItem>
                              <SelectItem value="Security">Security</SelectItem>
                              <SelectItem value="Intel">Intel</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dueDate" className="text-xs font-mono text-gray-400">
                          DUE DATE
                        </Label>
                        <Input
                          id="dueDate"
                          type="date"
                          value={editedTask.dueDate || ""}
                          onChange={(e) => handleInputChange("dueDate", e.target.value)}
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-xs font-mono text-gray-400">
                          DESCRIPTION
                        </Label>
                        <Textarea
                          id="description"
                          value={editedTask.description}
                          onChange={(e) => handleInputChange("description", e.target.value)}
                          rows={4}
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="checklist" className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add checklist item..."
                          value={newChecklistItem}
                          onChange={(e) => setNewChecklistItem(e.target.value)}
                          className="bg-gray-800 border-gray-600 text-white"
                          onKeyPress={(e) => e.key === "Enter" && addChecklistItem()}
                        />
                        <Button onClick={addChecklistItem} size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="space-y-2">
                        {editedTask.checklist.map((item) => (
                          <div key={item.id} className="flex items-center gap-2 p-2 bg-gray-800 rounded">
                            <Checkbox checked={item.completed} onCheckedChange={() => toggleChecklistItem(item.id)} />
                            <span className={`flex-1 ${item.completed ? "line-through text-gray-500" : "text-white"}`}>
                              {item.text}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeChecklistItem(item.id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="attachments" className="space-y-4">
                      <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                        <input
                          type="file"
                          multiple
                          onChange={handleFileUpload}
                          className="hidden"
                          id="file-upload"
                          accept="image/*,application/pdf,.doc,.docx,.txt"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-400">Click to upload files or drag and drop</p>
                          <p className="text-xs text-gray-500 mt-1">Images, PDFs, Documents</p>
                        </label>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {editedTask.attachments.map((attachment) => (
                          <div key={attachment.id} className="bg-gray-800 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                {attachment.type === "image" ? (
                                  <ImageIcon className="w-4 h-4 text-blue-400" />
                                ) : (
                                  <Paperclip className="w-4 h-4 text-gray-400" />
                                )}
                                <span className="text-sm text-white truncate">{attachment.name}</span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeAttachment(attachment.id)}
                                className="text-red-400 hover:text-red-300"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                            {attachment.type === "image" && (
                              <img
                                src={attachment.url || "/placeholder.svg"}
                                alt={attachment.name}
                                className="w-full h-20 object-cover rounded"
                              />
                            )}
                            <p className="text-xs text-gray-500 mt-1">{(attachment.size / 1024).toFixed(1)} KB</p>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="links" className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Link title"
                          value={newLink.title}
                          onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                        <Input
                          placeholder="URL"
                          value={newLink.url}
                          onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                        <Input
                          placeholder="Description (optional)"
                          value={newLink.description}
                          onChange={(e) => setNewLink({ ...newLink, description: e.target.value })}
                          className="bg-gray-800 border-gray-600 text-white col-span-2"
                        />
                        <Button onClick={addLink} size="sm" className="bg-blue-600 hover:bg-blue-700 col-span-2">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Link
                        </Button>
                      </div>

                      <div className="space-y-2">
                        {editedTask.links.map((link) => (
                          <div key={link.id} className="flex items-center gap-2 p-3 bg-gray-800 rounded">
                            <LinkIcon className="w-4 h-4 text-blue-400" />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-white font-medium">{link.title}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => window.open(link.url, "_blank")}
                                  className="text-blue-400 hover:text-blue-300"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                </Button>
                              </div>
                              {link.description && <p className="text-xs text-gray-400">{link.description}</p>}
                              <p className="text-xs text-gray-500">{link.url}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeLink(link.id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="social" className="space-y-4">
                      <div className="grid grid-cols-3 gap-2">
                        <Select
                          value={newSocialAccount.platform}
                          onValueChange={(value) => setNewSocialAccount({ ...newSocialAccount, platform: value })}
                        >
                          <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                            <SelectValue placeholder="Platform" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-600">
                            <SelectItem value="twitter">Twitter</SelectItem>
                            <SelectItem value="instagram">Instagram</SelectItem>
                            <SelectItem value="facebook">Facebook</SelectItem>
                            <SelectItem value="linkedin">LinkedIn</SelectItem>
                            <SelectItem value="youtube">YouTube</SelectItem>
                            <SelectItem value="tiktok">TikTok</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          placeholder="Username"
                          value={newSocialAccount.username}
                          onChange={(e) => setNewSocialAccount({ ...newSocialAccount, username: e.target.value })}
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                        <Button onClick={addSocialAccount} size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="space-y-2">
                        {editedTask.socialAccounts.map((social) => (
                          <div key={social.id} className="flex items-center gap-2 p-3 bg-gray-800 rounded">
                            {getSocialIcon(social.platform)}
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-white font-medium">@{social.username}</span>
                                <Badge className="text-xs bg-blue-500/20 text-blue-400">{social.platform}</Badge>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => window.open(social.url, "_blank")}
                                  className="text-blue-400 hover:text-blue-300"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeSocialAccount(social.id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="comments" className="space-y-4">
                      <div className="flex gap-2">
                        <Textarea
                          placeholder="Add a comment..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="bg-gray-800 border-gray-600 text-white"
                          rows={3}
                        />
                        <Button onClick={addComment} size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="space-y-3">
                        {editedTask.comments.map((comment) => (
                          <div key={comment.id} className="bg-gray-800 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-blue-400">{comment.author}</span>
                              <span className="text-xs text-gray-500">
                                {new Date(comment.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-300">{comment.text}</p>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                ) : (
                  // View Mode
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{selectedTask.title}</h3>
                      <div className="flex items-center gap-4">
                        <Badge className={`${getCategoryColor(selectedTask.category)}`}>{selectedTask.category}</Badge>
                        <Badge className={`${getPriorityColor(selectedTask.priority)}`}>{selectedTask.priority}</Badge>
                        <Badge className={`${getStatusColor(selectedTask.status)}`}>{selectedTask.status}</Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-400">
                        <User className="w-4 h-4" />
                        <span>Assigned: {selectedTask.assignee || "Unassigned"}</span>
                      </div>
                      {selectedTask.dueDate && (
                        <div className="flex items-center gap-2 text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span>Due: {new Date(selectedTask.dueDate).toLocaleDateString()}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>Created: {new Date(selectedTask.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Target className="w-4 h-4" />
                        <span>Status: {selectedTask.status}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-white">{getStatusProgress(selectedTask.status)}%</span>
                      </div>
                      <Progress value={getStatusProgress(selectedTask.status)} className="h-2" />
                    </div>

                    <div>
                      <h4 className="font-medium text-white mb-2">Description</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">{selectedTask.description}</p>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-4 gap-4 text-center">
                      <div className="bg-gray-800 rounded-lg p-3">
                        <CheckSquare className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                        <div className="text-xs text-gray-400">Checklist</div>
                        <div className="text-sm text-white">
                          {selectedTask.checklist?.filter((item) => item.completed).length || 0}/
                          {selectedTask.checklist?.length || 0}
                        </div>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-3">
                        <Paperclip className="w-5 h-5 text-green-400 mx-auto mb-1" />
                        <div className="text-xs text-gray-400">Files</div>
                        <div className="text-sm text-white">{selectedTask.attachments?.length || 0}</div>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-3">
                        <LinkIcon className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                        <div className="text-xs text-gray-400">Links</div>
                        <div className="text-sm text-white">{selectedTask.links?.length || 0}</div>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-3">
                        <MessageSquare className="w-5 h-5 text-orange-400 mx-auto mb-1" />
                        <div className="text-xs text-gray-400">Comments</div>
                        <div className="text-sm text-white">{selectedTask.comments?.length || 0}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                      <div className="flex items-center gap-2">
                        {trackedTasks.some((t) => t.id === selectedTask.id) ? (
                          <Button
                            onClick={() => onToggleTracking(selectedTask.id)}
                            variant="outline"
                            size="sm"
                            className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                          >
                            <EyeOff className="w-4 h-4 mr-2" />
                            Untrack Task
                          </Button>
                        ) : (
                          <Button
                            onClick={() => onToggleTracking(selectedTask.id)}
                            variant="outline"
                            size="sm"
                            className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Track Task
                          </Button>
                        )}
                      </div>
                      <Button
                        onClick={() => setIsDialogOpen(false)}
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800"
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
