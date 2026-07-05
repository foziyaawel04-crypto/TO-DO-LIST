let tasks = [];
const input = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const remainingCount = document.getElementById('remainingCount');
const errorMsg = document.getElementById('errorMsg');
const addBtn = document.getElementById('addBtn');
const clearBtn = document.getElementById('clearBtn');
const allDoneMsg = document.getElementById('allDoneMsg');

// Function to display the list
function displayTasks() {
  let html = "";
  let remaining = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (!tasks[i].done) {
      remaining++;
    }
    let liClass = tasks[i].done ? "task-item done" : "task-item";

    html += `<li class="${liClass}">
              <span class="task-text">${tasks[i].text}</span>
              <button class="done-btn" onclick="toggleTask(${i})">Done</button>
              <button class="delete-btn" onclick="removeTask(${i})">x</button>
            </li>`;
  }
  taskList.innerHTML = html;
  
  // ቆጣሪውን በገጹ ላይ ማደስ
  remainingCount.innerText = remaining;

  // ሁሉም ታስኮች ካለቁ የበዓል መልእክት ማሳየት
  if (tasks.length > 0 && remaining === 0) {
    allDoneMsg.classList.add('visible');
  } else {
    allDoneMsg.classList.remove('visible');
  }
}
// Function to Add a task
function addTask() {
  
  let text = input.value.trim();
  if (text === "") {
    errorMsg.innerText = "Please type a task first";
    return;
  }
  errorMsg.innerText = "";
  tasks.push({ text: text, done: false });
  input.value = "";
  saveTasks();
  displayTasks();
}
function toggleTask(i) {
  tasks[i].done = !tasks[i].done; // true የነበረውን false, false የነበረውን true ያደርገዋል
  saveTasks();
  displayTasks();
}
// Function to Remove a task
function removeTask(i) {
  tasks.splice(i, 1);
  saveTasks();
  displayTasks();
}

// Function to Clear all tasks
function clearAll() {
  tasks = [];
  saveTasks();
  displayTasks();
}

// Function to Save tasks
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to Load tasks
function loadTasks() {
  let saved = localStorage.getItem("tasks");
  if (saved !== null) {
    tasks = JSON.parse(saved);
  }
}// 10. በተኖቹ ሲጫኑ ፈንክሽኖቹ እንዲሰሩ ማገናኘት (Event Listeners)
addBtn.addEventListener('click', addTask);
clearBtn.addEventListener('click', clearAll);

// BONUS: የቀለም መቀየሪያ ሎጂክ (Color Picker)
const colorCircles = document.querySelectorAll('.color-circle');
colorCircles.forEach(circle => {
  circle.addEventListener('click', () => {
    // አክቲቭ የሆነውን ክላስ ማንቀሳቀስ
    const currentActive = document.querySelector('.color-circle.active');
    if (currentActive) {
      currentActive.classList.remove('active');
    }
    circle.classList.add('active');
    
    // የበስተጀርባ ቀለሙን መቀየር
    document.body.style.backgroundColor = circle.dataset.color;
  });
});


// Load and display tasks when page loads
loadTasks();
displayTasks()
