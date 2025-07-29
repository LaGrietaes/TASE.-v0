"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Wifi, WifiOff, Terminal, Send } from "lucide-react"
import { useMissionData } from "@/hooks/use-mission-data"

const mockEvents = [
  "SYSTEM INITIALIZATION COMPLETE",
  "ESTABLISHING SECURE CONNECTIONS...",
  "ASSET TRACKING ONLINE",
  "THREAT DETECTION ACTIVE",
  "COMMUNICATION CHANNELS OPEN",
  "MISSION PARAMETERS LOADED",
]

export function CommandLog() {
  const [commandInput, setCommandInput] = useState("")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const { connectionStatus, executeCommand, missionData } = useMissionData()

  // Add recent activities to command log
  useEffect(() => {
    const recentActivities = missionData.activities
      .slice(0, 5)
      .map((activity) => `[${new Date(activity.timestamp).toLocaleTimeString()}] ${activity.event}`)
    setCommandHistory((prev) => {
      const combined = [...recentActivities, ...prev.slice(0, 10)]
      return Array.from(new Set(combined)).slice(0, 15)
    })
  }, [missionData.activities])

  const handleCommandSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!commandInput.trim()) return

    const timestamp = new Date().toLocaleTimeString()
    const commandEntry = `[${timestamp}] > ${commandInput}`

    setCommandHistory((prev) => [commandEntry, ...prev.slice(0, 14)])

    try {
      await executeCommand(commandInput)
      const successEntry = `[${timestamp}] COMMAND EXECUTED SUCCESSFULLY`
      setCommandHistory((prev) => [successEntry, ...prev.slice(0, 14)])
    } catch (error) {
      const errorEntry = `[${timestamp}] COMMAND FAILED: ${error}`
      setCommandHistory((prev) => [errorEntry, ...prev.slice(0, 14)])
    }

    setCommandInput("")
  }

  return (
    <footer className="border-t border-border bg-card p-2">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Terminal className="h-3 w-3 text-tactical-red" />
          <span className="text-xs font-mono uppercase tracking-wider">COMMAND LOG</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {connectionStatus === "CONNECTED" ? (
              <Wifi className="h-3 w-3 text-tactical-green" />
            ) : (
              <WifiOff className="h-3 w-3 text-tactical-red" />
            )}
            <span
              className={`text-xs font-mono uppercase ${
                connectionStatus === "CONNECTED" ? "text-tactical-green" : "text-tactical-red"
              }`}
            >
              {connectionStatus}
            </span>
          </div>

          <Button className="tactical-button h-5 px-2 py-0 text-xs" onClick={() => setCommandHistory([])}>
            CLEAR
          </Button>
        </div>
      </div>

      <div className="bg-secondary border border-border p-2 h-16 overflow-auto mb-2">
        <div className="space-y-1">
          {commandHistory.map((entry, index) => (
            <div key={index} className="text-xs font-mono text-tactical-green">
              {entry}
            </div>
          ))}
          {commandHistory.length === 0 && (
            <div className="text-xs font-mono text-muted-foreground">{">"} AWAITING COMMANDS...</div>
          )}
        </div>
      </div>

      <form onSubmit={handleCommandSubmit} className="flex gap-2">
        <Input
          value={commandInput}
          onChange={(e) => setCommandInput(e.target.value)}
          placeholder="Enter command..."
          className="tactical-button h-6 text-xs flex-1 bg-secondary border-border"
          disabled={connectionStatus !== "CONNECTED"}
        />
        <Button
          type="submit"
          className="tactical-button h-6 px-2"
          disabled={connectionStatus !== "CONNECTED" || !commandInput.trim()}
        >
          <Send className="h-3 w-3" />
        </Button>
      </form>
    </footer>
  )
}
