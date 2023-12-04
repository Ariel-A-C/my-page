function insertTask() {
  const taskList = document.getElementById('tasks');
  const taskValue = document.getElementById('task').value.trim();

  if (taskValue !== '') {
      const template = document.getElementById('taskTemplate');
      const clone = document.importNode(template.content, true);

      const label = clone.querySelector('label');
      label.textContent = taskValue;

      taskList.appendChild(clone);
      document.getElementById('task').value = '';
  }
}

function showStrikeX(checkbox) {
  const label = checkbox.parentElement.querySelector('label');
  const deleteBtn = checkbox.parentElement.querySelector('button');

  label.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
  deleteBtn.style.display = checkbox.checked ? 'inline' : 'none';
}

function removeTask(taskElement) {
  taskElement.remove();
}

function start() {
  const inputStartsWith = document.getElementById('startsWith').value.toLowerCase();
  const tasks = document.querySelectorAll('#tasks div');

  tasks.forEach(task => {
      const label = task.querySelector('label');
      const taskText = label.textContent.toLowerCase();
      task.style.display = taskText.startsWith(inputStartsWith) ? 'block' : 'none';
  });
}

function contain() {
  const inputContains = document.getElementById('contains').value.toLowerCase();
  const tasks = document.querySelectorAll('#tasks div');

  tasks.forEach(task => {
      const label = task.querySelector('label');
      const taskText = label.textContent.toLowerCase();
      task.style.display = taskText.includes(inputContains) ? 'block' : 'none';
  });
}

function save() {
  const tasksInfo = [];
  const tasks = document.querySelectorAll('#tasks div');

  tasks.forEach(task => {
      const label = task.querySelector('label');
      const checkbox = task.querySelector('input');

      tasksInfo.push({
          taskText: label.textContent,
          isChecked: checkbox.checked
      });
  });

  window.sessionStorage.setItem('tasksInfo', JSON.stringify(tasksInfo));
}

function load() {
  const tasksInfo = JSON.parse(window.sessionStorage.getItem('tasksInfo'));

  if (tasksInfo) {
      const taskList = document.getElementById('tasks');
      const template = document.getElementById('taskTemplate');

      tasksInfo.forEach(({ taskText, isChecked }) => {
          const clone = document.importNode(template.content, true);
          const label = clone.querySelector('label');
          const checkbox = clone.querySelector('input');
          const deleteBtn = clone.querySelector('button');

          label.textContent = taskText;
          checkbox.checked = isChecked;
          label.style.textDecoration = isChecked ? 'line-through' : 'none';
          deleteBtn.style.display = isChecked ? 'inline' : 'none';

          taskList.appendChild(clone);
      });
  }
}
