import { readfile, writeFile, access, constants} from 'fs/promises';
import { strings } from './globalData';
import readline from 'readline/promises';


export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


async function checkFileExists(path) {
    try {
        await access(path, constants.F_OK);
        return true;
    } catch (error) {
        return false;
    }
}


function checkValidJsonFormat(data) {
    try {
        JSON.parse(data);
        return true;
    } catch (e) {
        return false;
    }
}

export async function readJsonFile(path=strings.tasksJsonPath) {
    if (!checkFileExists(path)) {
        throw new Error("File path doesn't exists");
    }
    const data = await readfile(path, 'utf-8');
    return JSON.parse(data);
}


export async function writeTaskToFile(path=strings.tasksJsonPath, data) {
    if (!checkFileExists(path)) {
        throw new Error("File path doesn't exists");
    }
    if (!checkValidJsonFormat(data)) {
        throw new Error("Data passed to function is not in valid Json format.");
    }
    
    let jsonArray = readJsonFile(path);
    jsonArray.push(data);
    try {
        await writeFile(path, JSON.stringify(jsonArray, null, 2), 'utf-8');
    } catch (error) {
        throw new Error(`Couldn't write to ${path}`);
    }
}


export function listTasksToString(tasks) {
    if ( 
        typeof tasks !== "object" ||
        tasks === null ||
        Array.isArray(tasks)
    ) {
        throw new Error("Wrong data type had been passed to the function.");
    }

    return Object.values(tasks).map((task, number) => `${number} - ${task}`).join('\n');
}