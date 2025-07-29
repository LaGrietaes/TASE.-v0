"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Server, Cpu, Network, Bot, Database, Shield, Volume2 } from "lucide-react"

export function SystemSettingsPanel() {
  const [aiEnabled, setAiEnabled] = useState(true)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [apiEndpoint, setApiEndpoint] = useState("http://localhost:8080/api")
  const [wsEndpoint, setWsEndpoint] = useState("ws://localhost:8080/ws")
  const [aiModel, setAiModel] = useState("gpt-4o")
  const [refreshInterval, setRefreshInterval] = useState("5")

  return (
    <div className="space-y-4">
      {/* System Overview */}
      <Card className="border-border bg-card">
        <CardHeader className="border-b border-border pb-2">
          <CardTitle className="text-xs font-mono uppercase tracking-wider flex items-center gap-2">
            <Settings className="h-3 w-3" />
            SYSTEM CONFIGURATION
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">VERSION</div>
              <div className="text-lg font-mono text-tactical-green">v2.1.4</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">UPTIME</div>
              <div className="text-lg font-mono text-tactical-blue">72:14:33</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">CPU USAGE</div>
              <div className="text-lg font-mono text-tactical-amber">23.4%</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">MEMORY</div>
              <div className="text-lg font-mono text-tactical-amber">1.2GB</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* AI Configuration */}
        <Card className="border-border bg-card">
          <CardHeader className="border-b border-border pb-2">
            <CardTitle className="text-xs font-mono uppercase tracking-wider flex items-center gap-2">
              <Bot className="h-3 w-3" />
              AI ASSISTANT CONTROLS
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-xs font-mono uppercase tracking-wider">AI ASSISTANT</div>
                <div className="text-xs text-muted-foreground">Enable TASE AI assistant</div>
              </div>
              <Switch checked={aiEnabled} onCheckedChange={setAiEnabled} />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">AI MODEL</label>
              <Select value={aiModel} onValueChange={setAiModel}>
                <SelectTrigger className="tactical-button h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4o">GPT-4O</SelectItem>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="claude-3">Claude-3</SelectItem>
                  <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-xs font-mono uppercase tracking-wider">VOICE INTERFACE</div>
                <div className="text-xs text-muted-foreground">Enable voice commands</div>
              </div>
              <Switch checked={voiceEnabled} onCheckedChange={setVoiceEnabled} />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">API KEY</label>
              <Input
                type="password"
                className="tactical-button h-8 text-xs"
                placeholder="sk-..."
                defaultValue="sk-proj-***************************"
              />
            </div>

            <div className="flex gap-2">
              <Button className="tactical-button h-8 px-4 flex-1">TEST CONNECTION</Button>
              <Button className="tactical-button h-8 px-4 flex-1">RESET CONFIG</Button>
            </div>
          </CardContent>
        </Card>

        {/* Network Configuration */}
        <Card className="border-border bg-card">
          <CardHeader className="border-b border-border pb-2">
            <CardTitle className="text-xs font-mono uppercase tracking-wider flex items-center gap-2">
              <Network className="h-3 w-3" />
              NETWORK CONFIGURATION
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">API ENDPOINT</label>
              <Input
                value={apiEndpoint}
                onChange={(e) => setApiEndpoint(e.target.value)}
                className="tactical-button h-8 text-xs"
                placeholder="http://localhost:8080/api"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                WEBSOCKET ENDPOINT
              </label>
              <Input
                value={wsEndpoint}
                onChange={(e) => setWsEndpoint(e.target.value)}
                className="tactical-button h-8 text-xs"
                placeholder="ws://localhost:8080/ws"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-xs font-mono uppercase tracking-wider">AUTO REFRESH</div>
                <div className="text-xs text-muted-foreground">Automatic data refresh</div>
              </div>
              <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                REFRESH INTERVAL (SEC)
              </label>
              <Select value={refreshInterval} onValueChange={setRefreshInterval}>
                <SelectTrigger className="tactical-button h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Second</SelectItem>
                  <SelectItem value="5">5 Seconds</SelectItem>
                  <SelectItem value="10">10 Seconds</SelectItem>
                  <SelectItem value="30">30 Seconds</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button className="tactical-button h-8 px-4 flex-1">TEST CONNECTION</Button>
              <Button className="tactical-button h-8 px-4 flex-1">SAVE CONFIG</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Server Status */}
      <Card className="border-border bg-card">
        <CardHeader className="border-b border-border pb-2">
          <CardTitle className="text-xs font-mono uppercase tracking-wider flex items-center gap-2">
            <Server className="h-3 w-3" />
            SERVER STATUS & CONTROLS
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-border p-3 space-y-2">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-tactical-green" />
                <div className="text-xs font-mono font-semibold">DATABASE</div>
              </div>
              <div className="text-xs text-tactical-green">CONNECTED</div>
              <div className="text-xs text-muted-foreground">PostgreSQL 15.2</div>
              <div className="text-xs text-muted-foreground">localhost:5432</div>
              <Button className="tactical-button h-6 px-2 text-xs w-full">MANAGE</Button>
            </div>

            <div className="border border-border p-3 space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-tactical-amber" />
                <div className="text-xs font-mono font-semibold">SECURITY</div>
              </div>
              <div className="text-xs text-tactical-amber">SSL ENABLED</div>
              <div className="text-xs text-muted-foreground">TLS 1.3</div>
              <div className="text-xs text-muted-foreground">Cert expires: 2025-12-31</div>
              <Button className="tactical-button h-6 px-2 text-xs w-full">CONFIGURE</Button>
            </div>

            <div className="border border-border p-3 space-y-2">
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-tactical-blue" />
                <div className="text-xs font-mono font-semibold">AUDIO</div>
              </div>
              <div className="text-xs text-tactical-blue">ACTIVE</div>
              <div className="text-xs text-muted-foreground">Voice synthesis ready</div>
              <div className="text-xs text-muted-foreground">Mic input: ON</div>
              <Button className="tactical-button h-6 px-2 text-xs w-full">SETTINGS</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-border bg-card">
        <CardHeader className="border-b border-border pb-2">
          <CardTitle className="text-xs font-mono uppercase tracking-wider">SYSTEM ACTIONS</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="tactical-button h-10 flex flex-col items-center justify-center gap-1">
              <Server className="h-4 w-4" />
              <span className="text-xs">RESTART SERVER</span>
            </Button>
            <Button className="tactical-button h-10 flex flex-col items-center justify-center gap-1">
              <Database className="h-4 w-4" />
              <span className="text-xs">BACKUP DATA</span>
            </Button>
            <Button className="tactical-button h-10 flex flex-col items-center justify-center gap-1">
              <Shield className="h-4 w-4" />
              <span className="text-xs">SECURITY SCAN</span>
            </Button>
            <Button className="tactical-button h-10 flex flex-col items-center justify-center gap-1">
              <Cpu className="h-4 w-4" />
              <span className="text-xs">SYSTEM HEALTH</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
