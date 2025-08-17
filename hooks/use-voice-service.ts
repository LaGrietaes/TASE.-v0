"use client"

import { useState, useEffect, useRef, useCallback } from "react"

declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

interface VoiceServiceState {
  isListening: boolean
  isProcessing: boolean
  audioError: string | null
  interimTranscript: string
  transcript: string
  waveformData: {
    user?: number[]
    ai?: number[]
  }
}

interface AudioDevice {
  deviceId: string
  label: string
}

export function useVoiceService() {
  const [state, setState] = useState<VoiceServiceState>({
    isListening: false,
    isProcessing: false,
    audioError: null,
    interimTranscript: "",
    transcript: "",
    waveformData: {},
  })

  const [availableDevices, setAvailableDevices] = useState<AudioDevice[]>([])
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("")
  const [audioError, setAudioError] = useState<string | null>(null)

  const recognitionRef = useRef<any>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animationFrameRef = useRef<number>()

  const voiceService = {
    updateConfig: (config: { language: string; wakeWord: string; confidenceThreshold: number }) => {
      console.log("Voice config updated:", config)
    },
  }

  const refreshDevices = useCallback(async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const audioInputs = devices
        .filter((device) => device.kind === "audioinput")
        .map((device) => ({
          deviceId: device.deviceId,
          label: device.label || `Microphone ${device.deviceId.slice(0, 8)}`,
        }))
      setAvailableDevices(audioInputs)
      if (audioInputs.length > 0 && !selectedDeviceId) {
        setSelectedDeviceId(audioInputs[0].deviceId)
      }
    } catch (error) {
      setAudioError("Failed to enumerate audio devices")
    }
  }, [selectedDeviceId])

  const selectMicrophone = useCallback(async (deviceId: string) => {
    setSelectedDeviceId(deviceId)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: { exact: deviceId } },
      })
      stream.getTracks().forEach((track) => track.stop())
      setAudioError(null)
    } catch (error) {
      setAudioError("Failed to access selected microphone")
    }
  }, [])

  useEffect(() => {
    refreshDevices()
  }, [refreshDevices])

  return {
    ...state,
    voiceService,
    availableDevices,
    selectedDeviceId,
    audioError,
    selectMicrophone,
    refreshDevices,
  }
}
