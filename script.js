document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage
    loadTasks();

    // Add task
    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const task = createTaskElement(taskText);
            taskList.appendChild(task);
            saveTasks();
            taskInput.value = '';
        }
    });

    // Create task element
    function createTaskElement(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            li.remove();
            saveTasks();
        });

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks();
        });

        li.appendChild(deleteButton);
        li.appendChild(completeButton);

        return li;
    }

    // Save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        const taskElements = document.querySelectorAll('li');
        taskElements.forEach(task => {
            tasks.push({
                text: task.textContent.replace('DeleteComplete', ''),
                completed: task.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const taskElement = createTaskElement(task.text);
            if (task.completed) {
                taskElement.classList.add('completed');
            }
            taskList.appendChild(taskElement);
        });
    }
});
