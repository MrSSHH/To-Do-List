# To‑Do List CLI 📋

![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

A minimal, **modular** command‑line to‑do list application written in modern JavaScript (ES Modules). It aims to be easy to extend, easy to read, and lightning‑fast for everyday task management directly from your terminal.

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
5. [Usage](#usage)
6. [Configuration](#configuration)
7. [Roadmap](#roadmap)
8. [Contributing](#contributing)
9. [License](#license)

---

## Features

* **Add / Remove / List** tasks from a persistent JSON store
* Human‑friendly prompts and confirmations
* Clean separation of concerns (I/O, business logic, data storage)
* Written with **`async/await`** for readability—no callback spaghetti 🍝
* Zero external dependencies; runs anywhere Node ≥ 18 is available

---

## Tech Stack

| Layer          | Technology                               |
| -------------- | ---------------------------------------- |
| Runtime        | [Node.js ≥ 18](https://nodejs.org/)      |
| Language       | Modern JavaScript (ES Modules)           |
| User Interface | `readline/promises` (native CLI prompts) |
| Data Storage   | Plain JSON file (`tasks.json`)           |

---

## Project Structure

```
/project-root
│
├── 📁 src/
│   ├── models/         # Domain models (classes like Task)
│   │   └── Task.js
│   │
│   ├── game/           # Game logic
│   │   └── game.js
│   │
│   ├── data/           # Static and global data
│   │   ├── globalData.js
│   │   └── tasks.json
│   │
│   ├── utils/          # Utility functions
│   │   └── utils.js
│   │
│   └── main.js         # App entry point
│
├── package.json
└── README.md
```

Each file is **self‑contained**. Replace or extend a module without touching the rest of the codebase.

```

Each file is **self‑contained**. Replace or extend a module without touching the rest of the codebase.

---

## Getting Started

### Prerequisites

* Node.js **18 or higher**
* Git (to clone the repo)

```bash
# Clone
git clone https://github.com/MrSSHH/To-Do-List.git
cd To-Do-List

# (Optional) Install dependencies – none required for core app
npm install
```

### Run locally

```bash
node main.js
```

> ℹ️ The first launch creates `tasks.json` automatically if it doesn’t exist.

---

## Usage

Below is a sample session (💬 user input in **bold**):

```
Welcome to the To-Do List app!
1 - ➕ Add a task
2 - 🗑️ Remove a task
3 - 📋 List tasks
4 - 🚪 Exit
> **1**
Please enter the desired task!
> **Buy groceries**
Task has been written successfully!
Would you like to add another task? [y/n]
> **n**
```

### Available Actions

| Option        | Description                                         |
| ------------- | --------------------------------------------------- |
| Add a task    | Prompt for a new task and append it to `tasks.json` |
| Remove a task | Choose an existing task to delete                   |
| List tasks    | Display all current tasks with indexes              |
| Exit          | Save & close the application                        |

---

## Configuration

All config lives in **`globaldata.js`**:

```js
export const strings = {
  tasksJsonPath: '/absolute/path/to/tasks.json',
  promptScreensText: { /* UI copy */ },
  availableTasks: { /* Menu labels */ }
};
```

* **Change `tasksJsonPath`** to relocate the task store.
* Edit `promptScreensText` to localize or tweak UI wording.

---

## Roadmap

* [ ] Unit tests with Vitest / Jest
* [ ] Import / export tasks to CSV
* [ ] Tag‑based filtering (e.g., `work`, `personal`)
* [ ] Due dates & reminders

Feel free to open issues or pull requests for new ideas! 🚀

---

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feat/awesome‑feature`
3. Commit your changes: `git commit -m "Add awesome feature"`
4. Push to the branch: `git push origin feat/awesome‑feature`
5. Open a Pull Request

Please follow the existing code style and include relevant unit tests when applicable.

---

## License

Distributed under the **MIT License**. See `LICENSE` for more information.
