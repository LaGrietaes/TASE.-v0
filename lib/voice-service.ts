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
  action?: () => void
  description?: string
  keyword?: string
  route?: string
}

export interface VoiceConfig {
  wakeWord: string
  confidenceThreshold: number
  timeoutMs: number
  language: string
  enableContinuousListening: boolean
  selectedMicrophoneId?: string
}

export interface AudioDevice {
  deviceId: string
  label: string
  kind: MediaDeviceKind
}

export type CommandType = "navigation" | "system" | "query" | "action" | "unknown"

export class VoiceService {
  private static instance: VoiceService
  private config: VoiceConfig
  private isListening = false
  private recognition: SpeechRecognition | null = null
  private synthesis: SpeechSynthesis | null = null
  private listeners: Map<string, Function[]> = new Map()
  private commands: VoiceCommand[] = [
    { keyword: "intel", route: "intel", response: "Navigating to intel feed" },
    { keyword: "mission", route: "mission-board", response: "Navigating to mission board" },
    { keyword: "communication", route: "comm", response: "Navigating to communications" },
    { keyword: "diagnostic", route: "diagnostics", response: "Navigating to diagnostics" },
    { keyword: "signal", route: "signals", response: "Navigating to signals" },
    { keyword: "setting", route: "settings", response: "Navigating to settings" },
  ]

  // Audio Analysis
  private audioContext: AudioContext | null = null
  private analyser: AnalyserNode | null = null
  private microphone: MediaStreamAudioSourceNode | null = null
  private dataArray: Uint8Array | null = null
  private stream: MediaStream | null = null
  private animationFrame: number | null = null

  // Audio devices
  private availableDevices: AudioDevice[] = []

  constructor() {
    this.config = {
      wakeWord: "TASE",
      confidenceThreshold: 0.7,
      timeoutMs: 5000,
      language: "en-US",
      enableContinuousListening: true,
    }

    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      this.recognition = new (window as any).webkitSpeechRecognition()
      this.setupRecognition()
    }

    this.initializeSpeechSynthesis()
    this.initializeAudioContext()
    this.enumerateAudioDevices()
  }

  static getInstance(): VoiceService {
    if (!VoiceService.instance) {
      VoiceService.instance = new VoiceService()
    }
    return VoiceService.instance
  }

  private async initializeAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      this.analyser = this.audioContext.createAnalyser()
      this.analyser.fftSize = 256
      this.analyser.smoothingTimeConstant = 0.8
      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount)
    } catch (error) {
      console.error("Failed to initialize audio context:", error)
      this.emit("audio_error", { error: "Failed to initialize audio context" })
    }
  }

  private async enumerateAudioDevices() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      this.availableDevices = devices
        .filter((device) => device.kind === "audioinput")
        .map((device) => ({
          deviceId: device.deviceId,
          label: device.label || `Microphone ${device.deviceId.slice(0, 8)}`,
          kind: device.kind,
        }))

      this.emit("devices_updated", this.availableDevices)
    } catch (error) {
      console.error("Failed to enumerate audio devices:", error)
      this.emit("audio_error", { error: "Failed to enumerate audio devices" })
    }
  }

  private async initializeMicrophone() {
    try {
      if (this.stream) {
        this.stream.getTracks().forEach((track) => track.stop())
      }

      const constraints: MediaStreamConstraints = {
        audio: this.config.selectedMicrophoneId ? { deviceId: { exact: this.config.selectedMicrophoneId } } : true,
      }

      this.stream = await navigator.mediaDevices.getUserMedia(constraints)

      if (this.audioContext && this.analyser) {
        this.microphone = this.audioContext.createMediaStreamSource(this.stream)
        this.microphone.connect(this.analyser)
        this.startAudioAnalysis()
        this.emit("microphone_initialized", { deviceId: this.config.selectedMicrophoneId })
      }
    } catch (error) {
      console.error("Failed to initialize microphone:", error)
      this.emit("audio_error", { error: "Microphone access denied or failed" })
    }
  }

  private startAudioAnalysis() {
    if (!this.analyser || !this.dataArray) return

    const analyze = () => {
      if (!this.analyser || !this.dataArray) return

      this.analyser.getByteFrequencyData(this.dataArray)

      // Calculate average amplitude
      const average = this.dataArray.reduce((sum, value) => sum + value, 0) / this.dataArray.length
      const normalizedAmplitude = average / 255

      // Calculate frequency distribution for more detailed waveform
      const lowFreq = this.dataArray.slice(0, 10).reduce((sum, value) => sum + value, 0) / 10 / 255
      const midFreq = this.dataArray.slice(10, 50).reduce((sum, value) => sum + value, 0) / 40 / 255
      const highFreq = this.dataArray.slice(50, 100).reduce((sum, value) => sum + value, 0) / 50 / 255

      this.emit("audio_data", {
        amplitude: normalizedAmplitude,
        frequencies: { low: lowFreq, mid: midFreq, high: highFreq },
        rawData: Array.from(this.dataArray),
      })

      this.animationFrame = requestAnimationFrame(analyze)
    }

    analyze()
  }

  private stopAudioAnalysis() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame)
      this.animationFrame = null
    }
  }

  private setupRecognition() {
    if (!this.recognition) return

    this.recognition.continuous = true
    this.recognition.interimResults = false
    this.recognition.lang = "en-US"

    this.recognition.onstart = () => {
      this.emit("recognition_start", {})
    }

    this.recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim()
      this.processCommand(transcript)
    }

    this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error)
      this.emit("recognition_error", { error: event.error })
    }

    this.recognition.onend = () => {
      if (this.isListening && this.config.enableContinuousListening) {
        // Restart recognition for continuous listening
        setTimeout(() => {
          if (this.recognition && this.isListening) {
            this.recognition.start()
          }
        }, 100)
      }
    }
  }

  private initializeSpeechSynthesis() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      this.synthesis = window.speechSynthesis
    }
  }

  private processCommand(transcript: string) {
    const matchedCommand = this.commands.find((cmd) => transcript.includes(cmd.keyword.toLowerCase()))

    if (matchedCommand) {
      matchedCommand.action()
    } else {
      const commandType = this.classifyCommand(transcript)
      const voiceCommand: VoiceCommand = {
        id: `cmd-${Date.now()}`,
        timestamp: new Date().toISOString(),
        wakeWord: this.config.wakeWord,
        command: transcript,
        confidence: 1.0,
        type: commandType,
        status: "processing",
      }

      this.emit("command_recognized", voiceCommand)
      this.executeCommand(voiceCommand)
    }
  }

  private classifyCommand(command: string): CommandType {
    const navigationKeywords = ["show", "open", "go to", "navigate", "display"]
    const systemKeywords = ["restart", "shutdown", "reboot", "reset", "power"]
    const queryKeywords = ["status", "what", "how", "when", "where", "report"]
    const actionKeywords = ["execute", "run", "start", "stop", "activate", "deactivate"]

    const upperCommand = command.toUpperCase()

    if (navigationKeywords.some((keyword) => upperCommand.includes(keyword.toUpperCase()))) {
      return "navigation"
    }
    if (systemKeywords.some((keyword) => upperCommand.includes(keyword.toUpperCase()))) {
      return "system"
    }
    if (queryKeywords.some((keyword) => upperCommand.includes(keyword.toUpperCase()))) {
      return "query"
    }
    if (actionKeywords.some((keyword) => upperCommand.includes(keyword.toUpperCase()))) {
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
    if (upperCommand.includes("SETTINGS")) {
      window.dispatchEvent(new CustomEvent("navigate_to", { detail: "settings" }))
      return "Navigating to Settings"
    }

    return "Navigation target not recognized"
  }

  private async handleSystemCommand(command: string): Promise<string> {
    return "System command acknowledged"
  }

  private async handleQueryCommand(command: string): Promise<string> {
    return "Query processed"
  }

  private async handleActionCommand(command: string): Promise<string> {
    return "Action executed"
  }

  public speak(text: string) {
    if (this.synthesis) {
      // Stop any current speech
      this.synthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1.0
      utterance.volume = 0.8

      this.emit("speech_start", { text })

      utterance.onstart = () => {
        this.emit("speech_started", { text })
      }

      utterance.onend = () => {
        this.emit("speech_end", { text })
      }

      utterance.onerror = (event) => {
        this.emit("speech_error", { error: event.error })
      }

      this.synthesis.speak(utterance)
    }
  }

  public async startListening() {
    if (!this.isListening) {
      this.isListening = true

      // Initialize microphone first
      await this.initializeMicrophone()

      // Start speech recognition
      if (this.recognition) {
        try {
          this.recognition.start()
        } catch (error) {
          console.error("Failed to start speech recognition:", error)
          this.emit("recognition_error", { error: "Failed to start speech recognition" })
        }
      }
    }
  }

  public stopListening() {
    if (this.isListening) {
      this.isListening = false

      // Stop speech recognition
      if (this.recognition) {
        this.recognition.stop()
      }

      // Stop audio analysis
      this.stopAudioAnalysis()

      // Stop microphone stream
      if (this.stream) {
        this.stream.getTracks().forEach((track) => track.stop())
        this.stream = null
      }

      if (this.microphone) {
        this.microphone.disconnect()
        this.microphone = null
      }
    }
  }

  public async selectMicrophone(deviceId: string) {
    this.config.selectedMicrophoneId = deviceId

    if (this.isListening) {
      // Restart with new microphone
      this.stopListening()
      await this.startListening()
    }
  }

  public getAvailableDevices(): AudioDevice[] {
    return [...this.availableDevices]
  }

  public async refreshDevices() {
    await this.enumerateAudioDevices()
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

    // Update speech recognition language if changed
    if (newConfig.language && this.recognition) {
      this.recognition.lang = newConfig.language
    }
  }

  public cleanup() {
    this.stopListening()
    if (this.audioContext && this.audioContext.state !== "closed") {
      this.audioContext.close()
    }
  }

  public addCommand(command: VoiceCommand): void {
    this.commands.push(command)
  }

  public removeCommand(keyword: string): void {
    this.commands = this.commands.filter((cmd) => cmd.keyword !== keyword)
  }

  public isActive(): boolean {
    return this.isListening
  }

  public getCommands(): VoiceCommand[] {
    return this.commands
  }
}

export const voiceService = new VoiceService()
