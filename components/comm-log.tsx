"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Radio, Send, Mic, MicOff, Volume2 } from "lucide-react"

interface CommLogProps {
  compact?: boolean
}

export function CommLog({ compact = false }: CommLogProps) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      timestamp: "14:32:15",
      callsign: "ALPHA-1",
      channel: "TACTICAL-1",
      message: "Objective secured. Moving to extraction point.",
      priority: "HIGH",
      encrypted: true,
    },
    {
      id: 2,
      timestamp: "14:31:42",
      callsign: "CONTROL",
      channel: "TACTICAL-1",
      message: "Copy Alpha-1. Extraction team en route to LZ Bravo.",
      priority: "NORMAL",
      encrypted: true,
    },
    {
      id: 3,
      timestamp: "14:30:18",
      callsign: "BRAVO-2",
      channel: "TACTICAL-2",
      message: "Contact! Taking fire from building 12. Requesting immediate support.",
      priority: "CRITICAL",
      encrypted: true,
    },
    {
      id: 4,
      timestamp: "14:29:55",
      callsign: "OVERWATCH",
      channel: "TACTICAL-2",
      message: "Bravo-2, this is Overwatch. Target neutralized. You're clear to advance.",
      priority: "HIGH",
      encrypted: true,
    },
    {
      id: 5,
      timestamp: "14:28:33",
      callsign: "CHARLIE-3",
      channel: "LOGISTICS",
      message: "Supply drop complete. All packages delivered to designated coordinates.",
      priority: "NORMAL",
      encrypted: false,
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const [selectedChannel, setSelectedChannel] = useState("TACTICAL-1")
  const [micActive, setMicActive] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      const callsigns = ["ALPHA-1", "BRAVO-2", "CHARLIE-3", "DELTA-4", "OVERWATCH", "CONTROL"]
      const channels = ["TACTICAL-1", "TACTICAL-2", "LOGISTICS", "COMMAND"]
      const sampleMessages = [
        "Status report requested.",
        "Moving to next waypoint.",
        "All clear on this sector.",
        "Equipment check complete.",
        "Standing by for orders.",
        "Perimeter secured.",
        "Radio check, over.",
      ]

      const newMsg = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
        callsign: callsigns[Math.floor(Math.random() * callsigns.length)],
        channel: channels[Math.floor(Math.random() * channels.length)],
        message: sampleMessages[Math.floor(Math.random() * sampleMessages.length)],
        priority: ["NORMAL", "HIGH", "CRITICAL"][Math.floor(Math.random() * 3)],
        encrypted: Math.random() > 0.2,
      }

      setMessages((prev) => [newMsg, ...prev.slice(0, 19)])
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const msg = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
        callsign: "CONTROL",
        channel: selectedChannel,
        message: newMessage,
        priority: "NORMAL",
        encrypted: true,
      }
      setMessages((prev) => [msg, ...prev])
      setNewMessage("")
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "CRITICAL":
        return "text-red-400"
      case "HIGH":
        return "text-orange-400"
      case "NORMAL":
        return "text-white"
      default:
        return "text-gray-400"
    }
  }

  const displayMessages = compact ? messages.slice(0, 4) : messages

  return (
    <Card className="bg-slate-900/50 border-white/30 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-white font-mono flex items-center gap-2">
          <Radio className="w-5 h-5" />
          COMMUNICATIONS LOG
          <Badge className="bg-white/20 text-white border-white/50 ml-auto">
            {messages.filter((m) => m.encrypted).length} ENCRYPTED
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className={compact ? "h-48" : "h-64"}>
          <div className="space-y-2">
            {displayMessages.map((msg) => (
              <div key={msg.id} className="bg-slate-800/50 border border-white/20 rounded p-2">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-white/70">{msg.timestamp}</span>
                    <Badge className="text-xs bg-blue-400/20 text-blue-400 border-blue-400/50">{msg.channel}</Badge>
                    <span className={`text-xs font-mono font-bold ${getPriorityColor(msg.priority)}`}>
                      {msg.callsign}
                    </span>
                    {msg.encrypted && <div className="w-2 h-2 bg-white rounded-full" title="Encrypted" />}
                  </div>
                  <Volume2 className="w-3 h-3 text-white/50" />
                </div>
                <p className="text-sm text-white/90 font-mono">{msg.message}</p>
              </div>
            ))}
          </div>
        </ScrollArea>

        {!compact && (
          <div className="mt-4 pt-4 border-t border-white/20 space-y-3">
            <div className="flex gap-2">
              <select
                value={selectedChannel}
                onChange={(e) => setSelectedChannel(e.target.value)}
                className="bg-slate-800 border border-white/30 text-white text-xs font-mono rounded px-2 py-1"
              >
                <option value="TACTICAL-1">TACTICAL-1</option>
                <option value="TACTICAL-2">TACTICAL-2</option>
                <option value="LOGISTICS">LOGISTICS</option>
                <option value="COMMAND">COMMAND</option>
              </select>
              <Button
                size="sm"
                variant={micActive ? "default" : "ghost"}
                onClick={() => setMicActive(!micActive)}
                className={`${micActive ? "bg-red-400/20 text-red-400 border-red-400/50" : "text-white/70 hover:text-white"} font-mono`}
              >
                {micActive ? <Mic className="w-3 h-3" /> : <MicOff className="w-3 h-3" />}
              </Button>
            </div>

            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Enter message..."
                className="bg-slate-800 border-white/30 text-white placeholder:text-white/50 font-mono text-sm"
              />
              <Button
                onClick={handleSendMessage}
                className="bg-white/20 text-white border border-white/50 hover:bg-white/30"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
