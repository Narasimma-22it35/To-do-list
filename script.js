const alarmSound = new Audio('alarm.mp3');

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const timerInput = document.getElementById('taskTimer').value.trim();
    const taskText = taskInput.value.trim();

    if (taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        if (timerInput) {
            const timerDuration = parseInt(timerInput) * 60; // Convert minutes to seconds
            startTimer(li, timerDuration);
        }

        li.onclick = function () {
            this.classList.toggle('completed');
            if (this.classList.contains('completed')) {
                this.innerHTML += ' <span class="delete" onclick="deleteTask(event)">❌</span>';
                notifyCompletion(taskText); // Notify when completed
            } else {
                this.innerHTML = taskText; // Reset text when uncompleted
            }
        };

        document.getElementById('taskList').appendChild(li);
        taskInput.value = '';
        document.getElementById('taskTimer').value = '';
    }
}

function startTimer(li, duration) {
    const timerDisplay = document.createElement('span');
    timerDisplay.style.marginLeft = '10px';
    li.appendChild(timerDisplay);

    const interval = setInterval(() => {
        if (duration <= 0) {
            clearInterval(interval);
            timerDisplay.textContent = 'Time is up!';
            li.classList.add('completed'); // Mark task as completed
            li.innerHTML += ' <span class="delete" onclick="deleteTask(event)">❌</span>';
            notifyCompletion(li.textContent); // Notify when time is up
        } else {
            const minutes = Math.floor(duration / 60);
            const seconds = duration % 60;
            timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            duration--;
        }
    }, 1000);
}

function notifyCompletion(task) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = `Task Completed: "${task}"! 🎉`;
    document.body.appendChild(notification);
    
    alarmSound.play(); // Play the alarm sound

    setTimeout(() => {
        notification.remove();
    }, 3000); // Remove notification after 3 seconds
}

function deleteTask(event) {
    const li = event.target.parentElement;
    li.remove();
}
