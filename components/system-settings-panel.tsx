"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Volume2, Palette, Monitor } from "lucide-react"
import { useState } from "react"

interface SystemSettings {
  darkMode: boolean
  soundEnabled: boolean
  volume: number
  refreshRate: string
  theme: string
  notifications: boolean
  autoSave: boolean
}

export function SystemSettingsPanel() {
  const [settings, setSettings] = useState<SystemSettings>({
    darkMode: true,
    soundEnabled: true,
    volume: 75,
    refreshRate: "1000",
    theme: "military",
    notifications: true,
    autoSave: true,
  })

  const updateSetting = <K extends keyof SystemSettings>(key: K, value: SystemSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    console.log("Saving settings:", settings)
  }

  const handleReset = () => {
    setSettings({
      darkMode: true,
      soundEnabled: true,
      volume: 75,
      refreshRate: "1000",
      theme: "military",
      notifications: true,
      autoSave: true,
    })
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-mono">SYSTEM SETTINGS</h1>
          <p className="text-muted-foreground">Configure system preferences and behavior</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            Reset to Defaults
          </Button>
          <Button onClick={handleSave} className="bg-red-600 hover:bg-red-700">
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/50 border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-mono flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              DISPLAY SETTINGS
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode" className="text-sm font-mono">
                Dark Mode
              </Label>
              <Switch
                id="dark-mode"
                checked={settings.darkMode}
                onCheckedChange={(checked) => updateSetting("darkMode", checked)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-mono">Theme</Label>
              <Select value={settings.theme} onValueChange={(value) => updateSetting("theme", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="military">Military</SelectItem>
                  <SelectItem value="corporate">Corporate</SelectItem>
                  <SelectItem value="minimal">Minimal</SelectItem>
                  <SelectItem value="high-contrast">High Contrast</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-mono">Refresh Rate (ms)</Label>
              <Select value={settings.refreshRate} onValueChange={(value) => updateSetting("refreshRate", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="500">500ms (Fast)</SelectItem>
                  <SelectItem value="1000">1000ms (Normal)</SelectItem>
                  <SelectItem value="2000">2000ms (Slow)</SelectItem>
                  <SelectItem value="5000">5000ms (Very Slow)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-mono flex items-center gap-2">
              <Volume2 className="h-4 w-4" />
              AUDIO SETTINGS
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="sound-enabled" className="text-sm font-mono">
                Sound Effects
              </Label>
              <Switch
                id="sound-enabled"
                checked={settings.soundEnabled}
                onCheckedChange={(checked) => updateSetting("soundEnabled", checked)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-mono">Volume</Label>
                <span className="text-sm font-mono text-muted-foreground">{settings.volume}%</span>
              </div>
              <Slider
                value={[settings.volume]}
                onValueChange={(value) => updateSetting("volume", value[0])}
                max={100}
                step={5}
                className="w-full"
                disabled={!settings.soundEnabled}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-mono flex items-center gap-2">
              <Settings className="h-4 w-4" />
              SYSTEM BEHAVIOR
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications" className="text-sm font-mono">
                Notifications
              </Label>
              <Switch
                id="notifications"
                checked={settings.notifications}
                onCheckedChange={(checked) => updateSetting("notifications", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="auto-save" className="text-sm font-mono">
                Auto Save
              </Label>
              <Switch
                id="auto-save"
                checked={settings.autoSave}
                onCheckedChange={(checked) => updateSetting("autoSave", checked)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-mono flex items-center gap-2">
              <Palette className="h-4 w-4" />
              APPEARANCE
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-4 gap-2">
              <div className="h-8 bg-red-600 rounded cursor-pointer border-2 border-red-600" />
              <div className="h-8 bg-blue-600 rounded cursor-pointer border-2 border-transparent hover:border-blue-600" />
              <div className="h-8 bg-green-600 rounded cursor-pointer border-2 border-transparent hover:border-green-600" />
              <div className="h-8 bg-yellow-600 rounded cursor-pointer border-2 border-transparent hover:border-yellow-600" />
            </div>
            <p className="text-xs text-muted-foreground">Select accent color</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
