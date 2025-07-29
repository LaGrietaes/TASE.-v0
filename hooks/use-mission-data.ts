"use client"

import { useState, useEffect, useCallback } from "react"
import type { MissionWebSocket } from "@/lib/websocket"
import { MissionAPI, MockMissionAPI } from "@/lib/api"
import type { MissionData, Activity } from "@/lib/types"

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080/ws"
const USE_MOCK_DATA = process.env.NODE_ENV === "development"

export function useMissionData() {
  const [missionData, setMissionData] = useState<MissionData>({
    assets: [],
    systemStatus: {
      overall: "OFFLINE",
      connection: "DISCONNECTED",
      uptime: 0,
      activeAssets: 0,
      alerts: 0,
      threats: 0,
    },
    activities: [],
    metrics: [],
    threats: [],
    todos: [],
    communications: [],
    overrides: [],
    diagnostics: [],
    systems: [],
    signals: [],
  })

  const [connectionStatus, setConnectionStatus] = useState<"CONNECTED" | "DISCONNECTED" | "CONNECTING">("DISCONNECTED")
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [error, setError] = useState<string | null>(null)

  const [api] = useState(() => (USE_MOCK_DATA ? new MockMissionAPI() : MissionAPI.getInstance()))
  const [ws, setWs] = useState<MissionWebSocket | null>(null)

  // Initialize WebSocket connection
  useEffect(() => {
    // Commenting out WebSocket for UI development
    /*
    if (!USE_MOCK_DATA) {
      const websocket = new MissionWebSocket(WS_URL)
      setWs(websocket)

      websocket.on("connection", (data: { status: string }) => {
        setConnectionStatus(data.status as any)
      })

      websocket.on("asset_update", (assets: Asset[]) => {
        setMissionData((prev) => ({ ...prev, assets }))
        setLastUpdate(new Date())
      })

      websocket.on("system_status", (systemStatus: SystemStatus) => {
        setMissionData((prev) => ({ ...prev, systemStatus }))
        setLastUpdate(new Date())
      })

      websocket.on("new_activity", (activity: Activity) => {
        setMissionData((prev) => ({
          ...prev,
          activities: [activity, ...prev.activities.slice(0, 49)],
        }))
        setLastUpdate(new Date())
      })

      websocket.on("metrics_update", (metrics: OperationalMetric[]) => {
        setMissionData((prev) => ({ ...prev, metrics }))
        setLastUpdate(new Date())
      })

      websocket.connect().catch((error) => {
        console.error("Failed to connect to WebSocket:", error)
        setError("Failed to establish real-time connection")
      })

      return () => {
        websocket.disconnect()
      }
    }
    */
  }, [])

  // Fetch initial data and set up polling for mock data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null)
        const [
          assets,
          systemStatus,
          activities,
          metrics,
          threats,
          todos,
          communications,
          overrides,
          diagnostics,
          systems,
          signals,
        ] = await Promise.all([
          api.getAssets(),
          api.getSystemStatus(),
          api.getActivities(20),
          api.getMetrics("24h"),
          api.getThreats(),
          api.getTodos(),
          api.getCommunications(),
          api.getOverrides(),
          api.getDiagnostics(),
          api.getSystems(),
          api.getSignals(),
        ])

        setMissionData((prev) => ({
          ...prev,
          assets,
          systemStatus,
          activities,
          metrics,
          threats,
          todos,
          communications,
          overrides,
          diagnostics,
          systems,
          signals,
        }))

        setLastUpdate(new Date())

        if (USE_MOCK_DATA) {
          setConnectionStatus("CONNECTED")
        }
      } catch (error) {
        console.error("Failed to fetch mission data:", error)
        setError("Failed to fetch mission data")
        setConnectionStatus("DISCONNECTED")
      }
    }

    fetchData()

    // Set up polling for mock data
    if (USE_MOCK_DATA) {
      const interval = setInterval(fetchData, 5000) // Update every 5 seconds
      return () => clearInterval(interval)
    }
  }, [api])

  const executeCommand = useCallback(
    async (command: string, parameters: Record<string, any> = {}) => {
      try {
        const result = await api.executeCommand(command, parameters)

        // Add command execution to activity log
        const activity: Omit<Activity, "id" | "timestamp"> = {
          event: `COMMAND EXECUTED: ${command}`,
          level: "INFO",
          source: "OPERATOR",
        }

        await api.createActivity(activity)
        return result
      } catch (error) {
        console.error("Command execution failed:", error)
        throw error
      }
    },
    [api],
  )

  const acknowledgeAlert = useCallback(
    async (alertId: string) => {
      try {
        await api.acknowledgeAlert(alertId)

        // Add acknowledgment to activity log
        const activity: Omit<Activity, "id" | "timestamp"> = {
          event: `ALERT ACKNOWLEDGED: ${alertId}`,
          level: "SUCCESS",
          source: "OPERATOR",
        }

        await api.createActivity(activity)
      } catch (error) {
        console.error("Failed to acknowledge alert:", error)
        throw error
      }
    },
    [api],
  )

  const refreshData = useCallback(async () => {
    try {
      const [assets, systemStatus, activities] = await Promise.all([
        api.getAssets(),
        api.getSystemStatus(),
        api.getActivities(20),
      ])

      setMissionData((prev) => ({
        ...prev,
        assets,
        systemStatus,
        activities,
      }))

      setLastUpdate(new Date())
    } catch (error) {
      console.error("Failed to refresh data:", error)
      setError("Failed to refresh data")
    }
  }, [api])

  return {
    missionData,
    connectionStatus,
    lastUpdate,
    error,
    executeCommand,
    acknowledgeAlert,
    refreshData,
    isConnected: connectionStatus === "CONNECTED",
  }
}
