"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { AlertTriangle, Shield, Power, Lock, Unlock, Zap, Radio, Eye } from "lucide-react"

export function OverridesPanel() {
  const [overrides, setOverrides] = useState([
    {
      id: "LOCKDOWN",
      name: "FACILITY LOCKDOWN",
      description: "Secure all access points and restrict movement",
      active: false,
      critical: true,
      requiresAuth: true,
    },
    {
      id: "COMMS_BLACKOUT",
      name: "COMMUNICATIONS BLACKOUT",
      description: "Disable all external communications",
      active: false,
      critical: true,
      requiresAuth: true,
    },
    {
      id: "POWER_CONSERVATION",
      name: "POWER CONSERVATION MODE",
      description: "Reduce power consumption to essential systems only",
      active: true,
      critical: false,
      requiresAuth: false,
    },
    {
      id: "STEALTH_MODE",
      name: "STEALTH MODE",
      description: "Minimize electromagnetic signatures",
      active: false,
      critical: false,
      requiresAuth: true,
    },
    {
      id: "EMERGENCY_POWER",
      name: "EMERGENCY POWER",
      description: "Switch to backup power systems",
      active: false,
      critical: true,
      requiresAuth: true,
    },
    {
      id: "SURVEILLANCE_OVERRIDE",
      name: "SURVEILLANCE OVERRIDE",
      description: "Override privacy protocols for enhanced monitoring",
      active: false,
      critical: false,
      requiresAuth: true,
    },
  ])

  const toggleOverride = (id: string) => {
    setOverrides((prev) =>
      prev.map((override) => (override.id === id ? { ...override, active: !override.active } : override)),
    )
  }

  const getOverrideIcon = (id: string) => {
    switch (id) {
      case "LOCKDOWN":
        return Shield
      case "COMMS_BLACKOUT":
        return Radio
      case "POWER_CONSERVATION":
        return Power
      case "STEALTH_MODE":
        return Eye
      case "EMERGENCY_POWER":
        return Zap
      case "SURVEILLANCE_OVERRIDE":
        return Eye
      default:
        return AlertTriangle
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-mono text-green-400">SYSTEM OVERRIDES</h1>
        <Badge className="bg-red-400/20 text-red-400 border-red-400/50">
          {overrides.filter((o) => o.active).length} ACTIVE
        </Badge>
      </div>

      <div className="bg-red-400/10 border border-red-400/30 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <h3 className="font-mono font-bold text-red-400">WARNING</h3>
        </div>
        <p className="text-sm text-red-400/80">
          System overrides can significantly impact operational capabilities. Use with extreme caution and only when
          authorized.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {overrides.map((override) => {
          const OverrideIcon = getOverrideIcon(override.id)
          return (
            <Card
              key={override.id}
              className={`bg-slate-900/50 backdrop-blur ${override.active ? "border-red-400/50" : "border-green-400/30"}`}
            >
              <CardHeader>
                <CardTitle className="text-green-400 font-mono flex items-center gap-2">
                  <OverrideIcon className="w-5 h-5" />
                  {override.name}
                  <div className="ml-auto flex items-center gap-2">
                    {override.critical && (
                      <Badge className="bg-red-400/20 text-red-400 border-red-400/50 text-xs">CRITICAL</Badge>
                    )}
                    <Badge
                      className={`text-xs ${override.active ? "bg-red-400/20 text-red-400 border-red-400/50" : "bg-gray-400/20 text-gray-400 border-gray-400/50"}`}
                    >
                      {override.active ? "ACTIVE" : "INACTIVE"}
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-green-400/80">{override.description}</p>

                <div className="flex items-center justify-between pt-2 border-t border-green-400/20">
                  <div className="flex items-center gap-2">
                    {override.requiresAuth ? (
                      <Lock className="w-4 h-4 text-yellow-400" />
                    ) : (
                      <Unlock className="w-4 h-4 text-green-400" />
                    )}
                    <span className="text-xs text-green-400/70 font-mono">
                      {override.requiresAuth ? "REQUIRES AUTHORIZATION" : "NO AUTH REQUIRED"}
                    </span>
                  </div>

                  {override.requiresAuth && override.critical ? (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          className={`font-mono text-xs ${
                            override.active
                              ? "bg-red-400/20 text-red-400 border border-red-400/50 hover:bg-red-400/30"
                              : "bg-yellow-400/20 text-yellow-400 border border-yellow-400/50 hover:bg-yellow-400/30"
                          }`}
                        >
                          {override.active ? "DEACTIVATE" : "ACTIVATE"}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-slate-900 border-red-400/50">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-red-400 font-mono">
                            CRITICAL SYSTEM OVERRIDE
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-green-400/80">
                            You are about to {override.active ? "deactivate" : "activate"} a critical system override:
                            <strong className="text-green-400"> {override.name}</strong>
                            <br />
                            <br />
                            This action requires command authorization and may have significant operational impact.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-slate-800 text-green-400 border-green-400/50">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => toggleOverride(override.id)}
                            className="bg-red-400/20 text-red-400 border border-red-400/50 hover:bg-red-400/30"
                          >
                            Confirm Override
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  ) : (
                    <Switch
                      checked={override.active}
                      onCheckedChange={() => toggleOverride(override.id)}
                      className="data-[state=checked]:bg-red-400"
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="bg-slate-900/50 border-green-400/30 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-green-400 font-mono">OVERRIDE STATUS SUMMARY</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-slate-800/50 border border-green-400/20 rounded p-4">
              <div className="text-2xl font-bold text-green-400 font-mono">
                {overrides.filter((o) => o.active).length}
              </div>
              <div className="text-sm text-green-400/70">ACTIVE OVERRIDES</div>
            </div>
            <div className="bg-slate-800/50 border border-red-400/20 rounded p-4">
              <div className="text-2xl font-bold text-red-400 font-mono">
                {overrides.filter((o) => o.critical && o.active).length}
              </div>
              <div className="text-sm text-green-400/70">CRITICAL ACTIVE</div>
            </div>
            <div className="bg-slate-800/50 border border-yellow-400/20 rounded p-4">
              <div className="text-2xl font-bold text-yellow-400 font-mono">
                {overrides.filter((o) => o.requiresAuth).length}
              </div>
              <div className="text-sm text-green-400/70">REQUIRE AUTH</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
