// Import dayjs and the customParseFormat plugin for flexible date parsing
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';


dayjs.extend(customParseFormat);


export class Task {
    /**
     * Constructs a new Task object.
     * 
     * @param {string} taskTitle - The title of the task.
     * @param {string} taskBody - The detailed description or body of the task.
     * @param {string|Date} dueDate - The due date in a supported format.
     * @param {Date} [creationDate=new Date()] - The date the task was created.
     * @param {boolean} [isDone=false] - Whether the task is completed.
     */
    constructor(taskTitle, taskBody, dueDate, creationDate = new Date(), isDone = false) {
        this.creationDate  = dayjs(creationDate).format('DD.MM.YYYY');
        this.taskTitle = taskTitle;
        this.taskBody  = taskBody;
        this.dueDate   = dayjs(dueDate, ['DD.MM.YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD', 'DD-MM-YYYY'], true);
        
        if (!this.dueDate.isValid()) {
            throw new Error('Invalid due date format !');
        }

        this.isDone = isDone;
    }


    /**
     * Returns true if the task is overdue (not done and past due date).
     * @returns {boolean} True if overdue, false otherwise.
     */
    isOverdue() {
        return !this.isDone && new Date() > new Date(this.dueDate);
    }

    
    /**
     * Getter for the task's completion status.
     *
     * @returns {boolean} True if the task is finished; otherwise, false.
     */
    get finished() {}
    set finished(state) {}    

    
    /**
     * Returns a string representation of the Task object
     * showing its completion status, title, and due date.
     * @returns {string} String describing the task
     */
    toString() {
        return `📝 Title: ${this.taskTitle} | 📅 Due: ${this.dueDate.format('DD.MM.YYYY')} ${this.isOverdue() ? 'OVERDUE ⏰❗' : '🕒'}| Status: ${this.isDone ? '✅ Done' : '❌ Not Done'}`;
    }


    /**
     * Converts the current task object into a JSON string.
     * Includes the task title, task description/body, creation date, and due date.
     *
     * @returns {string} JSON string representation of the task.
     */
    toJson() {
        return JSON.stringify({
            'taskTitle':    this.taskTitle,
            'taskBody':     this.taskBody,
            'creationDate': this.creationDate,
            'dueDate':      this.dueDate.format('DD.MM.YYYY'),
            'isDone':       this.isDone
        });
    }


    /**
     * Creates a new Task instance from a JSON string.
     *
     * @param {string} jsonTask - A JSON-formatted string representing a Task object.
     * @returns {Task} A new Task instance populated with data from the JSON string.
     *
     * @throws {SyntaxError} If the input string is not valid JSON.
     * @throws {Error} If the JSON does not contain all required Task properties.
     */
    static fromJson(taskJson) {
        // Define the list of required properties for a valid Task
        const propertyList = ['creationDate', 'taskTitle', 'taskBody', 'dueDate', 'isDone'];

        // Check if all properties in the parsed object are in the required list
        const hasMatchingProperties = propertyList.every(key => key in taskJson);

        if (hasMatchingProperties) {
            // If all required properties are present, create and return a new Task instance
            return new Task(
                taskJson.taskTitle,
                taskJson.taskBody,
                taskJson.dueDate,
                taskJson.creationDate,
                taskJson.isDone
            );
        } else {
            // If required properties are missing, throw an error
            throw new Error(
                'JSON task passed to Task.fromJson is missing needed properties.\n' +
                `${propertyList.toString()} are required properties.`
            );
        }
    }
    
}
