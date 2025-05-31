/* ------------------------------------------------------------------
 * Utilities for the To-Do CLI
 * ------------------------------------------------------------------
 *  - File I/O helpers (read / write / remove tasks)
 *  - Readline interface for interactive prompts
 *  - Shared helpers (input validation, pause, etc.)
 * ------------------------------------------------------------------
 *  Uses Node-native ES-module APIs only — no external deps.
 * ------------------------------------------------------------------ */

import { readFile, writeFile, access, constants } from 'fs/promises';
import { stdin as input, stdout as output } from 'node:process';
import readline from 'readline/promises';
import path from 'node:path';
import { strings } from './globalData.js';

/* =========  Small Pure Helpers  ================================= */

/**
 * Wraps a string as the canonical task object stored in JSON.
 * @param {string} data - Raw task text from the user.
 * @returns {{ task: string }}
 */
function transformDataToJsonFormat(data) {
  return { task: data };
}

/**
 * Simple numeric input validator.
 * Converts to Number and checks for NaN.
 * @param {string} input
 * @returns {boolean}
 */
export function isNumberInput(input) {
  const num = Number(input);
  return !isNaN(num);
}

/* =========  Readline Interface  ================================= */

export const rl = readline.createInterface({ input, output });

/* =========  File Helper Functions  ============================== */

/**
 * Asynchronously confirm whether a file exists.
 * @param {string} path
 * @returns {Promise<boolean>}
 */
async function checkFileExists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

/**
 * Creates a new tasks.json file with optional initial content if it doesn't exists.
 * @param {string} file_loc - Path to the tasks.json file 
 * @param {string} content  - Initial content to write. Default is an empty array as json.
 */
export async function createTasksFileIfNotExists(file_loc=path.resolve('tasks.json'), content = '[]') {
    if (!checkFileExists(file_loc)) {
        await writeFile(file_loc, content, 'utf-8');
        strings.tasksJsonPath = file_loc;
        console.log('Created a tasks.json file since I couldn\'t find one');
    }
}


/**
 * Read and parse the JSON task file.
 * @param {string} [path=strings.tasksJsonPath]
 * @throws If the file does not exist or JSON.parse fails.
 */
export async function readJsonFile(path = strings.tasksJsonPath) {
  if (!(await checkFileExists(path))) {
    throw new Error("File path doesn't exist");
  }
  const data = await readFile(path, 'utf-8');
  return JSON.parse(data);
}

/**
 * Append a new task to the JSON file.
 * @param {string} [path=strings.tasksJsonPath]
 * @param {string} data - Raw task string.
 */
export async function writeTaskToFile(path = strings.tasksJsonPath, data) {
  if (!(await checkFileExists(path))) {
    throw new Error("File path doesn't exist");
  }

  const jsonArray = await readJsonFile(path);
  jsonArray.push(transformDataToJsonFormat(data));

  try {
    await writeFile(path, JSON.stringify(jsonArray, null, 2), 'utf-8');
  } catch {
    throw new Error(`Couldn't write to ${path}`);
  }
}

/**
 * Pause execution until the user presses Enter.
 */
export async function waitForEnterPress() {
  console.warn(strings.promptScreensText.toContinue);
  await rl.question('');
}

/**
 * Remove a task by 1-based index from the JSON file.
 * @param {string} [path=strings.tasksJsonPath]
 * @param {number|string} taskNumber - 1-based index provided by the user.
 */
export async function removeTask(path = strings.tasksJsonPath, taskNumber) {
  if (!(await checkFileExists(path))) {
    throw new Error("File path doesn't exist");
  }

  try {
    const tasks = await readJsonFile(path);
    const indexToRemove = Number(taskNumber) - 1; // Convert to 0-based

    if (indexToRemove < 0 || indexToRemove >= tasks.length) {
      console.error('Invalid task number');
      return;
    }

    tasks.splice(indexToRemove, 1); // Remove just one element
    await writeFile(path, JSON.stringify(tasks, null, 2), 'utf-8');
    console.log(strings.promptScreensText.taskRemove);
  } catch (err) {
    console.error('Error:', err);
  }
}

/**
 * Convert an object of tasks (menu labels) to a numbered list string.
 * @param {Record<string,string>} tasks - Object with human-readable menu entries.
 * @returns {string}
 */
export function listTasksToString(tasks) {
  if (typeof tasks !== 'object' || tasks === null || Array.isArray(tasks)) {
    throw new Error('Wrong data type passed to listTasksToString');
  }

  return Object.values(tasks)
    .map((task, idx) => `${idx + 1} - ${task}`)
    .join('\n');
}
