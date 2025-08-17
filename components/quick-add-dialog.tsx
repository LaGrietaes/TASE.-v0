"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"

interface QuickAddData {
  type: string
  title: string
  priority: string
  assignee: string
  description: string
}

export function QuickAddDialog() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<QuickAddData>({
    type: "",
    title: "",
    priority: "",
    assignee: "",
    description: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Quick add:", formData)
    setOpen(false)
    setFormData({
      type: "",
      title: "",
      priority: "",
      assignee: "",
      description: "",
    })
  }

  const handleInputChange = (field: keyof QuickAddData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-red-600 hover:bg-red-700">
          <Plus className="h-4 w-4 mr-2" />
          Quick Add
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-mono">QUICK ADD</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type" className="text-xs font-mono">
              TYPE
            </Label>
            <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mission">Mission</SelectItem>
                <SelectItem value="alert">Alert</SelectItem>
                <SelectItem value="task">Task</SelectItem>
                <SelectItem value="report">Report</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title" className="text-xs font-mono">
              TITLE
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Enter title"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority" className="text-xs font-mono">
                PRIORITY
              </Label>
              <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignee" className="text-xs font-mono">
                ASSIGNEE
              </Label>
              <Select value={formData.assignee} onValueChange={(value) => handleInputChange("assignee", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Assign to" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alpha">Team Alpha</SelectItem>
                  <SelectItem value="bravo">Team Bravo</SelectItem>
                  <SelectItem value="charlie">Team Charlie</SelectItem>
                  <SelectItem value="delta">Team Delta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-xs font-mono">
              DESCRIPTION
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter description"
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700">
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
