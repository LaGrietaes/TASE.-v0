"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  X,
  Eye,
  EyeOff,
  Clock,
  AlertCircle,
  CheckCircle2,
  Paperclip,
  LinkIcon,
  MessageSquare,
  Calendar,
  User,
  ImageIcon,
  FileText,
  Video,
  Download,
  ExternalLink,
  Twitter,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Hash,
  Grip,
  Film,
  Edit,
  Globe,
  Briefcase,
  UserCircle,
  Wrench,
  Shield,
  Zap,
} from "lucide-react"
import type { Task } from "@/lib/types"

interface TaskTrackerProps {
  isOpen: boolean
  onClose: () => void
  trackedTasks: Task[]
  onToggleTracking: (taskId: string) => void
}

export function TaskTracker({ isOpen, onClose, trackedTasks, onToggleTracking }: TaskTrackerProps) {
  const [expandedTask, setExpandedTask] = useState<string | null>(null)
  const [draggedTask, setDraggedTask] = useState<string | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const [tasks, setTasks] = useState<Task[]>(trackedTasks)
  const [isDragging, setIsDragging] = useState(false)

  console.log("📊 TaskTracker render:", {
    isOpen,
    trackedTasksCount: trackedTasks.length,
    trackedTasks: trackedTasks.map((t) => ({ id: t.id, title: t.title, category: t.category })),
    localTasksCount: tasks.length,
  })

  // Update local tasks when trackedTasks prop changes
  useEffect(() => {
    console.log("🔄 Updating local tasks from props:", trackedTasks.length)
    setTasks(trackedTasks)
  }, [trackedTasks])

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "film":
        return <Film className="h-4 w-4" />
      case "edit":
        return <Edit className="h-4 w-4" />
      case "youtube":
        return <Youtube className="h-4 w-4" />
      case "business":
        return <Briefcase className="h-4 w-4" />
      case "web blog":
        return <Globe className="h-4 w-4" />
      case "personal":
        return <UserCircle className="h-4 w-4" />
      case "maintenance":
        return <Wrench className="h-4 w-4" />
      case "security":
        return <Shield className="h-4 w-4" />
      case "intel":
        return <Zap className="h-4 w-4" />
      default:
        return <Paperclip className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "film":
        return "text-purple-400 bg-purple-500/20 border-purple-500/30"
      case "edit":
        return "text-blue-400 bg-blue-500/20 border-blue-500/30"
      case "youtube":
        return "text-red-400 bg-red-500/20 border-red-500/30"
      case "business":
        return "text-amber-400 bg-amber-500/20 border-amber-500/30"
      case "web blog":
        return "text-cyan-400 bg-cyan-500/20 border-cyan-500/30"
      case "personal":
        return "text-pink-400 bg-pink-500/20 border-pink-500/30"
      case "maintenance":
        return "text-green-400 bg-green-500/20 border-green-500/30"
      case "security":
        return "text-red-400 bg-red-500/20 border-red-500/30"
      case "intel":
        return "text-purple-400 bg-purple-500/20 border-purple-500/30"
      default:
        return "text-gray-400 bg-gray-500/20 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-400" />
      case "in progress":
        return <Clock className="h-4 w-4 text-blue-400" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-400" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getProgressValue = (task: Task) => {
    if (task.status.toLowerCase() === "completed") return 100
    if (!task.checklist || task.checklist.length === 0) {
      switch (task.status.toLowerCase()) {
        case "in progress":
          return 60
        case "pending":
          return 20
        default:
          return 0
      }
    }
    const completedItems = task.checklist.filter((item) => item.completed).length
    return Math.round((completedItems / task.checklist.length) * 100)
  }

  const getAttachmentIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "document":
        return <FileText className="h-4 w-4" />
      default:
        return <Paperclip className="h-4 w-4" />
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

  const toggleTaskExpansion = (taskId: string) => {
    setExpandedTask(expandedTask === taskId ? null : taskId)
  }

  const handleChecklistToggle = (taskId: string, checklistItemId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              checklist: task.checklist?.map((item) =>
                item.id === checklistItemId ? { ...item, completed: !item.completed } : item,
              ),
            }
          : task,
      ),
    )
  }

  // Enhanced Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    console.log("🎯 Drag start:", { taskId })
    setDraggedTask(taskId)
    setIsDragging(true)
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/plain", taskId)

    // Create a custom drag image
    const dragElement = document.createElement("div")
    dragElement.innerHTML = `
      <div style="
        background: rgba(31, 41, 55, 0.95);
        border: 1px solid rgba(75, 85, 99, 0.5);
        border-radius: 8px;
        padding: 12px;
        color: white;
        font-size: 14px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
        transform: rotate(3deg);
        max-width: 300px;
      ">
        📋 Moving task...
      </div>
    `
    dragElement.style.position = "absolute"
    dragElement.style.top = "-1000px"
    document.body.appendChild(dragElement)
    e.dataTransfer.setDragImage(dragElement, 0, 0)

    // Clean up drag image after a short delay
    setTimeout(() => {
      document.body.removeChild(dragElement)
    }, 0)
  }

  const handleDragEnd = () => {
    console.log("🎯 Drag end")
    setDraggedTask(null)
    setDragOverIndex(null)
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"

    // Only update if the target index actually changed and we're not dragging the same task
    if (dragOverIndex !== index && draggedTask !== tasks[index]?.id) {
      setDragOverIndex(index)
    }
  }

  const handleDragEnter = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    // Only update if different from current and not dragging the same task
    if (dragOverIndex !== index && draggedTask !== tasks[index]?.id) {
      setDragOverIndex(index)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    // Only clear if we're actually leaving the drop zone
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX
    const y = e.clientY

    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setDragOverIndex(null)
    }
  }

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault()

    const draggedTaskId = e.dataTransfer.getData("text/plain")
    console.log("🎯 Drop:", { draggedTaskId, targetIndex })

    if (!draggedTaskId) return

    const draggedIndex = tasks.findIndex((task) => task.id === draggedTaskId)
    if (draggedIndex === -1) return

    // Check if we're dropping before the first item
    const rect = e.currentTarget.getBoundingClientRect()
    const y = e.clientY
    const isFirstItem = targetIndex === 0
    const isTopHalf = y < rect.top + rect.height / 2

    let finalTargetIndex = targetIndex
    if (isFirstItem && isTopHalf) {
      finalTargetIndex = 0
    } else {
      // Check if we're dropping after the last item
      const isLastItem = targetIndex === tasks.length - 1
      const isBottomHalf = y > rect.top + rect.height / 2

      if (isLastItem && isBottomHalf) {
        finalTargetIndex = tasks.length
      }
    }

    if (draggedIndex === finalTargetIndex) return

    console.log("✅ Reordering tasks:", { from: draggedIndex, to: finalTargetIndex })

    const newTasks = [...tasks]
    const [draggedTaskObj] = newTasks.splice(draggedIndex, 1)

    // Adjust target index if we removed an item before it
    const adjustedIndex = finalTargetIndex > draggedIndex ? finalTargetIndex - 1 : finalTargetIndex
    newTasks.splice(adjustedIndex, 0, draggedTaskObj)

    setTasks(newTasks)
    setDraggedTask(null)
    setDragOverIndex(null)
    setIsDragging(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-96 bg-gray-900/95 backdrop-blur-sm border-l border-gray-700/50 z-40">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
          <div className="flex items-center space-x-2">
            <Eye className="h-5 w-5 text-[#cd2027]" />
            <h2 className="text-lg font-semibold text-white">Task Tracker</h2>
            <Badge variant="secondary" className="bg-[#cd2027] text-white">
              {tasks.length}
            </Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1 p-4">
          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <EyeOff className="h-12 w-12 text-gray-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-400 mb-2">No Tracked Tasks</h3>
              <p className="text-sm text-gray-500">Click the eye icon on any task to start tracking it here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Simplified drop indicators */}
              {dragOverIndex === -1 && draggedTask && (
                <div className="h-0.5 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 mx-4 mb-2" />
              )}

              {tasks.map((task, index) => (
                <div key={task.id}>
                  <div
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnter={(e) => handleDragEnter(e, index)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, index)}
                    className={`relative bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden transition-all duration-200 ${
                      draggedTask === task.id ? "opacity-30 scale-95 transform rotate-1" : "hover:bg-gray-800/70"
                    } ${
                      dragOverIndex === index && draggedTask !== task.id
                        ? "border-blue-400 bg-blue-500/10 shadow-lg shadow-blue-500/20 scale-[1.02]"
                        : ""
                    }`}
                  >
                    {/* Drop indicator above */}
                    {dragOverIndex === index && draggedTask !== task.id && (
                      <>
                        <div className="absolute -top-1 left-4 right-4 h-0.5 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 z-10" />
                        <div className="absolute top-0 left-0 right-0 h-full bg-blue-500/5 pointer-events-none" />
                      </>
                    )}

                    {/* Task Header */}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start space-x-2 flex-1">
                          <div
                            draggable
                            onDragStart={(e) => handleDragStart(e, task.id)}
                            onDragEnd={handleDragEnd}
                            className={`p-1 rounded transition-all duration-200 ${
                              isDragging && draggedTask === task.id
                                ? "bg-blue-500/20 text-blue-400"
                                : "hover:bg-gray-700/50 text-gray-500 hover:text-gray-300"
                            }`}
                            style={{ cursor: isDragging ? "grabbing" : "grab" }}
                          >
                            <Grip className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              {getCategoryIcon(task.category)}
                              <Badge variant="outline" className={`text-xs ${getCategoryColor(task.category)}`}>
                                {task.category}
                              </Badge>
                              {task.labels &&
                                task.labels.map((label) => (
                                  <Badge
                                    key={label.id}
                                    variant="outline"
                                    className="text-xs"
                                    style={{
                                      backgroundColor: `${label.color}20`,
                                      borderColor: `${label.color}50`,
                                      color: label.color,
                                    }}
                                  >
                                    {label.name}
                                  </Badge>
                                ))}
                            </div>
                            <h3
                              className="text-sm font-medium text-white leading-tight cursor-pointer hover:text-blue-400"
                              onClick={() => toggleTaskExpansion(task.id)}
                            >
                              {task.title}
                            </h3>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onToggleTracking(task.id)}
                          className="text-gray-400 hover:text-white ml-2"
                        >
                          <EyeOff className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Task Meta Info */}
                      <div className="flex items-center justify-between text-xs mb-3">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(task.status)}
                          <span className="text-gray-400">{task.status}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              task.priority === "High"
                                ? "text-red-400 border-red-500/30"
                                : task.priority === "Medium"
                                  ? "text-yellow-400 border-yellow-500/30"
                                  : "text-green-400 border-green-500/30"
                            }`}
                          >
                            {task.priority}
                          </Badge>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-1 mb-3">
                        <div className="flex justify-between text-xs text-gray-400">
                          <span>Progress</span>
                          <span>{getProgressValue(task)}%</span>
                        </div>
                        <Progress value={getProgressValue(task)} className="h-2" />
                      </div>

                      {/* Quick Stats */}
                      <div className="flex items-center space-x-4 text-xs text-gray-400">
                        {task.dueDate && (
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                          </div>
                        )}
                        {task.assignee && (
                          <div className="flex items-center space-x-1">
                            <User className="h-3 w-3" />
                            <span>{task.assignee}</span>
                          </div>
                        )}
                        {task.checklist && task.checklist.length > 0 && (
                          <div className="flex items-center space-x-1">
                            <CheckCircle2 className="h-3 w-3" />
                            <span>
                              {task.checklist.filter((item) => item.completed).length}/{task.checklist.length}
                            </span>
                          </div>
                        )}
                        {task.attachments && task.attachments.length > 0 && (
                          <div className="flex items-center space-x-1">
                            <Paperclip className="h-3 w-3" />
                            <span>{task.attachments.length}</span>
                          </div>
                        )}
                        {task.comments && task.comments.length > 0 && (
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="h-3 w-3" />
                            <span>{task.comments.length}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {expandedTask === task.id && (
                      <div className="border-t border-gray-700/50">
                        <Tabs defaultValue="checklist" className="w-full">
                          <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
                            <TabsTrigger value="checklist" className="text-xs">
                              Checklist
                            </TabsTrigger>
                            <TabsTrigger value="attachments" className="text-xs">
                              Files
                            </TabsTrigger>
                            <TabsTrigger value="links" className="text-xs">
                              Links
                            </TabsTrigger>
                            <TabsTrigger value="social" className="text-xs">
                              Social
                            </TabsTrigger>
                          </TabsList>

                          <TabsContent value="checklist" className="p-4 space-y-2">
                            {!task.checklist || task.checklist.length === 0 ? (
                              <p className="text-xs text-gray-500 text-center py-4">No checklist items</p>
                            ) : (
                              task.checklist.map((item) => (
                                <div key={item.id} className="flex items-center space-x-2">
                                  <Checkbox
                                    checked={item.completed}
                                    onCheckedChange={() => handleChecklistToggle(task.id, item.id)}
                                    className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                                  />
                                  <span
                                    className={`text-xs flex-1 ${item.completed ? "line-through text-gray-500" : "text-gray-300"}`}
                                  >
                                    {item.text}
                                  </span>
                                </div>
                              ))
                            )}
                          </TabsContent>

                          <TabsContent value="attachments" className="p-4 space-y-2">
                            {!task.attachments || task.attachments.length === 0 ? (
                              <p className="text-xs text-gray-500 text-center py-4">No attachments</p>
                            ) : (
                              task.attachments.map((attachment) => (
                                <div
                                  key={attachment.id}
                                  className="flex items-center space-x-2 p-2 bg-gray-700/30 rounded"
                                >
                                  {getAttachmentIcon(attachment.type)}
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs text-gray-300 truncate">{attachment.name}</p>
                                    <p className="text-xs text-gray-500">{(attachment.size / 1024).toFixed(1)} KB</p>
                                  </div>
                                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                    <Download className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))
                            )}
                          </TabsContent>

                          <TabsContent value="links" className="p-4 space-y-2">
                            {!task.links || task.links.length === 0 ? (
                              <p className="text-xs text-gray-500 text-center py-4">No links</p>
                            ) : (
                              task.links.map((link) => (
                                <div key={link.id} className="flex items-center space-x-2 p-2 bg-gray-700/30 rounded">
                                  <LinkIcon className="h-4 w-4 text-blue-400" />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs text-gray-300 truncate">{link.title}</p>
                                    {link.description && (
                                      <p className="text-xs text-gray-500 truncate">{link.description}</p>
                                    )}
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0"
                                    onClick={() => window.open(link.url, "_blank")}
                                  >
                                    <ExternalLink className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))
                            )}
                          </TabsContent>

                          <TabsContent value="social" className="p-4 space-y-2">
                            {!task.socialAccounts || task.socialAccounts.length === 0 ? (
                              <p className="text-xs text-gray-500 text-center py-4">No social accounts</p>
                            ) : (
                              task.socialAccounts.map((social) => (
                                <div key={social.id} className="flex items-center space-x-2 p-2 bg-gray-700/30 rounded">
                                  {getSocialIcon(social.platform)}
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs text-gray-300 truncate">@{social.username}</p>
                                    <p className="text-xs text-gray-500 capitalize">{social.platform}</p>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0"
                                    onClick={() => window.open(social.url, "_blank")}
                                  >
                                    <ExternalLink className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))
                            )}
                          </TabsContent>
                        </Tabs>

                        {/* Description */}
                        {task.description && (
                          <div className="p-4 border-t border-gray-700/50">
                            <h4 className="text-xs font-medium text-gray-400 mb-2">Description</h4>
                            <p className="text-xs text-gray-300 leading-relaxed">{task.description}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Drop indicator after the last item */}
                  {index === tasks.length - 1 && dragOverIndex === tasks.length && draggedTask !== task.id && (
                    <div className="h-0.5 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 mx-4 mt-2" />
                  )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700/50">
          <div className="text-xs text-gray-400 text-center">
            {tasks.length > 0
              ? `Tracking ${tasks.length} task${tasks.length === 1 ? "" : "s"}`
              : "No tasks being tracked"}
          </div>
        </div>
      </div>
    </div>
  )
}
