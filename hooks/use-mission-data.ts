"use client"

import { useState, useEffect } from "react"
import type { Task, Mission, SystemStatus, Alert } from "@/lib/types"

// Mock data with enhanced task structure
const mockTasks: Task[] = [
  {
    id: "1",
    title: "Complete video editing for client project",
    description:
      "Edit the promotional video for the new product launch. Include color correction, audio mixing, and final rendering.",
    status: "In Progress",
    priority: "High",
    category: "Edit",
    dueDate: "2024-01-20",
    assignee: "John Doe",
    tags: ["video", "client", "urgent"],
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-17T14:30:00Z",
    checklist: [
      { id: "c1", text: "Import raw footage", completed: true, createdAt: "2024-01-15T10:00:00Z" },
      { id: "c2", text: "Color correction", completed: true, createdAt: "2024-01-15T10:00:00Z" },
      { id: "c3", text: "Audio mixing", completed: false, createdAt: "2024-01-15T10:00:00Z" },
      { id: "c4", text: "Final rendering", completed: false, createdAt: "2024-01-15T10:00:00Z" },
      { id: "c5", text: "Client review", completed: false, createdAt: "2024-01-15T10:00:00Z" },
    ],
    attachments: [
      {
        id: "a1",
        name: "raw_footage.mp4",
        url: "/files/raw_footage.mp4",
        type: "video",
        size: 1024000,
        uploadedAt: "2024-01-15T10:00:00Z",
      },
      {
        id: "a2",
        name: "audio_track.wav",
        url: "/files/audio_track.wav",
        type: "other",
        size: 512000,
        uploadedAt: "2024-01-15T10:00:00Z",
      },
    ],
    links: [
      {
        id: "l1",
        title: "Client Brief",
        url: "https://example.com/brief",
        description: "Project requirements and specifications",
        createdAt: "2024-01-15T10:00:00Z",
      },
      {
        id: "l2",
        title: "Reference Video",
        url: "https://youtube.com/watch?v=example",
        description: "Style reference for the edit",
        createdAt: "2024-01-15T10:00:00Z",
      },
    ],
    socialAccounts: [
      {
        id: "s1",
        platform: "youtube",
        username: "clientchannel",
        url: "https://youtube.com/@clientchannel",
        createdAt: "2024-01-15T10:00:00Z",
      },
    ],
    coverImage: "/images/video-project.jpg",
    labels: [
      { id: "label1", name: "Client Work", color: "#3b82f6" },
      { id: "label2", name: "Urgent", color: "#ef4444" },
    ],
    estimatedHours: 8,
    actualHours: 5,
    comments: [
      {
        id: "comment1",
        text: "Started working on color correction",
        author: "John Doe",
        createdAt: "2024-01-16T09:00:00Z",
      },
      {
        id: "comment2",
        text: "Client requested changes to the intro",
        author: "Jane Smith",
        createdAt: "2024-01-17T11:00:00Z",
      },
    ],
  },
  {
    id: "2",
    title: "Upload YouTube video with SEO optimization",
    description:
      "Upload the completed video to YouTube with proper title, description, tags, and thumbnail for maximum reach.",
    status: "Pending",
    priority: "Medium",
    category: "YouTube",
    dueDate: "2024-01-22",
    assignee: "Jane Smith",
    tags: ["youtube", "seo", "upload"],
    createdAt: "2024-01-16T09:00:00Z",
    updatedAt: "2024-01-16T09:00:00Z",
    checklist: [
      { id: "c6", text: "Create custom thumbnail", completed: false, createdAt: "2024-01-16T09:00:00Z" },
      { id: "c7", text: "Write SEO-optimized title", completed: false, createdAt: "2024-01-16T09:00:00Z" },
      { id: "c8", text: "Write description with keywords", completed: false, createdAt: "2024-01-16T09:00:00Z" },
      { id: "c9", text: "Add relevant tags", completed: false, createdAt: "2024-01-16T09:00:00Z" },
      { id: "c10", text: "Schedule upload", completed: false, createdAt: "2024-01-16T09:00:00Z" },
    ],
    attachments: [
      {
        id: "a3",
        name: "thumbnail_design.psd",
        url: "/files/thumbnail_design.psd",
        type: "image",
        size: 256000,
        uploadedAt: "2024-01-16T09:00:00Z",
      },
    ],
    links: [
      {
        id: "l3",
        title: "YouTube Analytics",
        url: "https://studio.youtube.com/analytics",
        description: "Channel performance data",
        createdAt: "2024-01-16T09:00:00Z",
      },
      {
        id: "l4",
        title: "Keyword Research Tool",
        url: "https://keywordtool.io",
        description: "SEO keyword research",
        createdAt: "2024-01-16T09:00:00Z",
      },
    ],
    socialAccounts: [
      {
        id: "s2",
        platform: "youtube",
        username: "mychannel",
        url: "https://youtube.com/@mychannel",
        createdAt: "2024-01-16T09:00:00Z",
      },
      {
        id: "s3",
        platform: "twitter",
        username: "myhandle",
        url: "https://twitter.com/myhandle",
        createdAt: "2024-01-16T09:00:00Z",
      },
    ],
    labels: [
      { id: "label3", name: "Content", color: "#10b981" },
      { id: "label4", name: "SEO", color: "#8b5cf6" },
    ],
    estimatedHours: 3,
    comments: [],
  },
  {
    id: "3",
    title: "Film behind-the-scenes content",
    description:
      "Capture behind-the-scenes footage for the upcoming documentary project. Focus on interviews and production process.",
    status: "Completed",
    priority: "Low",
    category: "Film",
    dueDate: "2024-01-18",
    assignee: "Mike Johnson",
    tags: ["filming", "documentary", "bts"],
    createdAt: "2024-01-14T08:00:00Z",
    updatedAt: "2024-01-18T16:00:00Z",
    checklist: [
      { id: "c11", text: "Set up camera equipment", completed: true, createdAt: "2024-01-14T08:00:00Z" },
      { id: "c12", text: "Interview director", completed: true, createdAt: "2024-01-14T08:00:00Z" },
      { id: "c13", text: "Film production process", completed: true, createdAt: "2024-01-14T08:00:00Z" },
      { id: "c14", text: "Backup footage", completed: true, createdAt: "2024-01-14T08:00:00Z" },
    ],
    attachments: [
      {
        id: "a4",
        name: "bts_footage_01.mp4",
        url: "/files/bts_footage_01.mp4",
        type: "video",
        size: 2048000,
        uploadedAt: "2024-01-18T16:00:00Z",
      },
      {
        id: "a5",
        name: "interview_audio.wav",
        url: "/files/interview_audio.wav",
        type: "other",
        size: 768000,
        uploadedAt: "2024-01-18T16:00:00Z",
      },
    ],
    links: [
      {
        id: "l5",
        title: "Production Schedule",
        url: "https://docs.google.com/spreadsheets/d/example",
        description: "Filming schedule and locations",
        createdAt: "2024-01-14T08:00:00Z",
      },
    ],
    socialAccounts: [
      {
        id: "s4",
        platform: "instagram",
        username: "filmproject",
        url: "https://instagram.com/filmproject",
        createdAt: "2024-01-14T08:00:00Z",
      },
    ],
    labels: [
      { id: "label5", name: "Production", color: "#f59e0b" },
      { id: "label6", name: "Completed", color: "#10b981" },
    ],
    estimatedHours: 6,
    actualHours: 7,
    comments: [
      {
        id: "comment3",
        text: "Great footage captured today!",
        author: "Mike Johnson",
        createdAt: "2024-01-18T16:00:00Z",
      },
    ],
  },
]

const mockMissions: Mission[] = [
  {
    id: "mission-1",
    title: "Q1 Content Production",
    description: "Complete all video content for Q1 marketing campaign",
    status: "Active",
    priority: "High",
    startDate: "2024-01-01",
    endDate: "2024-03-31",
    tasks: mockTasks,
    assignedTeam: ["John Doe", "Jane Smith", "Mike Johnson"],
    progress: 65,
  },
]

const mockSystemStatus: SystemStatus[] = [
  {
    id: "sys-1",
    name: "Video Rendering Server",
    status: "Online",
    lastUpdate: "2024-01-17T15:30:00Z",
    metrics: { cpu: 45, memory: 67, disk: 23, network: 12 },
  },
  {
    id: "sys-2",
    name: "File Storage",
    status: "Online",
    lastUpdate: "2024-01-17T15:29:00Z",
    metrics: { cpu: 12, memory: 34, disk: 78, network: 5 },
  },
]

const mockAlerts: Alert[] = [
  {
    id: "alert-1",
    title: "High CPU Usage",
    message: "Rendering server CPU usage above 80%",
    type: "warning",
    timestamp: "2024-01-17T15:25:00Z",
    acknowledged: false,
    source: "Video Rendering Server",
  },
]

export function useMissionData() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [missions, setMissions] = useState<Mission[]>(mockMissions)
  const [systemStatus, setSystemStatus] = useState<SystemStatus[]>(mockSystemStatus)
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts)
  const [trackedTasks, setTrackedTasks] = useState<Task[]>([])

  console.log("🔄 useMissionData hook:", {
    tasksCount: tasks.length,
    trackedTasksCount: trackedTasks.length,
    trackedTaskIds: trackedTasks.map((t) => t.id),
  })

  const trackTask = (taskId: string) => {
    console.log("📌 Tracking task:", taskId)
    const task = tasks.find((t) => t.id === taskId)
    if (task && !trackedTasks.find((t) => t.id === taskId)) {
      setTrackedTasks((prev) => [...prev, task])
    }
  }

  const untrackTask = (taskId: string) => {
    console.log("📌 Untracking task:", taskId)
    setTrackedTasks((prev) => prev.filter((t) => t.id !== taskId))
  }

  const isTaskTracked = (taskId: string) => {
    return trackedTasks.some((t) => t.id === taskId)
  }

  const updateTaskStatus = (taskId: string, status: Task["status"]) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, status, updatedAt: new Date().toISOString() } : task)),
    )
    // Also update in tracked tasks
    setTrackedTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, status, updatedAt: new Date().toISOString() } : task)),
    )
  }

  const addTask = (newTask: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    const task: Task = {
      ...newTask,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setTasks((prev) => [...prev, task])
    return task
  }

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId))
    setTrackedTasks((prev) => prev.filter((t) => t.id !== taskId))
  }

  const acknowledgeAlert = (alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, acknowledged: true } : alert)))
  }

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update system metrics
      setSystemStatus((prev) =>
        prev.map((system) => ({
          ...system,
          lastUpdate: new Date().toISOString(),
          metrics: system.metrics
            ? {
                cpu: Math.max(0, Math.min(100, system.metrics.cpu + (Math.random() - 0.5) * 10)),
                memory: Math.max(0, Math.min(100, system.metrics.memory + (Math.random() - 0.5) * 5)),
                disk: Math.max(0, Math.min(100, system.metrics.disk + (Math.random() - 0.5) * 2)),
                network: Math.max(0, Math.min(100, system.metrics.network + (Math.random() - 0.5) * 15)),
              }
            : undefined,
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return {
    tasks,
    missions,
    systemStatus,
    alerts,
    trackedTasks,
    trackTask,
    untrackTask,
    isTaskTracked,
    updateTaskStatus,
    addTask,
    deleteTask,
    acknowledgeAlert,
  }
}
