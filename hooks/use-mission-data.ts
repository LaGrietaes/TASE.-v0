"use client"

import { useState, useEffect } from "react"
import type { Task, Mission, SystemStatus, Alert } from "@/lib/types"

import { getFirestore, collection, onSnapshot } from "firebase/firestore"; // Import Firestore functions
import app from "@/lib/firebase"; // Import the Firebase app instance

// Initialize Firestore
const db = getFirestore(app);

export function useMissionData() {
  const [tasks, setTasks] = useState<Task[]>([]); // Initialize tasks as an empty array
  const [missions, setMissions] = useState<Mission[]>([]); // Initialize with empty array
  const [systemStatus, setSystemStatus] = useState<SystemStatus[]>([]); // Initialize with empty array
  const [alerts, setAlerts] = useState<Alert[]>([]); // Initialize with empty array
  const [trackedTasks, setTrackedTasks] = useState<Task[]>([]);

  // Move the initial console.log inside the function
  console.log("🔄 useMissionData hook:", {
    tasksCount: tasks.length,
    trackedTasksCount: trackedTasks.length,
    trackedTaskIds: trackedTasks.map((t) => t.id),
  })

  // Set up real-time listener for tasks
  useEffect(() => {
    console.log("Setting up Firestore listener for tasks...");
    const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
      const tasksData = snapshot.docs.map(doc => ({
        _id: doc.id,
        get id() {
          return this._id;
        },
        set id(value) {
          this._id = value;
        },
        ...doc.data() as Task // Cast data to Task type
      }));
      console.log("Fetched tasks from Firestore:", tasksData.length);
      setTasks(tasksData);
    }, (error) => {
      console.error("Error fetching tasks from Firestore:", error);
    });; // Add semicolon here
    // Cleanup function 
    return () => {
      console.log("Cleaning up Firestore listener for tasks...");
      unsubscribe();
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  // Modify updateTaskStatus, addTask, deleteTask to interact with Firestore (Optional for now, can be done later)
  // For now, let's focus on fetching and displaying

  const updateTaskStatus = (taskId: string, status: Task["status"]) => {
    // You would typically update Firestore here as well
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, status, updatedAt: new Date().toISOString() } : task)),
    )
    // Also update in tracked tasks
    setTrackedTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, status, updatedAt: new Date().toISOString() } : task)),
    )
  }

  const addTask = (newTask: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    // This function is likely called from TaskBoard after successfully adding to Firestore
    // We don't need to manually add to local state here because onSnapshot will handle it
    console.log("addTask in hook called, but onSnapshot handles state update.");
  }

  const deleteTask = (taskId: string) => {
    // You would typically delete from Firestore here as well
    setTasks((prev) => prev.filter((t) => t.id !== taskId))
    setTrackedTasks((prev) => prev.filter((t) => t.id !== taskId))
  }

  // Move the tracking functions inside the function
  const trackTask = (taskId: string) => {
    console.log("📌 Tracking task:", taskId)
    const task = tasks.find((t) => t.id === taskId)
    if (task && !trackedTasks.find((t) => t.id === taskId)) {
      setTrackedTasks((prev) => [...prev, task])
    }
  }

  const untrackTask = (taskId: string) => {
    console.log("📌 Untracking task:", taskId)
    setTrackedTasks((prev) => prev.filter((t) => t.id !== taskId))
  }

  const isTaskTracked = (taskId: string) => {
    return trackedTasks.some((t) => t.id === taskId)
  }

  // Add the acknowledgeAlert function declaration
  const acknowledgeAlert = (alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, acknowledged: true } : alert)))
  }

  // Remove simulate real-time updates for tasks (as Firestore provides it)
  // useEffect(() => { ... }, []); // Remove this useEffect for tasks

  return {
    tasks, // This will now contain data from Firestore
    missions,
    systemStatus,
    alerts,
    trackedTasks,
    trackTask,
    untrackTask,
    isTaskTracked,
    updateTaskStatus,
    addTask, // Keep for now, but its role might change
    deleteTask, // Keep for now, but its role might change
    acknowledgeAlert,
  }
}
