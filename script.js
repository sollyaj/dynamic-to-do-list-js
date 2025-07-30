
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Initialize tasks array
    let tasks = [];

    // Load saved tasks from Local Storage
    function loadTasks() {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
            tasks.forEach(task => {
                createTaskElement(task);
            });
        }
    }

    // Save tasks to Local Storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Create and add a task element to the DOM
    function createTaskElement(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn');

        removeBtn.onclick = () => {
            // Remove from DOM
            taskList.removeChild(li);

            // Remove from tasks array and update localStorage
            tasks = tasks.filter(task => task !== taskText);
            saveTasks();
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

    // Handle adding a new task
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Add to task array, update storage, and display
        tasks.push(taskText);
        saveTasks();
        createTaskElement(taskText);

        taskInput.value = "";
    }

    // Event listener for Add button
    addButton.addEventListener('click', addTask);

    // Allow adding task with Enter key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks on page load
    loadTasks();
});
