"use client"

import { useState, useEffect } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  Activity,
  Radio,
  Shield,
  Eye,
  MessageSquare,
  AlertTriangle,
  Calendar,
  Cog,
  Mic,
  MicOff,
  Clock,
  VolumeX,
  Volume2,
  CheckCircle,
  AlertCircle,
  Zap,
  Brain,
  Ear,
  Play,
  Pause,
  Square,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const tacticalSections = [
  {
    title: "MISSION BOARD",
    icon: Calendar,
    id: "mission-board",
  },
  {
    title: "INTEL FEED",
    icon: Eye,
    id: "intel",
  },
  {
    title: "COMM LOG",
    icon: MessageSquare,
    id: "comm",
  },
  {
    title: "OVERRIDES",
    icon: Shield,
    id: "overrides",
  },
  {
    title: "DIAGNOSTICS",
    icon: AlertTriangle,
    id: "diagnostics",
  },
  {
    title: "SIGNALS",
    icon: Radio,
    id: "signals",
  },
  {
    title: "SETTINGS",
    icon: Cog,
    id: "settings",
  },
]

interface AppSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

type VoiceState =
  | "idle"
  | "wake_listening"
  | "wake_detected"
  | "listening"
  | "processing"
  | "recognized"
  | "responding"
  | "error"
type CommandType = "navigation" | "system" | "query" | "action" | "unknown"
type MissionTimerState = "running" | "paused" | "stopped"

const timeZones = [
  { code: "UTC", name: "UTC", offset: 0 },
  { code: "STG", name: "Santiago", offset: -3 },
  { code: "SFO", name: "San Francisco", offset: -8 },
  { code: "BCN", name: "Barcelona", offset: 1 },
]

export function AppSidebar({ activeTab, onTabChange }: AppSidebarProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [missionTime, setMissionTime] = useState(new Date("2024-01-15T00:00:00"))
  const [missionStartTime] = useState(new Date("2024-01-15T00:00:00"))
  const [missionElapsed, setMissionElapsed] = useState(0)
  const [missionTimerState, setMissionTimerState] = useState<MissionTimerState>("running")
  const [currentTimeZoneIndex, setCurrentTimeZoneIndex] = useState(0)
  const [isVoiceActive, setIsVoiceActive] = useState(false)
  const [isAudioMuted, setIsAudioMuted] = useState(false)
  const [userVoiceData, setUserVoiceData] = useState<number[]>(Array(60).fill(0))
  const [aiVoiceData, setAiVoiceData] = useState<number[]>(Array(60).fill(0))
  const [voiceState, setVoiceState] = useState<VoiceState>("idle")
  const [commandType, setCommandType] = useState<CommandType>("unknown")
  const [lastCommand, setLastCommand] = useState<string>("")
  const [confidence, setConfidence] = useState<number>(0)
  const [wakeWordConfidence, setWakeWordConfidence] = useState<number>(0)

  // Update clocks every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())

      // Update mission timer based on state
      if (missionTimerState === "running") {
        setMissionTime((prev) => new Date(prev.getTime() + 1000))
        setMissionElapsed((prev) => prev + 1000)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [missionTimerState])

  // Mission timer controls
  const handleMissionPlay = () => {
    if (missionTimerState === "stopped") {
      // Reset to start
      setMissionTime(new Date(missionStartTime))
      setMissionElapsed(0)
    }
    setMissionTimerState("running")
  }

  const handleMissionPause = () => {
    setMissionTimerState("paused")
  }

  const handleMissionStop = () => {
    setMissionTimerState("stopped")
    setMissionTime(new Date(missionStartTime))
    setMissionElapsed(0)
  }

  // Time zone navigation
  const navigateTimeZone = (direction: number) => {
    setCurrentTimeZoneIndex((prev) => {
      const newIndex = prev + direction
      if (newIndex < 0) return timeZones.length - 1
      if (newIndex >= timeZones.length) return 0
      return newIndex
    })
  }

  // Wake word detection and voice recognition workflow
  useEffect(() => {
    if (isVoiceActive) {
      const stateInterval = setInterval(() => {
        const random = Math.random()

        if (voiceState === "idle" || voiceState === "wake_listening") {
          // Always listening for wake word when voice is active
          setVoiceState("wake_listening")

          // Simulate wake word detection
          if (random > 0.85) {
            setVoiceState("wake_detected")
            setWakeWordConfidence(Math.random() * 20 + 80) // High confidence for wake word
            setLastCommand("TASE")
          }
        } else if (voiceState === "wake_detected" && random > 0.6) {
          setVoiceState("listening")
          setWakeWordConfidence(0)
          setConfidence(0)
        } else if (voiceState === "listening" && random > 0.7) {
          setVoiceState("processing")
          setConfidence(Math.random() * 50 + 30)
        } else if (voiceState === "processing" && random > 0.6) {
          // Simulate different command types
          const commands = [
            { text: "SHOW INTEL FEED", type: "navigation" as CommandType },
            { text: "SYSTEM STATUS", type: "query" as CommandType },
            { text: "EXECUTE OVERRIDE", type: "action" as CommandType },
            { text: "RESTART DIAGNOSTICS", type: "system" as CommandType },
            { text: "UNCLEAR AUDIO", type: "unknown" as CommandType },
          ]
          const command = commands[Math.floor(Math.random() * commands.length)]

          setLastCommand(command.text)
          setCommandType(command.type)
          setVoiceState(command.type === "unknown" ? "error" : "recognized")
          setConfidence(command.type === "unknown" ? Math.random() * 40 + 10 : Math.random() * 30 + 70)
        } else if (voiceState === "recognized" && random > 0.5) {
          setVoiceState("responding")
        } else if (voiceState === "responding" && random > 0.7) {
          setVoiceState("wake_listening") // Return to wake word listening
          setConfidence(0)
        } else if (voiceState === "error" && random > 0.8) {
          setVoiceState("wake_listening") // Return to wake word listening
          setConfidence(0)
        }
      }, 1500)
      return () => clearInterval(stateInterval)
    } else {
      setVoiceState("idle")
      setConfidence(0)
      setWakeWordConfidence(0)
    }
  }, [isVoiceActive, voiceState])

  // Enhanced voice activity with rolling data
  useEffect(() => {
    if (isVoiceActive) {
      const interval = setInterval(() => {
        // Generate more realistic waveform data based on voice state
        setUserVoiceData((prev) => {
          const newData = [...prev.slice(1)]
          let userActivity = 0

          if (voiceState === "wake_listening") {
            userActivity =
              Math.random() > 0.7 ? Math.sin(Date.now() * 0.015) * (Math.random() * 0.4 + 0.1) : Math.random() * 0.05
          } else if (voiceState === "wake_detected") {
            userActivity = Math.sin(Date.now() * 0.02) * (Math.random() * 0.8 + 0.2)
          } else if (voiceState === "listening") {
            userActivity =
              Math.random() > 0.4 ? Math.sin(Date.now() * 0.01) * (Math.random() * 0.9 + 0.1) : Math.random() * 0.1
          } else {
            userActivity = Math.random() * 0.05
          }

          newData.push(Math.max(0, Math.min(1, userActivity)))
          return newData
        })

        setAiVoiceData((prev) => {
          const newData = [...prev.slice(1)]
          let aiActivity = 0

          if (voiceState === "responding") {
            aiActivity = Math.sin(Date.now() * 0.008) * (Math.random() * 0.8 + 0.2)
          } else if (voiceState === "processing") {
            aiActivity = Math.random() * 0.3
          } else {
            aiActivity = Math.random() * 0.05
          }

          newData.push(Math.max(0, Math.min(1, aiActivity)))
          return newData
        })
      }, 100)
      return () => clearInterval(interval)
    } else {
      // Gradually fade out when inactive
      const fadeInterval = setInterval(() => {
        setUserVoiceData((prev) => prev.map((val) => val * 0.9))
        setAiVoiceData((prev) => prev.map((val) => val * 0.9))
      }, 100)
      return () => clearInterval(fadeInterval)
    }
  }, [isVoiceActive, voiceState])

  const formatTimeWithZone = (date: Date, timezoneOffset: number) => {
    const utc = date.getTime() + date.getTimezoneOffset() * 60000
    const targetTime = new Date(utc + timezoneOffset * 3600000)
    return targetTime.toISOString().replace("T", " ").slice(11, 19)
  }

  const formatMissionTime = (date: Date) => {
    const start = new Date("2024-01-15T00:00:00")
    const diff = date.getTime() - start.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)
    return `D+${days.toString().padStart(3, "0")} ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  const generateWavePath = (data: number[], color: string, offset = 0) => {
    const width = 100
    const height = 32
    const centerY = height / 2

    const points = data
      .map((value, index) => {
        const x = (index / (data.length - 1)) * width
        const y = centerY + Math.sin(index * 0.3 + offset) * value * (centerY - 2)
        return `${index === 0 ? "M" : "L"} ${x},${y}`
      })
      .join(" ")

    return points
  }

  const getStateColor = (state: VoiceState) => {
    switch (state) {
      case "wake_listening":
        return "text-muted-foreground"
      case "wake_detected":
        return "text-tactical-green"
      case "listening":
        return "text-tactical-blue"
      case "processing":
        return "text-tactical-amber"
      case "recognized":
        return "text-tactical-green"
      case "responding":
        return "text-tactical-red"
      case "error":
        return "text-tactical-red"
      default:
        return "text-muted-foreground"
    }
  }

  const getStateIcon = (state: VoiceState) => {
    switch (state) {
      case "wake_listening":
        return <Ear className="h-3 w-3" />
      case "wake_detected":
        return <CheckCircle className="h-3 w-3 animate-pulse" />
      case "listening":
        return <Mic className="h-3 w-3" />
      case "processing":
        return <Brain className="h-3 w-3 animate-pulse" />
      case "recognized":
        return <CheckCircle className="h-3 w-3" />
      case "responding":
        return <Zap className="h-3 w-3" />
      case "error":
        return <AlertCircle className="h-3 w-3" />
      default:
        return null
    }
  }

  const getStateText = (state: VoiceState) => {
    switch (state) {
      case "wake_listening":
        return "WAKE LISTENING"
      case "wake_detected":
        return "WAKE DETECTED"
      case "listening":
        return "LISTENING"
      case "processing":
        return "PROCESSING"
      case "recognized":
        return "RECOGNIZED"
      case "responding":
        return "RESPONDING"
      case "error":
        return "ERROR"
      default:
        return "IDLE"
    }
  }

  const getCommandTypeColor = (type: CommandType) => {
    switch (type) {
      case "navigation":
        return "text-tactical-blue"
      case "system":
        return "text-tactical-amber"
      case "query":
        return "text-tactical-green"
      case "action":
        return "text-tactical-red"
      case "unknown":
        return "text-muted-foreground"
      default:
        return "text-muted-foreground"
    }
  }

  const getMissionTimerColor = (state: MissionTimerState) => {
    switch (state) {
      case "running":
        return "text-tactical-green"
      case "paused":
        return "text-tactical-amber"
      case "stopped":
        return "text-tactical-red"
      default:
        return "text-muted-foreground"
    }
  }

  const currentTimeZone = timeZones[currentTimeZoneIndex]

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="border-b border-border p-3">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="h-4 w-4 text-tactical-red" />
          <span className="font-mono text-xs uppercase tracking-wider">MISSION CTRL</span>
        </div>

        {/* Mission Timers */}
        <div className="space-y-3 border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">TIMERS</span>
          </div>

          {/* Mission Timer */}
          <div className="space-y-2 pl-5">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">MISSION</div>
              <div className="flex items-center gap-1">
                <Button
                  className="tactical-button h-4 w-4 p-0"
                  onClick={handleMissionPlay}
                  disabled={missionTimerState === "running"}
                >
                  <Play className="h-2 w-2" />
                </Button>
                <Button
                  className="tactical-button h-4 w-4 p-0"
                  onClick={handleMissionPause}
                  disabled={missionTimerState !== "running"}
                >
                  <Pause className="h-2 w-2" />
                </Button>
                <Button className="tactical-button h-4 w-4 p-0" onClick={handleMissionStop}>
                  <Square className="h-2 w-2" />
                </Button>
              </div>
            </div>
            <div className={`text-xs font-mono ${getMissionTimerColor(missionTimerState)}`}>
              {formatMissionTime(missionTime)}
            </div>
          </div>

          {/* World Clock */}
          <div className="space-y-2 pl-5">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                {currentTimeZone.code}
              </div>
              <div className="flex items-center gap-1">
                <Button className="tactical-button h-4 w-4 p-0" onClick={() => navigateTimeZone(-1)}>
                  <ChevronLeft className="h-2 w-2" />
                </Button>
                <Button className="tactical-button h-4 w-4 p-0" onClick={() => navigateTimeZone(1)}>
                  <ChevronRight className="h-2 w-2" />
                </Button>
              </div>
            </div>
            <div className="text-xs font-mono text-tactical-blue">
              {formatTimeWithZone(currentTime, currentTimeZone.offset)}
            </div>
            <div className="text-xs text-muted-foreground">{currentTimeZone.name}</div>
          </div>
        </div>

        {/* Voice Interface */}
        <div className="space-y-3 pt-3">
          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <Button
              className={`tactical-button h-5 w-5 p-0 ${isVoiceActive ? "bg-tactical-red" : ""}`}
              onClick={() => setIsVoiceActive(!isVoiceActive)}
            >
              {isVoiceActive ? <Mic className="h-3 w-3" /> : <MicOff className="h-3 w-3" />}
            </Button>
            <Button
              className={`tactical-button h-5 w-5 p-0 ${isAudioMuted ? "bg-tactical-amber" : ""}`}
              onClick={() => setIsAudioMuted(!isAudioMuted)}
            >
              {isAudioMuted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
            </Button>
          </div>

          {/* Voice State Indicator */}
          {isVoiceActive && voiceState !== "idle" && (
            <div className="bg-secondary/30 border border-border p-2 space-y-1">
              <div className="flex items-center justify-between">
                <div className={`flex items-center gap-1 ${getStateColor(voiceState)}`}>
                  {getStateIcon(voiceState)}
                  <span className="text-xs font-mono uppercase">{getStateText(voiceState)}</span>
                </div>
                {(confidence > 0 || wakeWordConfidence > 0) && (
                  <div className="text-xs font-mono text-muted-foreground">
                    {(wakeWordConfidence || confidence).toFixed(0)}%
                  </div>
                )}
              </div>

              {/* Confidence Bar */}
              {(confidence > 0 || wakeWordConfidence > 0) && (
                <div className="w-full bg-secondary h-1">
                  <div
                    className={`h-1 transition-all duration-300 ${
                      voiceState === "wake_detected"
                        ? "bg-tactical-green"
                        : (confidence || wakeWordConfidence) > 70
                          ? "bg-tactical-green"
                          : (confidence || wakeWordConfidence) > 40
                            ? "bg-tactical-amber"
                            : "bg-tactical-red"
                    }`}
                    style={{ width: `${wakeWordConfidence || confidence}%` }}
                  />
                </div>
              )}

              {/* Wake Word Detection */}
              {voiceState === "wake_detected" && (
                <div className="space-y-1">
                  <div className="text-xs font-mono text-tactical-green">WAKE WORD</div>
                  <div className="text-xs font-mono text-foreground">"TASE"</div>
                </div>
              )}

              {/* Last Command */}
              {lastCommand && voiceState === "recognized" && (
                <div className="space-y-1">
                  <div className={`text-xs font-mono ${getCommandTypeColor(commandType)}`}>
                    {commandType.toUpperCase()}
                  </div>
                  <div className="text-xs font-mono text-foreground truncate">"{lastCommand}"</div>
                </div>
              )}
            </div>
          )}

          {/* Waveform Display */}
          <div className="bg-secondary/20 border border-border p-2 space-y-2">
            {/* User Waveform */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-mono opacity-80 ${
                    voiceState === "listening" || voiceState === "wake_listening" || voiceState === "wake_detected"
                      ? "text-tactical-blue animate-pulse"
                      : "text-tactical-blue"
                  }`}
                >
                  USR
                </span>
                <div className="flex-1 mx-2 h-8 relative">
                  <svg width="100%" height="32" className="absolute inset-0" viewBox="0 0 100 32">
                    {/* Grid lines for analog feel */}
                    <defs>
                      <pattern id="grid" width="10" height="8" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.2" opacity="0.2" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />

                    {/* Center line */}
                    <line x1="0" y1="16" x2="100" y2="16" stroke="currentColor" strokeWidth="0.3" opacity="0.3" />

                    {/* Recognition indicator overlay */}
                    {voiceState === "wake_detected" && (
                      <rect width="100%" height="100%" fill="#00FF41" opacity="0.15" className="animate-pulse" />
                    )}
                    {voiceState === "processing" && (
                      <rect width="100%" height="100%" fill="#FFA500" opacity="0.1" className="animate-pulse" />
                    )}
                    {voiceState === "recognized" && <rect width="100%" height="100%" fill="#00FF41" opacity="0.1" />}
                    {voiceState === "error" && (
                      <rect width="100%" height="100%" fill="#CD2027" opacity="0.1" className="animate-pulse" />
                    )}

                    {/* Waveform */}
                    <path
                      d={generateWavePath(userVoiceData, "#00BFFF", Date.now() * 0.01)}
                      stroke="#00BFFF"
                      strokeWidth="1.5"
                      fill="none"
                      opacity={isVoiceActive ? 0.9 : 0.4}
                      className="drop-shadow-sm"
                    />

                    {/* Glow effect */}
                    <path
                      d={generateWavePath(userVoiceData, "#00BFFF", Date.now() * 0.01)}
                      stroke="#00BFFF"
                      strokeWidth="3"
                      fill="none"
                      opacity={isVoiceActive ? 0.3 : 0.1}
                      className="blur-sm"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* AI Waveform */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-mono opacity-80 ${
                    voiceState === "responding" ? "text-tactical-red animate-pulse" : "text-tactical-red"
                  }`}
                >
                  TASE
                </span>
                <div className="flex-1 mx-2 h-8 relative">
                  <svg width="100%" height="32" className="absolute inset-0" viewBox="0 0 100 32">
                    {/* Grid lines */}
                    <rect width="100%" height="100%" fill="url(#grid)" />

                    {/* Center line */}
                    <line x1="0" y1="16" x2="100" y2="16" stroke="currentColor" strokeWidth="0.3" opacity="0.3" />

                    {/* Response indicator overlay */}
                    {voiceState === "responding" && (
                      <rect width="100%" height="100%" fill="#CD2027" opacity="0.1" className="animate-pulse" />
                    )}

                    {/* Waveform */}
                    <path
                      d={generateWavePath(aiVoiceData, "#CD2027", Date.now() * 0.008)}
                      stroke="#CD2027"
                      strokeWidth="1.5"
                      fill="none"
                      opacity={isVoiceActive ? 0.9 : 0.4}
                      className="drop-shadow-sm"
                    />

                    {/* Glow effect */}
                    <path
                      d={generateWavePath(aiVoiceData, "#CD2027", Date.now() * 0.008)}
                      stroke="#CD2027"
                      strokeWidth="3"
                      fill="none"
                      opacity={isVoiceActive ? 0.3 : 0.1}
                      className="blur-sm"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-mono uppercase tracking-wider text-muted-foreground px-2 py-2">
            TACTICAL MODULES
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tacticalSections.map((section) => (
                <SidebarMenuItem key={section.id}>
                  <SidebarMenuButton
                    className={`tactical-button h-8 justify-start gap-2 px-2 ${
                      activeTab === section.id ? "bg-accent text-accent-foreground" : ""
                    }`}
                    onClick={() => onTabChange(section.id)}
                  >
                    <section.icon className="h-3 w-3" />
                    <span className="text-xs">{section.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-3">
        <div className="text-xs font-mono text-muted-foreground text-center">NIGHTFALL v2.1.4</div>
        <div className="text-xs font-mono text-muted-foreground text-center">CLASSIFIED</div>
      </SidebarFooter>
    </Sidebar>
  )
}
