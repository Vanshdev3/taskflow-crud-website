# Taskflow CRUD Website

Taskflow is a small responsive task manager built with basic HTML, CSS, and vanilla JavaScript. It demonstrates the four CRUD operations with browser `localStorage` as a lightweight data store.

## Features

- Create tasks with a title and category.
- Read and filter tasks by status.
- Update task titles, or mark tasks complete.
- Delete tasks from the list.
- Responsive layout for desktop and mobile.

## Run locally

Open `index.html` in a browser. No build step or dependencies are required.

## CRUD mapping

| Operation | Implementation |
| --- | --- |
| Create | Form submission adds a task to the array and localStorage |
| Read | `render()` reads the current task list into the page |
| Update | Checkbox and edit actions modify a task in place |
| Delete | Delete action removes a task from the array |
