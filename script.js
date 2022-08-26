let tasks = []
const done = []


const toggle = (e) => {
    if(e.id === "tab-1"){
        document.getElementById("tab-1").classList.add("active")
        document.getElementById("content-1").classList.add("active")
        document.getElementById("tab-2").classList.remove("active")
        document.getElementById("content-2").classList.remove("active")
    }else{
        document.getElementById("tab-2").classList.add("active")
        document.getElementById("content-2").classList.add("active")
        document.getElementById("tab-1").classList.remove("active")
        document.getElementById("content-1").classList.remove("active")
        loadDoneTasks()
    }
}

const clearFields = () => {
    document.getElementById("task").value = ""
    document.getElementById("time").value = ""
}

const addTask = () => {
    const title = document.getElementById("task").value
    const time = document.getElementById("time").value
    tasks.push({
        id: tasks.length,
        title: title,
        time: time,
    })
    clearFields()
    loadTasks();
}

const deleteTask = (id) => {
    tasks = tasks.filter(task => task.id != id);
    loadTasks()
}

const completeTask = (id) => {
    const completedTask = tasks.find(task => task.id == id)
    done.push(completedTask)
    deleteTask(id)
    loadTasks()
}


const createTaskElement = (title, time, id) => {
    const newTitle = document.createElement("span");
    const newTime = document.createElement("span")
    newTitle.setAttribute("class", "task__content-title");
    newTime.setAttribute("class", "task__content-time");
    newTitle.innerText = title
    newTime.innerText = time

    const taskContent = document.createElement("div");
    taskContent.setAttribute("class", "task__content")
    taskContent.appendChild(newTime)
    taskContent.appendChild(newTitle)

    const checkImage = document.createElement("img");
    checkImage.setAttribute("onclick", `completeTask(${id})`)
    checkImage.setAttribute("src", "/images/check.png");

    const taskContentWrapper = document.createElement('div')
    taskContentWrapper.setAttribute("class", "task__content-wrapper")

    taskContentWrapper.appendChild(checkImage)
    taskContentWrapper.appendChild(taskContent)

    const task = document.createElement('div')
    task.setAttribute("class", "task")
    const trashImage = document.createElement("img");
    trashImage.setAttribute("onclick", `deleteTask(${id})`)
    trashImage.setAttribute("src", "/images/trash.png");

    task.appendChild(taskContentWrapper)
    task.appendChild(trashImage)

    return task
}

const createDoneTaskElement = (title) => {
    const newTitle = document.createElement("span");
    newTitle.setAttribute("class", "task__content-title");
    newTitle.innerText = title
    const taskContent = document.createElement("div");
    taskContent.setAttribute("class", "task__content")
    taskContent.appendChild(newTitle)

    const checkImage = document.createElement("img");
    checkImage.setAttribute("src", "/images/check.png");


    const taskContentWrapper = document.createElement('div')
    taskContentWrapper.setAttribute("class", "task__content-wrapper")
    taskContentWrapper.appendChild(checkImage)
    taskContentWrapper.appendChild(taskContent)

    const task = document.createElement('div')
    task.setAttribute("class", "task")
    task.appendChild(taskContentWrapper)
    return task
}

const loadTasks = () => {
    document.getElementById("content-1").innerHTML = ""   
    tasks.forEach(task => {
        document.getElementById("content-1").appendChild(createTaskElement(task.title, task.time, task.id))
    })
}


const loadDoneTasks = () => {
    document.getElementById("content-2").innerHTML = ""
    done.forEach(task => {
        document.getElementById("content-2").appendChild(createDoneTaskElement(task.title))
    })
}