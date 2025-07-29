"use client"

import { useMissionData } from "@/hooks/use-mission-data"

export function TacticalTable() {
  const { missionData } = useMissionData()
  const { assets } = missionData

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "text-tactical-green"
      case "STANDBY":
        return "text-tactical-amber"
      case "OFFLINE":
        return "text-tactical-red"
      default:
        return "text-muted-foreground"
    }
  }

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case "STRONG":
        return "text-tactical-green"
      case "MEDIUM":
        return "text-tactical-amber"
      case "WEAK":
        return "text-tactical-amber"
      case "NONE":
        return "text-tactical-red"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="overflow-auto max-h-64">
      <table className="tactical-table">
        <thead>
          <tr>
            <th>ASSET ID</th>
            <th>STATUS</th>
            <th>LOCATION</th>
            <th>SIGNAL</th>
            <th>LAST UPDATE</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.id}>
              <td className="font-mono">{asset.id}</td>
              <td className={getStatusColor(asset.status)}>{asset.status}</td>
              <td>{asset.location}</td>
              <td className={getSignalColor(asset.signal)}>{asset.signal}</td>
              <td className="text-muted-foreground">{new Date(asset.lastUpdate).toLocaleTimeString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {assets.length === 0 && (
        <div className="p-4 text-center text-muted-foreground text-xs font-mono">NO ASSETS DETECTED</div>
      )}
    </div>
  )
}
