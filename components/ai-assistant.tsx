"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Bot, Send, Lightbulb } from "lucide-react"
import { useState } from "react"

export function AIAssistant() {
  const [message, setMessage] = useState("")

  const suggestions = [
    "Schedule a team meeting for next week",
    "Prioritize tasks based on deadlines",
    "Create a project timeline",
    "Suggest productivity improvements",
  ]

  const handleSendMessage = () => {
    if (message.trim()) {
      // AI message logic here
      console.log("AI message:", message)
      setMessage("")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          AI Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="bg-muted p-3 text-sm">
            <p className="font-medium">AI Assistant</p>
            <p>
              Hello! I can help you manage tasks, schedule meetings, and optimize your productivity. What would you like
              to do?
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium flex items-center gap-1">
            <Lightbulb className="h-3 w-3" />
            Quick suggestions:
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <Badge
                key={index}
                variant="outline"
                className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                onClick={() => setMessage(suggestion)}
              >
                {suggestion}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Ask AI anything..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button onClick={handleSendMessage} size="sm" className="bg-accent hover:bg-accent/90">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
