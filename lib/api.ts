import type {
  Asset,
  SystemStatus,
  Activity,
  OperationalMetric,
  Threat,
  Todo,
  Communication,
  Override,
  Diagnostic,
  SystemModule,
  Signal,
} from "./types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"

export class MissionAPI {
  private static instance: MissionAPI
  private baseUrl: string

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  static getInstance(): MissionAPI {
    if (!MissionAPI.instance) {
      MissionAPI.instance = new MissionAPI()
    }
    return MissionAPI.instance
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.getAuthToken()}`,
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  private getAuthToken(): string {
    return typeof window !== "undefined" ? localStorage.getItem("mission_auth_token") || "demo-token" : "demo-token"
  }

  // Asset Management
  async getAssets(): Promise<Asset[]> {
    return this.request<Asset[]>("/assets")
  }

  async getSystemStatus(): Promise<SystemStatus> {
    return this.request<SystemStatus>("/system/status")
  }

  async getActivities(limit = 50): Promise<Activity[]> {
    return this.request<Activity[]>(`/activities?limit=${limit}`)
  }

  async createActivity(activity: Omit<Activity, "id" | "timestamp">): Promise<Activity> {
    return this.request<Activity>("/activities", {
      method: "POST",
      body: JSON.stringify(activity),
    })
  }

  async getMetrics(timeRange = "24h"): Promise<OperationalMetric[]> {
    return this.request<OperationalMetric[]>(`/metrics?range=${timeRange}`)
  }

  async getThreats(): Promise<Threat[]> {
    return this.request<Threat[]>("/threats")
  }

  async getTodos(): Promise<Todo[]> {
    return this.request<Todo[]>("/todos")
  }

  async getCommunications(): Promise<Communication[]> {
    return this.request<Communication[]>("/communications")
  }

  async getOverrides(): Promise<Override[]> {
    return this.request<Override[]>("/overrides")
  }

  async getDiagnostics(): Promise<Diagnostic[]> {
    return this.request<Diagnostic[]>("/diagnostics")
  }

  async getSystems(): Promise<SystemModule[]> {
    return this.request<SystemModule[]>("/systems")
  }

  async getSignals(): Promise<Signal[]> {
    return this.request<Signal[]>("/signals")
  }

  async acknowledgeAlert(alertId: string): Promise<void> {
    await this.request(`/alerts/${alertId}/acknowledge`, {
      method: "POST",
    })
  }

  async executeCommand(command: string, parameters: Record<string, any> = {}): Promise<any> {
    return this.request("/commands/execute", {
      method: "POST",
      body: JSON.stringify({ command, parameters }),
    })
  }
}

// Mock data generator for development
export class MockMissionAPI {
  private mockAssets: Asset[] = [
    {
      id: "ALPHA-01",
      status: "ACTIVE",
      location: "SECTOR-7",
      signal: "STRONG",
      coordinates: { lat: 40.7128, lng: -74.006 },
      lastUpdate: new Date().toISOString(),
    },
    {
      id: "BRAVO-02",
      status: "STANDBY",
      location: "SECTOR-3",
      signal: "WEAK",
      coordinates: { lat: 40.7589, lng: -73.9851 },
      lastUpdate: new Date().toISOString(),
    },
    {
      id: "CHARLIE-03",
      status: "ACTIVE",
      location: "SECTOR-1",
      signal: "STRONG",
      coordinates: { lat: 40.7505, lng: -73.9934 },
      lastUpdate: new Date().toISOString(),
    },
    {
      id: "DELTA-04",
      status: "OFFLINE",
      location: "SECTOR-9",
      signal: "NONE",
      coordinates: { lat: 40.7282, lng: -73.7949 },
      lastUpdate: new Date().toISOString(),
    },
    {
      id: "ECHO-05",
      status: "ACTIVE",
      location: "SECTOR-5",
      signal: "MEDIUM",
      coordinates: { lat: 40.6892, lng: -74.0445 },
      lastUpdate: new Date().toISOString(),
    },
  ]

  private mockActivities: Activity[] = []
  private mockTodos: Todo[] = []
  private mockCommunications: Communication[] = []
  private mockOverrides: Override[] = []
  private mockDiagnostics: Diagnostic[] = []
  private mockSystems: SystemModule[] = []
  private mockSignals: Signal[] = []

  constructor() {
    this.generateMockData()
  }

  private generateMockData() {
    this.generateMockActivities()
    this.generateMockTodos()
    this.generateMockCommunications()
    this.generateMockOverrides()
    this.generateMockDiagnostics()
    this.generateMockSystems()
    this.generateMockSignals()
  }

  private generateMockActivities() {
    const events = [
      "ASSET POSITION UPDATE",
      "COMM LINK ESTABLISHED",
      "SIGNAL DEGRADATION DETECTED",
      "SYSTEM DIAGNOSTIC COMPLETE",
      "THREAT DETECTED",
      "ASSET STATUS CHANGE",
      "COMMUNICATION RESTORED",
      "PERIMETER BREACH ALERT",
    ]

    const levels: Activity["level"][] = ["INFO", "SUCCESS", "WARNING", "ERROR", "CRITICAL"]
    const sources = ["SYSTEM", "OPERATOR", "AUTO", "SENSOR"]

    this.mockActivities = Array.from({ length: 15 }, (_, i) => ({
      id: `activity-${Date.now()}-${i}`,
      timestamp: new Date(Date.now() - i * 60000).toISOString(),
      event: `${events[Math.floor(Math.random() * events.length)]} ${this.mockAssets[Math.floor(Math.random() * this.mockAssets.length)].id}`,
      level: levels[Math.floor(Math.random() * levels.length)],
      source: sources[Math.floor(Math.random() * sources.length)],
    }))
  }

  private generateMockTodos() {
    const titles = [
      "CALIBRATE SENSOR ARRAY",
      "UPDATE ENCRYPTION KEYS",
      "REVIEW THREAT ASSESSMENT",
      "MAINTENANCE CHECK ALPHA-01",
      "ANALYZE SIGNAL PATTERNS",
      "BACKUP MISSION DATA",
      "COORDINATE WITH BRAVO TEAM",
      "VERIFY ASSET POSITIONS",
    ]

    const priorities: Todo["priority"][] = ["LOW", "MEDIUM", "HIGH", "CRITICAL"]
    const statuses: Todo["status"][] = ["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"]
    const categories: Todo["category"][] = ["MISSION", "MAINTENANCE", "SECURITY", "INTEL"]
    const assignees = ["OPERATOR-1", "OPERATOR-2", "TECH-LEAD", "COMMANDER"]

    this.mockTodos = Array.from({ length: 12 }, (_, i) => ({
      id: `todo-${Date.now()}-${i}`,
      title: titles[Math.floor(Math.random() * titles.length)],
      description: "Detailed task description and requirements for mission completion.",
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      assignee: assignees[Math.floor(Math.random() * assignees.length)],
      dueDate: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
      category: categories[Math.floor(Math.random() * categories.length)],
    }))
  }

  private generateMockCommunications() {
    const channels = ["ALPHA", "BRAVO", "CHARLIE", "COMMAND", "EMERGENCY"]
    const operators = ["OP-001", "OP-002", "OP-003", "COMMAND", "FIELD-01"]
    const messages = [
      "POSITION CONFIRMED, PROCEEDING TO WAYPOINT",
      "SIGNAL INTERFERENCE DETECTED",
      "REQUESTING BACKUP AT SECTOR-7",
      "MISSION PARAMETERS UPDATED",
      "THREAT NEUTRALIZED, ALL CLEAR",
      "EQUIPMENT MALFUNCTION REPORTED",
    ]

    this.mockCommunications = Array.from({ length: 20 }, (_, i) => ({
      id: `comm-${Date.now()}-${i}`,
      timestamp: new Date(Date.now() - i * 30000).toISOString(),
      from: operators[Math.floor(Math.random() * operators.length)],
      to: operators[Math.floor(Math.random() * operators.length)],
      channel: channels[Math.floor(Math.random() * channels.length)],
      message: messages[Math.floor(Math.random() * messages.length)],
      priority: ["LOW", "MEDIUM", "HIGH", "URGENT"][Math.floor(Math.random() * 4)] as Communication["priority"],
      status: ["SENT", "RECEIVED", "ACKNOWLEDGED"][Math.floor(Math.random() * 3)] as Communication["status"],
      encrypted: Math.random() > 0.3,
    }))
  }

  private generateMockOverrides() {
    const systems = ["RADAR", "COMMS", "NAVIGATION", "WEAPONS", "SENSORS"]
    const parameters = ["FREQUENCY", "POWER_LEVEL", "SENSITIVITY", "RANGE", "TIMEOUT"]

    this.mockOverrides = Array.from({ length: 5 }, (_, i) => ({
      id: `override-${Date.now()}-${i}`,
      system: systems[Math.floor(Math.random() * systems.length)],
      parameter: parameters[Math.floor(Math.random() * parameters.length)],
      originalValue: "AUTO",
      overrideValue: "MANUAL_HIGH",
      reason: "MISSION CRITICAL OPERATION",
      authorizedBy: "COMMANDER",
      timestamp: new Date(Date.now() - i * 3600000).toISOString(),
      status: ["ACTIVE", "EXPIRED", "REVOKED"][Math.floor(Math.random() * 3)] as Override["status"],
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    }))
  }

  private generateMockDiagnostics() {
    const systems = ["RADAR", "COMMS", "NAVIGATION", "WEAPONS", "SENSORS", "POWER", "COOLING"]
    const components = ["PRIMARY", "SECONDARY", "BACKUP", "CONTROLLER", "ANTENNA"]

    this.mockDiagnostics = Array.from({ length: 10 }, (_, i) => ({
      id: `diag-${Date.now()}-${i}`,
      system: systems[Math.floor(Math.random() * systems.length)],
      component: components[Math.floor(Math.random() * components.length)],
      status: ["HEALTHY", "WARNING", "CRITICAL", "OFFLINE"][Math.floor(Math.random() * 4)] as Diagnostic["status"],
      lastCheck: new Date(Date.now() - Math.random() * 3600000).toISOString(),
      nextCheck: new Date(Date.now() + Math.random() * 3600000).toISOString(),
      details: "System operating within normal parameters",
      metrics: {
        temperature: 45 + Math.random() * 20,
        voltage: 12 + Math.random() * 2,
        current: 2 + Math.random() * 3,
      },
    }))
  }

  private generateMockSystems() {
    const systemNames = ["RADAR_CTRL", "COMM_ARRAY", "NAV_SYSTEM", "SENSOR_NET", "POWER_MGMT", "DATA_PROC"]

    this.mockSystems = Array.from({ length: 6 }, (_, i) => ({
      id: `sys-${Date.now()}-${i}`,
      name: systemNames[i],
      status: ["ONLINE", "OFFLINE", "MAINTENANCE", "ERROR"][Math.floor(Math.random() * 4)] as SystemModule["status"],
      version: `v${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`,
      uptime: Math.random() * 100,
      cpu: Math.random() * 100,
      memory: Math.random() * 100,
      lastRestart: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    }))
  }

  private generateMockSignals() {
    const frequencies = ["2.4GHz", "5.8GHz", "915MHz", "433MHz", "868MHz"]
    const sources = ["SATELLITE", "GROUND", "AIRCRAFT", "NAVAL", "UNKNOWN"]
    const locations = ["SECTOR-1", "SECTOR-3", "SECTOR-7", "SECTOR-9", "PERIMETER"]

    this.mockSignals = Array.from({ length: 15 }, (_, i) => ({
      id: `signal-${Date.now()}-${i}`,
      frequency: frequencies[Math.floor(Math.random() * frequencies.length)],
      strength: Math.random() * 100,
      source: sources[Math.floor(Math.random() * sources.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      classification: ["FRIENDLY", "HOSTILE", "UNKNOWN", "NEUTRAL"][
        Math.floor(Math.random() * 4)
      ] as Signal["classification"],
      timestamp: new Date(Date.now() - i * 60000).toISOString(),
      encrypted: Math.random() > 0.4,
    }))
  }

  async getAssets(): Promise<Asset[]> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    this.mockAssets.forEach((asset) => {
      if (Math.random() < 0.1) {
        const statuses: Asset["status"][] = ["ACTIVE", "STANDBY", "OFFLINE"]
        const signals: Asset["signal"][] = ["STRONG", "MEDIUM", "WEAK", "NONE"]
        asset.status = statuses[Math.floor(Math.random() * statuses.length)]
        asset.signal = signals[Math.floor(Math.random() * signals.length)]
        asset.lastUpdate = new Date().toISOString()
      }
    })
    return [...this.mockAssets]
  }

  async getSystemStatus(): Promise<SystemStatus> {
    await new Promise((resolve) => setTimeout(resolve, 50))
    const activeAssets = this.mockAssets.filter((a) => a.status === "ACTIVE").length
    const alerts = Math.floor(Math.random() * 5)
    const threats = Math.floor(Math.random() * 3)

    return {
      overall: activeAssets > 2 ? "OPERATIONAL" : "DEGRADED",
      connection: "SECURE",
      uptime: 99.7 + Math.random() * 0.3,
      activeAssets,
      alerts,
      threats,
    }
  }

  async getActivities(limit = 50): Promise<Activity[]> {
    await new Promise((resolve) => setTimeout(resolve, 75))
    if (Math.random() < 0.3) {
      const events = ["ASSET POSITION UPDATE", "COMM LINK ESTABLISHED", "SIGNAL DEGRADATION DETECTED"]
      const levels: Activity["level"][] = ["INFO", "SUCCESS", "WARNING", "ERROR"]
      const sources = ["SYSTEM", "OPERATOR", "AUTO", "SENSOR"]

      const newActivity: Activity = {
        id: `activity-${Date.now()}-${Math.random()}`,
        timestamp: new Date().toISOString(),
        event: `${events[Math.floor(Math.random() * events.length)]} ${this.mockAssets[Math.floor(Math.random() * this.mockAssets.length)].id}`,
        level: levels[Math.floor(Math.random() * levels.length)],
        source: sources[Math.floor(Math.random() * sources.length)],
      }

      this.mockActivities.unshift(newActivity)
      this.mockActivities = this.mockActivities.slice(0, 50)
    }
    return this.mockActivities.slice(0, Math.min(limit, this.mockActivities.length))
  }

  async getMetrics(timeRange = "24h"): Promise<OperationalMetric[]> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    const now = Date.now()
    const points = 24

    return Array.from({ length: points }, (_, i) => ({
      timestamp: new Date(now - (points - i) * 3600000).toISOString(),
      value: 70 + Math.random() * 30,
      metric: "operational_efficiency",
    }))
  }

  async getThreats(): Promise<Threat[]> {
    await new Promise((resolve) => setTimeout(resolve, 50))
    const threats: Threat[] = []
    const threatCount = Math.floor(Math.random() * 3)

    for (let i = 0; i < threatCount; i++) {
      threats.push({
        id: `threat-${Date.now()}-${i}`,
        level: ["LOW", "MEDIUM", "HIGH", "CRITICAL"][Math.floor(Math.random() * 4)] as Threat["level"],
        location: `SECTOR-${Math.floor(Math.random() * 10) + 1}`,
        description: "UNIDENTIFIED SIGNAL DETECTED",
        timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
      })
    }
    return threats
  }

  async getTodos(): Promise<Todo[]> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return [...this.mockTodos]
  }

  async getCommunications(): Promise<Communication[]> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return [...this.mockCommunications]
  }

  async getOverrides(): Promise<Override[]> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return [...this.mockOverrides]
  }

  async getDiagnostics(): Promise<Diagnostic[]> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return [...this.mockDiagnostics]
  }

  async getSystems(): Promise<SystemModule[]> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return [...this.mockSystems]
  }

  async getSignals(): Promise<Signal[]> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return [...this.mockSignals]
  }

  async createActivity(activity: Omit<Activity, "id" | "timestamp">): Promise<Activity> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    const newActivity: Activity = {
      ...activity,
      id: `activity-${Date.now()}-${Math.random()}`,
      timestamp: new Date().toISOString(),
    }
    this.mockActivities.unshift(newActivity)
    this.mockActivities = this.mockActivities.slice(0, 50)
    return newActivity
  }

  async acknowledgeAlert(alertId: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    console.log(`Alert ${alertId} acknowledged`)
  }

  async executeCommand(command: string, parameters: Record<string, any> = {}): Promise<any> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    console.log(`Executing command: ${command}`, parameters)
    return {
      success: true,
      message: `Command "${command}" executed successfully`,
      timestamp: new Date().toISOString(),
    }
  }
}
