"use client"

import { useState, useEffect } from "react"
import { VoiceService, type VoiceCommand } from "@/lib/voice-service"

export function useVoiceService() {
  const [voiceService] = useState(() => VoiceService.getInstance())
  const [isListening, setIsListening] = useState(false)
  const [currentCommand, setCurrentCommand] = useState<VoiceCommand | null>(null)
  const [commandHistory, setCommandHistory] = useState<VoiceCommand[]>([])
  const [wakeWordDetected, setWakeWordDetected] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

  useEffect(() => {
    const handleWakeWord = (data: any) => {
      setWakeWordDetected(true)
      setTimeout(() => setWakeWordDetected(false), 2000)
    }

    const handleCommandRecognized = (command: VoiceCommand) => {
      setCurrentCommand(command)
      setCommandHistory((prev) => [command, ...prev.slice(0, 9)])
    }

    const handleCommandCompleted = (command: VoiceCommand) => {
      setCurrentCommand(null)
      setCommandHistory((prev) => prev.map((cmd) => (cmd.id === command.id ? command : cmd)))
    }

    const handleSpeechStart = () => {
      setIsSpeaking(true)
    }

    const handleSpeechEnd = () => {
      setIsSpeaking(false)
    }

    const handleRecognitionStart = () => {
      setIsListening(true)
    }

    voiceService.on("wake_word_detected", handleWakeWord)
    voiceService.on("command_recognized", handleCommandRecognized)
    voiceService.on("command_completed", handleCommandCompleted)
    voiceService.on("command_failed", handleCommandCompleted)
    voiceService.on("speech_start", handleSpeechStart)
    voiceService.on("speech_end", handleSpeechEnd)
    voiceService.on("recognition_start", handleRecognitionStart)

    return () => {
      voiceService.off("wake_word_detected", handleWakeWord)
      voiceService.off("command_recognized", handleCommandRecognized)
      voiceService.off("command_completed", handleCommandCompleted)
      voiceService.off("command_failed", handleCommandCompleted)
      voiceService.off("speech_start", handleSpeechStart)
      voiceService.off("speech_end", handleSpeechEnd)
      voiceService.off("recognition_start", handleRecognitionStart)
    }
  }, [voiceService])

  const startListening = () => {
    voiceService.startListening()
  }

  const stopListening = () => {
    voiceService.stopListening()
    setIsListening(false)
  }

  const speak = (text: string) => {
    voiceService.speak(text)
  }

  return {
    voiceService,
    isListening,
    currentCommand,
    commandHistory,
    wakeWordDetected,
    isSpeaking,
    startListening,
    stopListening,
    speak,
  }
}
