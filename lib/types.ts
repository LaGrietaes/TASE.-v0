export interface Task {
  id: string
  title: string
  description: string
  status: "Pending" | "In Progress" | "Completed" | "On Hold"
  priority: "Low" | "Medium" | "High"
  category: string
  dueDate?: string
  assignee?: string
  tags: string[]
  createdAt: string
  updatedAt: string
  checklist: ChecklistItem[]
  attachments: Attachment[]
  links: Link[]
  socialAccounts: SocialAccount[]
  coverImage?: string
  labels: Label[]
  estimatedHours?: number
  actualHours?: number
  comments: Comment[]
}

export interface ChecklistItem {
  id: string
  text: string
  completed: boolean
  createdAt: string
}

export interface Attachment {
  id: string
  name: string
  url: string
  type: "image" | "document" | "video" | "other"
  size: number
  uploadedAt: string
}

export interface Link {
  id: string
  title: string
  url: string
  description?: string
  favicon?: string
  createdAt: string
}

export interface SocialAccount {
  id: string
  platform: "twitter" | "instagram" | "facebook" | "linkedin" | "youtube" | "tiktok" | "other"
  username: string
  url: string
  createdAt: string
}

export interface Label {
  id: string
  name: string
  color: string
}

export interface Comment {
  id: string
  text: string
  author: string
  createdAt: string
  updatedAt?: string
}

export interface Mission {
  id: string
  title: string
  description: string
  status: "Planning" | "Active" | "Completed" | "Cancelled"
  priority: "Low" | "Medium" | "High" | "Critical"
  startDate: string
  endDate?: string
  tasks: Task[]
  assignedTeam: string[]
  progress: number
}

export interface SystemStatus {
  id: string
  name: string
  status: "Online" | "Offline" | "Warning" | "Error"
  lastUpdate: string
  metrics?: {
    cpu?: number
    memory?: number
    disk?: number
    network?: number
  }
}

export interface Alert {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "error" | "success"
  timestamp: string
  acknowledged: boolean
  source: string
}

export interface User {
  id: string
  name: string
  email: string
  role: "Admin" | "Operator" | "Viewer"
  avatar?: string
  lastActive: string
  permissions: string[]
}
