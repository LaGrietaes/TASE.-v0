"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { QuickAddDialog } from "@/components/quick-add-dialog"
import { Plus } from "lucide-react"

export function QuickAdd() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className="bg-[#cd2027] hover:bg-[#cd2027]/90 text-white">
        <Plus className="h-4 w-4 mr-2" />
        Quick Add
      </Button>
      <QuickAddDialog open={isOpen} onOpenChange={setIsOpen} />
    </>
  )
}
