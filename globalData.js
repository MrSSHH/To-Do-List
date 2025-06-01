/**
 * Centralized string constants for the To-Do List CLI App.
 * Helps maintain consistent messages and makes localization easy.
 */

import path from 'node:path';

export const strings = {
  // Absolute or relative path to the task data JSON file.
  tasksJsonPath: path.resolve('tasks.json'),

  // Text used in interactive prompts, warnings, confirmations, etc.
  promptScreensText: {
    welcomePrompt: "Welcome to the To-Do List app!",
    taskPrompt: "Please enter the desired task:",
    removeTaskPrompt: "Please select the task number to remove:",
    listTasksPrompt: "Current list of tasks:",
    exitAppPrompt: "Are you sure you want to exit? [y/n]",
    taskSuccess: "✅ Task added successfully!",
    taskRemove: "🗑️ Task removed successfully!",
    addAnotherTask: "Would you like to add another task? [y/n]",
    toContinue: "Press Enter to return to the main menu.",
    invalidInput: "⚠️ Invalid input. Please try again."
  },

  // Display names for available menu options
  availableTasks: {
    addTask: "➕ Add a task",
    removeTask: "🗑️ Remove a task",
    listTasks: "📋 List tasks",
    exitApp: "🚪 Exit"
  }
};
