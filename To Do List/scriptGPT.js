// Function to create a task element
function createTaskElement(taskText, isChecked) {
    const taskDiv = document.createElement('div');
    taskDiv.id = `${taskText}Div`;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isChecked;
    checkbox.addEventListener('change', () => showStrikeX(checkbox));

    const label = document.createElement('label');
    label.textContent = taskText;
    label.style.textDecoration = isChecked ? 'line-through' : 'none';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✖';
    deleteBtn.style.display = isChecked ? 'inline' : 'none';
    deleteBtn.addEventListener('click', () => taskDiv.remove());

    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(label);
    taskDiv.appendChild(deleteBtn);

    return taskDiv;
}

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const taskList = document.getElementById('taskList');
        const taskElement = createTaskElement(taskText, false);
        taskList.appendChild(taskElement);
        taskInput.value = '';
    }
}

// Function to update the style of a task when checkbox is checked/unchecked
function showStrikeX(checkbox) {
    const taskLabel = checkbox.nextElementSibling;
    const deleteBtn = taskLabel.nextElementSibling;

    taskLabel.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
    deleteBtn.style.display = checkbox.checked ? 'inline' : 'none';
}

// Function to filter tasks that start with the specified text
function start() {
    const startsWithInput = document.getElementById('startsWith');
    const tasks = document.querySelectorAll('#taskList label');

    tasks.forEach(taskLabel => {
        const taskDiv = taskLabel.parentElement;
        taskDiv.style.display = taskLabel.textContent.startsWith(startsWithInput.value) ? 'block' : 'none';
    });
}

// Function to filter tasks that contain the specified text
function contain() {
    const containsInput = document.getElementById('contains');
    const tasks = document.querySelectorAll('#taskList label');

    tasks.forEach(taskLabel => {
        const taskDiv = taskLabel.parentElement;
        taskDiv.style.display = taskLabel.textContent.includes(containsInput.value) ? 'block' : 'none';
    });
}

// Function to save tasks to sessionStorage
function save() {
    const tasksInfo = [];
    const tasks = document.querySelectorAll('#taskList div');

    tasks.forEach(taskDiv => {
        const taskLabel = taskDiv.querySelector('label');
        const checkbox = taskDiv.querySelector('input');

        tasksInfo.push({
            taskText: taskLabel.textContent,
            isChecked: checkbox.checked
        });
    });

    window.sessionStorage.setItem('tasksInfo', JSON.stringify(tasksInfo));
}

// Function to load tasks from sessionStorage
function load() {
    const tasksInfo = JSON.parse(window.sessionStorage.getItem('tasksInfo'));

    if (tasksInfo) {
        const taskList = document.getElementById('taskList');

        tasksInfo.forEach(({ taskText, isChecked }) => {
            const taskElement = createTaskElement(taskText, isChecked);
            taskList.appendChild(taskElement);
        });
    }
}



// Event listeners
document.getElementById('addTaskBtn').addEventListener('click', addTask);
document.getElementById('startsWith').addEventListener('keyup', start);
document.getElementById('contains').addEventListener('keyup', contain);
document.getElementById('saveBtn').addEventListener('click', save);
document.getElementById('loadBtn').addEventListener('click', load);
