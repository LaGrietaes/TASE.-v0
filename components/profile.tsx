"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { User, Calendar, Award } from "lucide-react"

export function Profile() {
  const achievements = [
    { id: 1, title: "Task Master", description: "Completed 100 tasks", icon: "🏆" },
    { id: 2, title: "Team Player", description: "Collaborated on 10 projects", icon: "🤝" },
    { id: 3, title: "Early Bird", description: "Completed tasks before deadline 50 times", icon: "🌅" },
    { id: 4, title: "Productivity Pro", description: "Maintained 90% productivity for a month", icon: "⚡" },
  ]

  const recentActivity = [
    { id: 1, action: "Completed task", item: "Design new landing page", time: "2 hours ago" },
    { id: 2, action: "Created project", item: "Mobile App Development", time: "1 day ago" },
    { id: 3, action: "Updated task", item: "API Integration", time: "2 days ago" },
    { id: 4, action: "Joined team", item: "Website Redesign", time: "1 week ago" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" defaultValue="+1 (555) 123-4567" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" defaultValue="San Francisco, CA" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  defaultValue="Passionate developer with 5+ years of experience in web development and project management."
                  rows={3}
                />
              </div>

              <Button className="bg-accent hover:bg-accent/90">Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-3 p-3 border">
                    <div className="flex-1">
                      <p className="font-medium">
                        {activity.action}: <span className="text-muted-foreground">{activity.item}</span>
                      </p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">Member since</p>
                  <p className="text-sm text-muted-foreground">January 2023</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Award className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">Tasks completed</p>
                  <p className="text-sm text-muted-foreground">127 tasks</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">Projects joined</p>
                  <p className="text-sm text-muted-foreground">15 projects</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center gap-3 p-3 border">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-medium">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
