import type { SpeechRecognition, SpeechRecognitionEvent, SpeechRecognitionErrorEvent } from "web-speech-api"

export interface VoiceCommand {
  id: string
  timestamp: string
  wakeWord: string
  command: string
  confidence: number
  type: CommandType
  status: "pending" | "processing" | "completed" | "failed"
  response?: string
}

export interface VoiceConfig {
  wakeWord: string
  confidenceThreshold: number
  timeoutMs: number
  language: string
  enableContinuousListening: boolean
}

export type CommandType = "navigation" | "system" | "query" | "action" | "unknown"

export class VoiceService {
  private static instance: VoiceService
  private config: VoiceConfig
  private isListening = false
  private recognition: SpeechRecognition | null = null
  private synthesis: SpeechSynthesis | null = null
  private listeners: Map<string, Function[]> = new Map()

  constructor() {
    this.config = {
      wakeWord: "TASE",
      confidenceThreshold: 0.7,
      timeoutMs: 5000,
      language: "en-US",
      enableContinuousListening: true,
    }

    this.initializeSpeechRecognition()
    this.initializeSpeechSynthesis()
  }

  static getInstance(): VoiceService {
    if (!VoiceService.instance) {
      VoiceService.instance = new VoiceService()
    }
    return VoiceService.instance
  }

  private initializeSpeechRecognition() {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      this.recognition = new (window as any).webkitSpeechRecognition()
      this.recognition.continuous = true
      this.recognition.interimResults = true
      this.recognition.lang = this.config.language

      this.recognition.onstart = () => {
        this.emit("recognition_start", {})
      }

      this.recognition.onresult = (event: SpeechRecognitionEvent) => {
        const results = Array.from(event.results)
        const transcript = results
          .map((result) => result[0].transcript)
          .join("")
          .toUpperCase()

        // Check for wake word
        if (transcript.includes(this.config.wakeWord)) {
          this.emit("wake_word_detected", {
            transcript,
            confidence: results[results.length - 1][0].confidence,
          })

          // Extract command after wake word
          const commandStart = transcript.indexOf(this.config.wakeWord) + this.config.wakeWord.length
          const command = transcript.slice(commandStart).trim()

          if (command) {
            this.processCommand(command, results[results.length - 1][0].confidence)
          }
        }
      }

      this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        this.emit("recognition_error", { error: event.error })
      }

      this.recognition.onend = () => {
        if (this.isListening && this.config.enableContinuousListening) {
          // Restart recognition for continuous listening
          setTimeout(() => {
            this.recognition?.start()
          }, 100)
        }
      }
    }
  }

  private initializeSpeechSynthesis() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      this.synthesis = window.speechSynthesis
    }
  }

  private processCommand(command: string, confidence: number) {
    const commandType = this.classifyCommand(command)
    const voiceCommand: VoiceCommand = {
      id: `cmd-${Date.now()}`,
      timestamp: new Date().toISOString(),
      wakeWord: this.config.wakeWord,
      command,
      confidence,
      type: commandType,
      status: "processing",
    }

    this.emit("command_recognized", voiceCommand)

    // Process command based on type
    this.executeCommand(voiceCommand)
  }

  private classifyCommand(command: string): CommandType {
    const navigationKeywords = ["SHOW", "OPEN", "GO TO", "NAVIGATE", "DISPLAY"]
    const systemKeywords = ["RESTART", "SHUTDOWN", "REBOOT", "RESET", "POWER"]
    const queryKeywords = ["STATUS", "WHAT", "HOW", "WHEN", "WHERE", "REPORT"]
    const actionKeywords = ["EXECUTE", "RUN", "START", "STOP", "ACTIVATE", "DEACTIVATE"]

    const upperCommand = command.toUpperCase()

    if (navigationKeywords.some((keyword) => upperCommand.includes(keyword))) {
      return "navigation"
    }
    if (systemKeywords.some((keyword) => upperCommand.includes(keyword))) {
      return "system"
    }
    if (queryKeywords.some((keyword) => upperCommand.includes(keyword))) {
      return "query"
    }
    if (actionKeywords.some((keyword) => upperCommand.includes(keyword))) {
      return "action"
    }

    return "unknown"
  }

  private async executeCommand(voiceCommand: VoiceCommand) {
    try {
      let response = ""

      switch (voiceCommand.type) {
        case "navigation":
          response = await this.handleNavigationCommand(voiceCommand.command)
          break
        case "system":
          response = await this.handleSystemCommand(voiceCommand.command)
          break
        case "query":
          response = await this.handleQueryCommand(voiceCommand.command)
          break
        case "action":
          response = await this.handleActionCommand(voiceCommand.command)
          break
        default:
          response = "Command not recognized. Please try again."
          voiceCommand.status = "failed"
      }

      voiceCommand.response = response
      voiceCommand.status = voiceCommand.status === "failed" ? "failed" : "completed"

      this.emit("command_completed", voiceCommand)
      this.speak(response)
    } catch (error) {
      voiceCommand.status = "failed"
      voiceCommand.response = "Command execution failed."
      this.emit("command_failed", voiceCommand)
    }
  }

  private async handleNavigationCommand(command: string): Promise<string> {
    const upperCommand = command.toUpperCase()

    if (upperCommand.includes("INTEL")) {
      window.dispatchEvent(new CustomEvent("navigate_to", { detail: "intel" }))
      return "Navigating to Intel Feed"
    }
    if (upperCommand.includes("MISSION") || upperCommand.includes("BOARD")) {
      window.dispatchEvent(new CustomEvent("navigate_to", { detail: "mission-board" }))
      return "Navigating to Mission Board"
    }
    if (upperCommand.includes("COMM")) {
      window.dispatchEvent(new CustomEvent("navigate_to", { detail: "comm" }))
      return "Navigating to Communication Log"
    }
    if (upperCommand.includes("OVERRIDE")) {
      window.dispatchEvent(new CustomEvent("navigate_to", { detail: "overrides" }))
      return "Navigating to System Overrides"
    }
    if (upperCommand.includes("DIAGNOSTIC")) {
      window.dispatchEvent(new CustomEvent("navigate_to", { detail: "diagnostics" }))
      return "Navigating to Diagnostics Panel"
    }
    if (upperCommand.includes("SIGNAL")) {
      window.dispatchEvent(new CustomEvent("navigate_to", { detail: "signals" }))
      return "Navigating to Signals Panel"
    }

    return "Navigation target not recognized"
  }

  private async handleSystemCommand(command: string): Promise<string> {
    // Placeholder for system commands
    return "System command acknowledged"
  }

  private async handleQueryCommand(command: string): Promise<string> {
    // Placeholder for query commands
    return "Query processed"
  }

  private async handleActionCommand(command: string): Promise<string> {
    // Placeholder for action commands
    return "Action executed"
  }

  public speak(text: string) {
    if (this.synthesis) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1.0
      utterance.volume = 0.8

      this.emit("speech_start", { text })

      utterance.onend = () => {
        this.emit("speech_end", { text })
      }

      this.synthesis.speak(utterance)
    }
  }

  public startListening() {
    if (this.recognition && !this.isListening) {
      this.isListening = true
      this.recognition.start()
    }
  }

  public stopListening() {
    if (this.recognition && this.isListening) {
      this.isListening = false
      this.recognition.stop()
    }
  }

  public on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }
    this.listeners.get(event)!.push(callback)
  }

  public off(event: string, callback: Function) {
    const eventListeners = this.listeners.get(event)
    if (eventListeners) {
      const index = eventListeners.indexOf(callback)
      if (index > -1) {
        eventListeners.splice(index, 1)
      }
    }
  }

  private emit(event: string, data: any) {
    const eventListeners = this.listeners.get(event)
    if (eventListeners) {
      eventListeners.forEach((callback) => callback(data))
    }
  }

  public getConfig(): VoiceConfig {
    return { ...this.config }
  }

  public updateConfig(newConfig: Partial<VoiceConfig>) {
    this.config = { ...this.config, ...newConfig }
  }
}
