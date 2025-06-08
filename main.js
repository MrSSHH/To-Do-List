"use strict"
import { mainMenu } from "./src/game/game.js";
import { createTasksFileIfNotExists } from "./src/utils/utils.js";

await createTasksFileIfNotExists();
await mainMenu();