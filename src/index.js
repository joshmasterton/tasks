import "./index.css";

const task = (() => {
    const taskArray = [];

    const changeMain = (e, getMain) => {
        e.preventDefault();
        let target = e.target.innerHTML;
        while(getMain.lastElementChild){
            getMain.removeChild(getMain.lastElementChild);
        };
        displayController.buildMain(target);
    };

    return {changeMain};
})();

const displayController = (() => {
    const getTop = document.getElementById("topCon");
    const getLeft = document.getElementById("leftCon");
    const getMain = document.getElementById("mainCon");

    const buildLeft = () => {
        const allTask = document.createElement("button");
        allTask.className = "left";
        allTask.innerHTML = "All Tasks";
        allTask.addEventListener("click",(e) => {
            task.changeMain(e, getMain);
        });
        getLeft.appendChild(allTask);

        const today = document.createElement("button");
        today.className = "left";
        today.innerHTML = "Today";
        today.addEventListener("click", (e) => {
            task.changeMain(e, getMain);
        });
        getLeft.appendChild(today);

        const upcoming = document.createElement("button");
        upcoming.className = "left";
        upcoming.innerHTML = "Upcoming";
        upcoming.addEventListener("click", (e) => {
            task.changeMain(e, getMain);
        });
        getLeft.appendChild(upcoming);

        const addTask = document.createElement("button");
        addTask.classList = "left";
        addTask.innerHTML = "Add Task";
        addTask.addEventListener("click", (e) => {
            task.changeMain(e, getMain);
        });
        getLeft.appendChild(addTask);
    };

    const buildMain = (target) => {
        const buildAllTask = () => {
            const allTask = document.createElement("div");
            allTask.className = "main";
            allTask.id = "allTask";
            allTask.innerHTML = "All Tasks";
            getMain.appendChild(allTask);
        };

        const buildToday = () => {
            const today = document.createElement("div");
            today.className = "main";
            today.id = "today";
            today.innerHTML = "Today";
            getMain.appendChild(today);  
        };

        const buildUpcoming = () => {
            const upcoming = document.createElement("div");
            upcoming.className = "main";
            upcoming.id = "upcoming";
            upcoming.innerHTML = "Upcoming";
            getMain.appendChild(upcoming);
        };
        
        const buildAddTask = () => {
            const addTask = document.createElement("div");
            addTask.className = "main";
            addTask.id = "addTask";
            addTask.innerHTML = "Add Task";
            getMain.appendChild(addTask);
        };

        if(target === "All Tasks"){return buildAllTask()}
        else if(target === "Today"){return buildToday()}
        else if(target === "Upcoming"){return buildUpcoming()}
        else if(target === "Add Task"){return buildAddTask()}
        else{return buildAllTask()};
    };

    return {
        buildLeft, 
        buildMain,
    };
})();

displayController.buildMain();
displayController.buildLeft();
