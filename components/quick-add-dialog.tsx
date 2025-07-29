"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import type { Todo } from "@/lib/types"

export function QuickAddDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    priority: "MEDIUM" as Todo["priority"],
    assignee: "",
    dueDate: "",
    category: "MISSION" as Todo["category"],
  })

  useEffect(() => {
    const handleOpenQuickAdd = () => setIsOpen(true)
    window.addEventListener("openQuickAdd", handleOpenQuickAdd)
    return () => window.removeEventListener("openQuickAdd", handleOpenQuickAdd)
  }, [])

  const handleAddTodo = () => {
    console.log("Adding todo:", newTodo)
    setNewTodo({
      title: "",
      description: "",
      priority: "MEDIUM",
      assignee: "",
      dueDate: "",
      category: "MISSION",
    })
    setIsOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleAddTodo()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px] bg-card border-border" onKeyDown={handleKeyDown}>
        <DialogHeader>
          <DialogTitle className="text-xs font-mono uppercase tracking-wider flex items-center gap-2">
            <Plus className="h-3 w-3" />
            QUICK ADD TASK
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">TITLE *</label>
            <Input
              value={newTodo.title}
              onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
              className="tactical-button h-8 text-xs"
              placeholder="Enter task title..."
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">ASSIGNEE</label>
            <Select value={newTodo.assignee} onValueChange={(value) => setNewTodo({ ...newTodo, assignee: value })}>
              <SelectTrigger className="tactical-button h-8 text-xs">
                <SelectValue placeholder="Select assignee..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="OPERATOR-1">OPERATOR-1</SelectItem>
                <SelectItem value="OPERATOR-2">OPERATOR-2</SelectItem>
                <SelectItem value="TECH-LEAD">TECH-LEAD</SelectItem>
                <SelectItem value="COMMANDER">COMMANDER</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">PRIORITY</label>
            <Select
              value={newTodo.priority}
              onValueChange={(value) => setNewTodo({ ...newTodo, priority: value as Todo["priority"] })}
            >
              <SelectTrigger className="tactical-button h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LOW">LOW</SelectItem>
                <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                <SelectItem value="HIGH">HIGH</SelectItem>
                <SelectItem value="CRITICAL">CRITICAL</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">CATEGORY</label>
            <Select
              value={newTodo.category}
              onValueChange={(value) => setNewTodo({ ...newTodo, category: value as Todo["category"] })}
            >
              <SelectTrigger className="tactical-button h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MISSION">MISSION</SelectItem>
                <SelectItem value="MAINTENANCE">MAINTENANCE</SelectItem>
                <SelectItem value="SECURITY">SECURITY</SelectItem>
                <SelectItem value="INTEL">INTEL</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">DUE DATE</label>
            <Input
              type="datetime-local"
              value={newTodo.dueDate}
              onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
              className="tactical-button h-8 text-xs"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">DESCRIPTION</label>
            <Textarea
              value={newTodo.description}
              onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
              className="tactical-button text-xs resize-none"
              rows={3}
              placeholder="Enter task description..."
            />
          </div>
        </div>
        <div className="flex justify-between items-center px-4 pb-4">
          <div className="text-xs text-muted-foreground font-mono">CTRL+ENTER TO SAVE</div>
          <div className="flex gap-2">
            <Button className="tactical-button h-8 px-4" onClick={() => setIsOpen(false)}>
              CANCEL
            </Button>
            <Button
              className="tactical-button h-8 px-4 bg-tactical-green text-background"
              onClick={handleAddTodo}
              disabled={!newTodo.title.trim()}
            >
              ADD TASK
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
