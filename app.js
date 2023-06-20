document.getElementById("task-form").addEventListener("submit", function(event) {
    event.preventDefault();
    addTask();
  });
  
  function addTask() {
    const tIp = document.getElementById("task-input");
    const tText = tIp.value.trim();
    tIp.value = "";
  
    if (tText === "") {
      return;
    }
  
    const tItem = create(tText);
    const ptl = document.getElementById("pending-tasks-list");
    ptl.appendChild(tItem);
  }
  
  function create(tText) {
    const tItem = document.createElement("li");
    const taskCheckbox = document.createElement("input");
    const taskLabel = document.createElement("label");
    const taskTimestamp = document.createElement("span");
    const deleteButton = document.createElement("button");
    const moreContent = document.createElement("span");

    taskCheckbox.type = "checkbox";
    taskCheckbox.addEventListener("change", function() {
      updateTaskStatus(tItem, taskCheckbox.checked);
    });
  
    taskLabel.textContent = tText;
  
    const timestamp = new Date();
    const timestampText = formatTimestamp(timestamp);
    taskTimestamp.textContent = `\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 Added at: ${timestampText} \xa0\xa0\xa0\xa0\xa0 `;
  
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function() {
      deleteTask(tItem);
    });

    moreContent.textContent = ` <br><br><br> `;
  
    tItem.appendChild(taskCheckbox);
    tItem.appendChild(taskLabel);
    tItem.appendChild(taskTimestamp);
    tItem.appendChild(deleteButton);
  
    return tItem;
  }
  
  function formatTimestamp(timestamp) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return timestamp.toLocaleDateString(undefined, options);
  }
  
  function updateTaskStatus(tItem, isCompleted) {
    const ptl = document.getElementById("pending-tasks-list");
    const completedTasksList = document.getElementById("completed-tasks-list");
  
    const timestamp = new Date();
    const timestampText = formatTimestamp(timestamp);
    const taskTimestamp = tItem.querySelector("span");
    taskTimestamp.textContent = `\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 Completed at: ${timestampText} \xa0\xa0\xa0\xa0\xa0`;
  
    if (isCompleted) {
      tItem.classList.add("completed-task");
      completedTasksList.appendChild(tItem);
    } else {
      tItem.classList.remove("completed-task");
      ptl.appendChild(tItem);
    }
  }
  
  function deleteTask(tItem) {
    tItem.remove();
  }
  