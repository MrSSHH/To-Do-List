"use strict"
import { mainMenu } from "./game.js";
import { createTasksFileIfNotExists } from "./utils.js";

await createTasksFileIfNotExists();
await mainMenu();