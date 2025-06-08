// Import shared strings (e.g. prompts and paths) from a global config file
import { strings } from "./globalData.js";

// Import helper functions and readline interface from the utilities module
import { 
    writeTaskToFile,           // Writes a new task to the JSON file
    listTasksToString,         // Converts available task options into a formatted string
    rl,                        // Readline interface for user input
    readJsonFile,              // Reads and parses the JSON file
    waitForEnterPress,         // Utility to pause until Enter is pressed
    removeTask,                // Removes a task from the JSON file
    isNumberInput              // Validates whether input is a number
} from "./utils.js";


// Main menu loop for interacting with the user
export async function mainMenu() {
    mainMenu: while (true) {
        console.clear(); // Clear console screen
        console.log(strings.promptScreensText.welcomePrompt); // Show welcome message

        // List available menu options
        console.log(listTasksToString(strings.availableTasks));

        try {
            // Prompt user to select an option
            let option = await rl.question(`> `);

            // Handle user input based on the selected option
            switch(+option.trim()) {
                case 1:
                    await addTaskPrompt(); // Add a task
                    break;
                case 2:
                    await removeTasksPrompt(); // Remove a task
                    break;
                case 3:
                    await listTasksPrompt(); // List all tasks
                    await waitForEnterPress(); // Wait for user to continue
                    break;
                case 4:
                    rl.close(); // Close readline and exit loop
                    break mainMenu;
                default:
                    console.log(strings.promptScreensText.invalidInput); // Handle invalid input
                    await waitForEnterPress();
            }

        } catch (error) {
            // Catch any unexpected errors
            console.error("Error in mainMenu:", error);
            await waitForEnterPress();
        }
    }
}


// Lists all current tasks from the JSON file
export async function listTasksPrompt(path = strings.tasksJsonPath) {
    console.clear(); // Clear the screen
    console.log(strings.promptScreensText.listTasksPrompt); // Show list prompt

    const tasks = await readJsonFile(path); // Read the current task list

    // If no tasks are found return false
    if (!tasks.length) {
        console.error('There aren\'t any tasks written');
        return false;
    }

    // Print each task with its corresponding number
    for (let task = 0; task < tasks.length; task++) {
        console.log(`${task + 1} - ${tasks[task].task}`);
    }
    // Return true if the function had found tasks.
    return true;
}


// Prompts the user to remove a task
export async function removeTasksPrompt(path = strings.tasksJsonPath) {
    while (true) {
        console.clear(); // Clear screen for clean output
        
        // Show current tasks if tasks are found
        if (await listTasksPrompt()) { 
            console.log(strings.promptScreensText.taskPrompt); // Ask for task to remove

            let taskNumber = await rl.question("Task number: "); // Get user input

            // Validate that the input is a number
            if (!isNumberInput(taskNumber)) {
                console.error('Please enter a valid task number');
                await waitForEnterPress();
                continue;
            }

            // Remove the task and confirm
            await removeTask(strings.tasksJsonPath, taskNumber); 
        }

        await waitForEnterPress();
        break;
    }
}


// Prompts the user to add a task
export async function addTaskPrompt() {
    while (true) {
        console.clear(); // Clear screen
        console.log(strings.promptScreensText.taskPrompt); // Prompt for task input

        let task = await rl.question("Task: "); // Read task input from user

        writeTaskToFile(strings.tasksJsonPath, task); // Save task to file
        console.log(strings.promptScreensText.taskSuccess); // Confirm save

        // Ask if user wants to add another task
        let option = await rl.question(strings.promptScreensText.addAnotherTask);
        
        // Continue or break based on input
        if (option === 'y') {
            continue;
        } else if (option === 'n') {
            break;
        }

        // TODO: Move 'y/n' input validation to a separate utility function
    }
}
