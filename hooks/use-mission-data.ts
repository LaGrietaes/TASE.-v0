"use client"

import { useState, useEffect, useCallback } from "react"
import type { Task, Mission, SystemStatus, Alert } from "@/lib/types"

import { getFirestore, collection, onSnapshot, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore"; // Import necessary Firestore functions
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

  // Add a new task to Firestore
  const addTask = async (taskData: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    try {
      console.log("Adding task to Firestore:", taskData);
      const tasksCollection = collection(db, "tasks");
      const docRef = await addDoc(tasksCollection, {
        ...taskData,
        createdAt: new Date().toISOString(), // Or use serverTimestamp()
        updatedAt: new Date().toISOString(), // Or use serverTimestamp()
      });
      console.log("Task successfully added to Firestore with ID:", docRef.id);
      // onSnapshot listener will handle updating the local state
    } catch (error) {
      console.error("Error adding task to Firestore:", error);
      throw error; // Re-throw the error so it can be caught in handleSaveEdit
    }
  };

  const updateTask = async (taskId: string, taskData: Partial<Task>) => {
    try {
      console.log("Updating task in Firestore:", taskId, taskData);
      const taskRef = doc(db, "tasks", taskId); // Get a reference to the specific task document
      await updateDoc(taskRef, taskData); // Update the document with the provided data
      console.log("Task successfully updated in Firestore:", taskId);
      // onSnapshot listener will handle updating the local state
    } catch (error) {
      console.error("Error updating task in Firestore:", error);
      throw error; // Re-throw the error
    }
  };


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
    updateTask, // Expose the new updateTask function

  };
  }

