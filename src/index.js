import "./index.css";
import logoImg from "./img/logo.png";

// Get current date

const currentDate = () => {
    const date = new Date();

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year  = String(date.getFullYear());

    return `${year}-${month}-${day}`;
};

// Array containing all data for tasks

let taskArray = [
    {id: 0, title: "Wash", des: "Clean the clothes", due: currentDate()},
];

const display = (() => {
    const getTop = document.getElementById("topCon");
    const getLeft = document.getElementById("leftCon");
    const getMain = document.getElementById("mainCon");

    // All DOM elements associated with top bar go under top function

    const top = () => {};

    // All DOM elements associated with left bar go under left function

    const left = () => {
        const leftTask = document.createElement("button");
        leftTask.className = "left";
        leftTask.id = "leftTask";
        leftTask.innerHTML = "Tasks";
        leftTask.addEventListener("click", (e) => task.changeMain(e, getMain));
        getLeft.appendChild(leftTask);

        const addTask = document.createElement("button");
        addTask.className = "left";
        addTask.id = "addTask";
        addTask.innerHTML = "Add Task";
        addTask.addEventListener("click", (e) => task.changeMain(e, getMain));
        getLeft.appendChild(addTask);
    };

    // All DOM elements associated with main bar go under main function

    const main = () => {
        const mainTask = () => {
            for(let i = 0; i < taskArray.length; i++){
                const mainTaskCon = document.createElement("div");
                mainTaskCon.className = "mainTaskCon";
                getMain.appendChild(mainTaskCon);
                
                    const mainTaskTitle = document.createElement("div");
                    mainTaskTitle.className = "mainTask";
                    mainTaskTitle.innerHTML = taskArray[i].title;
                    mainTaskCon.appendChild(mainTaskTitle);

                    const mainTaskDes = document.createElement("p");
                    mainTaskDes.className = "mainTask";
                    mainTaskDes.innerHTML = taskArray[i].des;
                    mainTaskCon.appendChild(mainTaskDes);

                    const mainTaskDue = document.createElement("div");
                    mainTaskDue.className = "mainTask";
                    mainTaskDue.innerHTML = taskArray[i].due;
                    mainTaskCon.appendChild(mainTaskDue);

                    const mainTaskRemove = document.createElement("button");
                    mainTaskRemove.className = "mainTask";
                    mainTaskRemove.innerHTML = `Remove${taskArray[i].id}`;
                    mainTaskRemove.value = parseInt(taskArray[i].id);
                    mainTaskRemove.addEventListener("click",(e) => task.removeTask(e, getMain));
                    mainTaskCon.appendChild(mainTaskRemove);
            };
        };

        // Add task through a form

        const addTask = () => {
            const addForm = document.createElement("form");
            addForm.className = "addTaskCon";
            getMain.appendChild(addForm);

                const addTitle = document.createElement("input");
                addTitle.className = "addTask";
                addTitle.placeholder = "Title";
                addForm.appendChild(addTitle);

                const addDes = document.createElement("textarea");
                addDes.className = "addTask";
                addDes.placeholder = "Description";
                addForm.appendChild(addDes);

                const addDue = document.createElement("input");
                addDue.className = "addTask";
                addDue.type = "date";
                addForm.appendChild(addDue);

                const addSubmit = document.createElement("button");
                addSubmit.className = "addTask";
                addSubmit.innerHTML = "Add Task";
                addSubmit.addEventListener("click", (e) => {
                    task.addTaskSubmit(
                        e, getMain, taskArray.length, addTitle.value, addDes.value, addDue.value
                    );
                });
                addForm.appendChild(addSubmit);
        };

        return {mainTask, addTask};
    };

    return {top, left, main};
})();

const task = (() => {

    // Execute left and main function for inital start of webpage

    display.left();
    display.main();
    display.main().mainTask();

    // Function for addTask array add

    const AddTask = (id, title, des, due) => {
        return {id, title, des, due};
    };    

    // Use left bar to choose which main page to choose

    const changeMain = (e, getMain) => {
        e.preventDefault();
        while(getMain.lastElementChild){getMain.removeChild(getMain.lastElementChild)};
        if(e.target.id === "addTask"){display.main().addTask()}
        else if(e.target.id === "leftTask"){display.main().mainTask()}
        else{display.main().mainTask()};
    };

    const addTaskSubmit = (e, getMain, id, title, des, due) => {
        e.preventDefault();
        const newTask = AddTask(id, title, des, due);
        taskArray.push(newTask);
        while(getMain.lastElementChild){getMain.removeChild(getMain.lastElementChild)};
        display.main().mainTask();
    };

    const removeTask = (e, getMain) => {
        e.preventDefault();
        const newArray = taskArray.filter((obj) => obj.id != e.target.value);
        taskArray = newArray;
        for(let i = 0; i < taskArray.length; i++){
            taskArray[i].id = i;
        };
        while(getMain.lastElementChild){getMain.removeChild(getMain.lastElementChild)};
        display.main().mainTask();
    };

    return {changeMain, addTaskSubmit, removeTask};
})();