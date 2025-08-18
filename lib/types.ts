export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  assignee: string;
  category: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  coverImage?: string | null; // Assuming coverImage is optional
  labels?: { id: string; name: string; color: string }[]; // Array of label objects
  checklist?: { id: string; text: string; completed: boolean; createdAt: string }[]; // Array of checklist item objects
  attachments?: { id: string; name: string; url: string; type: 'image' | 'document'; size: number; uploadedAt: string }[]; // Array of attachment objects
  links?: { id: string; title: string; url: string; description?: string; createdAt: string }[]; // Array of link objects
  socialAccounts?: { id: string; platform: string; username: string; url: string; createdAt: string }[]; // Array of social account objects
  comments?: { id: string; text: string; author: string; createdAt: string }[]; // Array of comment objects
  location?: string | null; // Add the location field here
  missionID?: string; // Assuming missionID is also part of the task
  // Add any other fields that are part of your task
}

// Define types for nested objects if they are not already
export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

export interface Link {
  id: string;
  title: string;
  url: string;
  description?: string;
  createdAt: string;
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
