const STORAGE_KEY = "taskflow.tasks";
const seedTasks = [
  { id: crypto.randomUUID(), title: "Sketch the first version", category: "Work", done: true },
  { id: crypto.randomUUID(), title: "Choose a calmer color palette", category: "Learning", done: false },
  { id: crypto.randomUUID(), title: "Take a proper screen break", category: "Wellness", done: false }
];

const form = document.querySelector("#task-form");
const titleInput = document.querySelector("#task-title");
const categoryInput = document.querySelector("#task-category");
const filterInput = document.querySelector("#task-filter");
const list = document.querySelector("#task-list");
const emptyState = document.querySelector("#empty-state");

let tasks = loadTasks();

function loadTasks() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try { return JSON.parse(saved); } catch { localStorage.removeItem(STORAGE_KEY); }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seedTasks));
  return seedTasks;
}

function saveTasks() { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); }

function render() {
  const filter = filterInput.value;
  const visible = tasks.filter((task) => filter === "all" || (filter === "done" ? task.done : !task.done));
  list.innerHTML = visible.map((task) => `
    <article class="task-item ${task.done ? "completed" : ""}" data-id="${task.id}">
      <input class="task-check" type="checkbox" ${task.done ? "checked" : ""} aria-label="Mark ${escapeHtml(task.title)} complete" data-action="toggle" />
      <div><p class="task-title">${escapeHtml(task.title)}</p><span class="task-meta">${escapeHtml(task.category)} · ${task.done ? "Done" : "In progress"}</span></div>
      <div class="task-actions"><button class="icon-button" type="button" title="Edit task" data-action="edit">✎</button><button class="icon-button" type="button" title="Delete task" data-action="delete">×</button></div>
    </article>`).join("");
  emptyState.hidden = visible.length > 0;
  document.querySelector("#visible-count").textContent = visible.length;
  document.querySelector("#total-count").textContent = tasks.length;
  document.querySelector("#open-count").textContent = tasks.filter((task) => !task.done).length;
  document.querySelector("#done-count").textContent = tasks.filter((task) => task.done).length;
}

function escapeHtml(value) { return value.replace(/[&<>'"]/g, (char) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "'":"&#39;", '"':"&quot;" }[char])); }

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = titleInput.value.trim();
  if (!title) return;
  tasks.unshift({ id: crypto.randomUUID(), title, category: categoryInput.value, done: false });
  saveTasks(); render(); form.reset(); titleInput.focus();
});

filterInput.addEventListener("change", render);

list.addEventListener("click", (event) => {
  const action = event.target.dataset.action;
  if (!action) return;
  const item = event.target.closest(".task-item");
  const task = tasks.find((entry) => entry.id === item.dataset.id);
  if (!task) return;
  if (action === "toggle") task.done = !task.done;
  if (action === "delete") tasks = tasks.filter((entry) => entry.id !== task.id);
  if (action === "edit") {
    const nextTitle = window.prompt("Update task title", task.title);
    if (nextTitle?.trim()) task.title = nextTitle.trim();
  }
  saveTasks(); render();
});

render();
