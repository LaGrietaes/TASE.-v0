export interface MissionData {
  assets: Asset[]
  systemStatus: SystemStatus
  activities: Activity[]
  metrics: OperationalMetric[]
  threats: Threat[]
  todos: Todo[]
  communications: Communication[]
  overrides: Override[]
  diagnostics: Diagnostic[]
  systems: SystemModule[]
  signals: Signal[]
}

export interface Asset {
  id: string
  status: "ACTIVE" | "STANDBY" | "OFFLINE"
  location: string
  signal: "STRONG" | "MEDIUM" | "WEAK" | "NONE"
  coordinates: { lat: number; lng: number }
  lastUpdate: string
}

export interface SystemStatus {
  overall: "OPERATIONAL" | "DEGRADED" | "OFFLINE"
  connection: "SECURE" | "UNSECURE" | "DISCONNECTED"
  uptime: number
  activeAssets: number
  alerts: number
  threats: number
}

export interface Activity {
  id: string
  timestamp: string
  event: string
  level: "INFO" | "SUCCESS" | "WARNING" | "ERROR" | "CRITICAL"
  source: string
}

export interface OperationalMetric {
  timestamp: string
  value: number
  metric: string
}

export interface Threat {
  id: string
  level: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
  location: string
  description: string
  timestamp: string
}

export interface Todo {
  id: string
  title: string
  description: string
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"
  assignee: string
  dueDate: string
  createdAt: string
  category: "MISSION" | "MAINTENANCE" | "SECURITY" | "INTEL"
}

export interface Communication {
  id: string
  timestamp: string
  from: string
  to: string
  channel: string
  message: string
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT"
  status: "SENT" | "RECEIVED" | "ACKNOWLEDGED" | "FAILED"
  encrypted: boolean
}

export interface Override {
  id: string
  system: string
  parameter: string
  originalValue: string
  overrideValue: string
  reason: string
  authorizedBy: string
  timestamp: string
  status: "ACTIVE" | "EXPIRED" | "REVOKED"
  expiresAt: string
}

export interface Diagnostic {
  id: string
  system: string
  component: string
  status: "HEALTHY" | "WARNING" | "CRITICAL" | "OFFLINE"
  lastCheck: string
  nextCheck: string
  details: string
  metrics: Record<string, number>
}

export interface SystemModule {
  id: string
  name: string
  status: "ONLINE" | "OFFLINE" | "MAINTENANCE" | "ERROR"
  version: string
  uptime: number
  cpu: number
  memory: number
  lastRestart: string
}

export interface Signal {
  id: string
  frequency: string
  strength: number
  source: string
  location: string
  classification: "FRIENDLY" | "HOSTILE" | "UNKNOWN" | "NEUTRAL"
  timestamp: string
  encrypted: boolean
}
