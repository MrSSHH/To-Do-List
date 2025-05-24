import { strings } from "./globalData";
import { writeTaskToFile, listTasksToString, rl } from "./utils";


export async function mainMenu() {
    console.clear();
    console.log(strings.welcomeMsg);
    console.log(listTasksToString(strings.availableTasks));
    await rl.question(`Select: `, option => {
        switch(+option) {
            case 1:
                addTaskPrompt();
                break;
            case 2:
                break;
            case 3:
                break;
            default:
                console.log(strings.promptScreensText.invalidInput);
    
        }
    });
}


async function addTaskPrompt() {
    // Clear Console Screen
    console.clear();
    console.log(strings.promptScreensText.taskPrompt);
    await rl.question("Task: ", task => {
        writeTaskToFile(strings.tasksJsonPath, task);
        console.log(strings.promptScreensText.taskSuccess);
    
    });
    
    await rl.question(strings.promptScreensText.toContinue, option => {
        if (option === 'y') {
            addTaskPrompt();
        } else if (option === 'n') {
            mainMenu();
        }
    })
    
}