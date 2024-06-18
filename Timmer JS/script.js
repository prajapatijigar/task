let itemCount = 0;

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value.trim();

    if (task === "") {
        alert("Please enter a task.");
        return;
    }

    itemCount++;

    const table = document.getElementById('taskTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.innerHTML = `
        <td>${itemCount}</td>
        <td>${task}</td>
        <td>
            <button onclick="startTimer(this)">Start</button> 
            <button onclick="deleteRow(this)">Delete</button>
        </td>
        <td><span>00:00:00</span><button onclick="stopTimer(this)">Stop</button></td>
    `;

    taskInput.value = "";
}

function startTimer(button) {
    const row = button.parentElement.parentElement;
    const timerCell = row.cells[3].querySelector('span');
    let [hours, minutes, seconds] = timerCell.textContent.split(":").map(Number);
     button.disabled = false

    const interval = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
        timerCell.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }, 1000);

    button.disabled = true; // Disable the start button once the timer starts
    button.dataset.intervalId = interval;
}

function stopTimer(button) {
    const row = button.parentElement.parentElement;
    const startButton = row.querySelector('button[onclick^="startTimer"]');
    const intervalId = startButton.dataset.intervalId;

    if (intervalId) {
        clearInterval(intervalId);
        delete startButton.dataset.intervalId;
        startButton.disabled = false; // Enable the start button when the timer stops
    }
}

function deleteRow(button) {
    const row = button.parentElement.parentElement;
    const startButton = row.querySelector('button[onclick^="startTimer"]');
    const intervalId = startButton.dataset.intervalId;

    if (intervalId) {
        clearInterval(intervalId);
    }

    row.remove();
    updateItemNumbers();
}


function pad(num) {
    return String(num).padStart(2, '0');
}
