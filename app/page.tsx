"use client"

import { useState, useEffect } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { TopNavigation } from "@/components/top-navigation"
import { MainDashboard } from "@/components/main-dashboard"
import { CommandLog } from "@/components/command-log"
import { MissionBoard } from "@/components/mission-board"
import { IntelFeed } from "@/components/intel-feed"
import { CommLog } from "@/components/comm-log"
import { OverridesPanel } from "@/components/overrides-panel"
import { DiagnosticsPanel } from "@/components/diagnostics-panel"
import { SignalsPanel } from "@/components/signals-panel"
import { SystemSettingsPanel } from "@/components/system-settings-panel"
import { QuickAddDialog } from "@/components/quick-add-dialog"

export default function MissionControl() {
  const [activeTab, setActiveTab] = useState("mission-board")

  // Handle voice navigation
  useEffect(() => {
    const handleNavigateTo = (event: CustomEvent) => {
      setActiveTab(event.detail)
    }

    window.addEventListener("navigate_to", handleNavigateTo as EventListener)
    return () => {
      window.removeEventListener("navigate_to", handleNavigateTo as EventListener)
    }
  }, [])

  const renderContent = () => {
    switch (activeTab) {
      case "mission-board":
        return <MissionBoard />
      case "intel":
        return <IntelFeed />
      case "comm":
        return <CommLog />
      case "overrides":
        return <OverridesPanel />
      case "diagnostics":
        return <DiagnosticsPanel />
      case "signals":
        return <SignalsPanel />
      case "settings":
        return <SystemSettingsPanel />
      default:
        return <MainDashboard />
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SidebarProvider defaultOpen={true}>
        <div className="flex h-screen">
          <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="flex-1 flex flex-col">
            <TopNavigation />
            <main className="flex-1 p-4 overflow-auto">{renderContent()}</main>
            <CommandLog />
          </div>
        </div>
      </SidebarProvider>
      <QuickAddDialog />
    </div>
  )
}
