function insertTask() {
  let taskList = [];
  let taskValue = task.value;
  taskList.push(taskValue);
  tasks.innerHTML += `<div id="${taskValue}Div">
    <input type="checkbox" onchange="showStrikeX(this)" id="${taskValue}Input">
    <label>${taskValue}</label>
    <button onclick="this.parentElement.remove()" style="display:none">✖</button>
  </div>`;
  task.value = '';
}

function showStrikeX(X) {
  let taskLabel = X.parentElement.querySelector('label');
  let Xbtn = X.parentElement.querySelector('button');
  if (X.checked) {
    taskLabel.style.textDecoration = 'line-through';
    Xbtn.setAttribute('style', 'display: inline');
  } else {
    taskLabel.style.textDecoration = 'none';
    Xbtn.setAttribute('style', 'display: none');
  }
}

function start() {
  let inputStartsWith = document.getElementById('startsWith');
  let tasksStart = document.querySelectorAll('#tasks label');
  for (let i = 0; i < tasksStart.length; i++) {
    if (tasksStart[i].innerText.startsWith(inputStartsWith.value)) {
      tasksStart[i].parentElement.style.display = 'block';
    } else {
      tasksStart[i].parentElement.style.display = 'none';
    }
  }
}

function contain() {
  let inputContains = document.getElementById('contains');
  let tasksContain = document.querySelectorAll('#tasks label');
  for (let i = 0; i < tasksContain.length; i++) {
    if (tasksContain[i].innerText.indexOf(inputContains.value) > -1) {
      tasksContain[i].parentElement.style.display = 'block';
    } else {
      tasksContain[i].parentElement.style.display = 'none';
    }
  }
}

function save() {
  const tasksInfo = [];
  let tasks = document.querySelectorAll('#tasks div');
  for (let i = 0; i < tasks.length; i++) {
    let taskInfo = {
      taskText: tasks[i].querySelector('label').innerText,
      isChecked: tasks[i].querySelector('input').checked
    }
    tasksInfo.push(taskInfo);
  }
  window.sessionStorage.setItem('tasksInfo', JSON.stringify(tasksInfo));
}

function load() {
  let tasksInfo = JSON.parse(window.sessionStorage.getItem('tasksInfo'));

  if (tasksInfo != null) {
    for (let i = 0; i < tasksInfo.length; i++) {   
      let taskLabelStyle = '';
      let XbtnStyle = '';

      if (tasksInfo[i].isChecked) {
        taskLabelStyle = 'text-decoration: line-through';
        XbtnStyle = 'display: block'
      } else {
        taskLabelStyle = 'text-decoration: inline';
        XbtnStyle = 'display: none'
      }
     
      document.getElementById('tasks').innerHTML += `<div id="${tasksInfo[i].taskText}Div">
        <input type="checkbox" onchange="showStrikeX(this)" id="${tasksInfo[i].taskText}Input">
        <label style="${taskLabelStyle}">${tasksInfo[i].taskText}</label>
        <button onclick="this.parentElement.remove()" style="${XbtnStyle}">✖</button>
      </div>`;
    }
  }
}