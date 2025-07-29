export interface MissionData {
  assets: Asset[]
  systemStatus: SystemStatus
  activities: Activity[]
  metrics: OperationalMetric[]
  threats: Threat[]
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

export class MissionWebSocket {
  private ws: WebSocket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 1000
  private listeners: Map<string, Function[]> = new Map()

  constructor(private url: string) {}

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.url)

        this.ws.onopen = () => {
          console.log("Mission Control WebSocket connected")
          this.reconnectAttempts = 0
          this.emit("connection", { status: "CONNECTED" })
          resolve()
        }

        this.ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data)
            this.emit(data.type, data.payload)
          } catch (error) {
            console.error("Failed to parse WebSocket message:", error)
          }
        }

        this.ws.onclose = () => {
          console.log("Mission Control WebSocket disconnected")
          this.emit("connection", { status: "DISCONNECTED" })
          this.handleReconnect()
        }

        this.ws.onerror = (error) => {
          console.error("WebSocket error:", error)
          this.emit("connection", { status: "ERROR" })
          reject(error)
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`)

      setTimeout(() => {
        this.connect().catch(() => {
          // Reconnection failed, will try again
        })
      }, this.reconnectDelay * this.reconnectAttempts)
    }
  }

  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }
    this.listeners.get(event)!.push(callback)
  }

  off(event: string, callback: Function) {
    const eventListeners = this.listeners.get(event)
    if (eventListeners) {
      const index = eventListeners.indexOf(callback)
      if (index > -1) {
        eventListeners.splice(index, 1)
      }
    }
  }

  private emit(event: string, data: any) {
    const eventListeners = this.listeners.get(event)
    if (eventListeners) {
      eventListeners.forEach((callback) => callback(data))
    }
  }

  send(message: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message))
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }

  getConnectionState(): string {
    if (!this.ws) return "DISCONNECTED"

    switch (this.ws.readyState) {
      case WebSocket.CONNECTING:
        return "CONNECTING"
      case WebSocket.OPEN:
        return "CONNECTED"
      case WebSocket.CLOSING:
        return "DISCONNECTING"
      case WebSocket.CLOSED:
        return "DISCONNECTED"
      default:
        return "UNKNOWN"
    }
  }
}
