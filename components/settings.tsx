"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from "next-themes"
import { SettingsIcon, Moon, Sun, Monitor, Bell, Shield, Database } from "lucide-react"

export function Settings() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your application preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger>
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">
                    <div className="flex items-center gap-2">
                      <Sun className="h-4 w-4" />
                      Light
                    </div>
                  </SelectItem>
                  <SelectItem value="dark">
                    <div className="flex items-center gap-2">
                      <Moon className="h-4 w-4" />
                      Dark
                    </div>
                  </SelectItem>
                  <SelectItem value="system">
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4" />
                      System
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="compact-mode">Compact mode</Label>
              <Switch id="compact-mode" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Email notifications</Label>
              <Switch id="email-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="push-notifications">Push notifications</Label>
              <Switch id="push-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="task-reminders">Task reminders</Label>
              <Switch id="task-reminders" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="ai-suggestions">AI suggestions</Label>
              <Switch id="ai-suggestions" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="two-factor">Two-factor authentication</Label>
              <Switch id="two-factor" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="data-sharing">Data sharing</Label>
              <Switch id="data-sharing" defaultChecked />
            </div>
            <div className="space-y-2">
              <Label>Session timeout</Label>
              <Select defaultValue="30">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full bg-transparent">
              Export my data
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              Clear cache
            </Button>
            <Button variant="destructive" className="w-full">
              Delete account
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button className="bg-accent hover:bg-accent/90">Save Changes</Button>
      </div>
    </div>
  )
}
