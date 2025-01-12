const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You must input task!");
        return;
    }

    fetch('addTask.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `task=${encodeURIComponent(inputBox.value)}`
    }).then(response => response.text())
      .then(() => {
          inputBox.value = '';
          loadTasks();
      });
}

function loadTasks() {
    fetch('getTasks.php')
        .then(response => response.json())
        .then(data => {
            listContainer.innerHTML = '';
            data.forEach(task => {
                const li = document.createElement("li");
                li.textContent = task.task;
                li.dataset.id = task.id;

                const deleteSpan = document.createElement("span");
                deleteSpan.textContent = "\u00d7";
                deleteSpan.classList.add("delete");
                li.appendChild(deleteSpan);

                const editSpan = document.createElement("span");
                editSpan.textContent = "\u270E";
                editSpan.classList.add("edit");
                li.appendChild(editSpan);

                listContainer.appendChild(li);
            });
        });
}

listContainer.addEventListener("click", function (e) {
    const id = e.target.parentElement.dataset.id;

    if (e.target.classList.contains("delete")) {
        fetch('deleteTask.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `id=${id}`
        }).then(() => loadTasks());
    } else if (e.target.classList.contains("edit")) {
        const newTask = prompt("Edit your task:", e.target.parentElement.textContent);
        if (newTask !== null) {
            fetch('editTask.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `id=${id}&task=${encodeURIComponent(newTask)}`
            }).then(() => loadTasks());
        }
    }
});

document.addEventListener("DOMContentLoaded", loadTasks);
