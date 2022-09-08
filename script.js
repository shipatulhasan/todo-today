// calender

const clock = ()=>{

const date = new Date()
const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }
const dateContainer = document.getElementById('date')
dateContainer.innerHTML=`
<h2 class="text-3xl font-light text-zinc-300 py-2 ">
${date.toLocaleTimeString('en-us')}
</h2>
<h2 class="text-lg font-bold text-zinc-300 capitalize ">
${date.toLocaleString('en-us',options)}
</h2>

`
}
setInterval(clock,500)

// main work


const getElement = (id)=>{
    const element = document.getElementById(id)
    
    return element
}

const getValue = (id)=>{
    const inputField = document.getElementById(id)
    const value = inputField.value
    inputField.value = ''
    return value
}

const addTask = ()=>{
    const task = getValue('todo-filed')
    if(task === ''){
        alert('please provide your task')
        return
    }

    const todos = saveTask()
    
    let todolist

    if(!todos){

        todolist  = JSON.stringify([{title:task}])


    }else{
        todolist  = JSON.stringify([...todos,{title:task}])
    }

    localStorage.setItem('todos',todolist)
    
    incompleteProcess()
    errorHandling()
}

const saveTask = ()=>{

    const saveTask = localStorage.getItem('todos')
    let tasks = []
    if(saveTask){

        tasks = JSON.parse(saveTask)
    }
    
    return tasks

}




const incompleteProcess = () =>{


    const tasks = saveTask()


    const ul = document.getElementById('todo-list')
    ul.textContent = ''
    
    tasks.forEach((task,i) => {
        
        const li = document.createElement('li')
        li.className = "flex justify-between items-start py-2 w-full"
        li.innerHTML = `
        
        <h2 id="title">
            ${task.title}
        </h2>
        <button onclick="completeTask('${task.title}','${i}')" class="flex-shrink-0 bg-transparent hover:text-lime-400 hover:cursor-pointer text-sm font-bold text-lime-400 pl-3  rounded tracking-wider">
        <i class="fa-solid fa-circle-check text-lime-400"></i>
        
            Done
        </button>
        
        `
        ul.appendChild(li)
    });
}

// complete task table

// save data into storage

const addCompleteTask = (task) =>{

    const saveComplete = findComplete()

    let completList
    if(!saveComplete){

        completList = JSON.stringify([{title:task}])

    }else{
        completList = JSON.stringify([...saveComplete,{title:task}])
    }

    localStorage.setItem('completeTask',completList)
    // console.log(completList)

    completeProcess()
    

}


const findComplete = ()=>{
    const completeTask = localStorage.getItem('completeTask')
    let task = []

    if(completeTask){

        task = JSON.parse(completeTask)
    }


    return task
}

// complete task bind

const completeTask =(task,id)=>{

    const tasks = saveTask()
    tasks.splice(id,1)
    localStorage.setItem('todos',JSON.stringify(tasks))


    // add complete task
    addCompleteTask(task)
    incompleteProcess()
    completeProcess()
    errorHandling()


}


const completeProcess = () =>{

    const tasks = findComplete()

    const ul = document.getElementById('done-list')
    ul.textContent = ''
    
    tasks.forEach((task,i) => {
        
        const li = document.createElement('li')
        li.className = "flex justify-between items-start py-2 w-full"
        li.innerHTML = `
        
        <h2 id="title">
            ${task.title}
        </h2>
        <button onclick="deleteTask('${i}')" class="flex-shrink-0 bg-transparent hover:cursor-pointer text-sm font-bold text-red-500 pl-3 rounded tracking-wider">
        
        <i class="fa-solid fa-trash-can text-red-500"></i>
            Remove
        </button>
        
        `
        ul.appendChild(li)
    });

}
const deleteTask = (id)=>{
    
    const tasks = findComplete()

    tasks.splice(id,1)

    localStorage.setItem('completeTask',JSON.stringify(tasks))

    completeProcess()
    errorHandling()
    
}
const resetBtnClick = () =>{
    localStorage.clear()
    const incomplete = getElement('todo-list')
    const complete = getElement('done-list')
    incomplete.innerHTML = ''
    complete.innerHTML = ''
    errorHandling()
    return 
    
}


// error handling

const errorHandling = () =>{
    const incomplete = saveTask()
    const complete = findComplete()
    const allclear = getElement('errMSG')
    const taskFinish = getElement('complete')
    const completeTitle = getElement('complete-title')
    const icompleteTitle = getElement('incomplete-title')
    const resetBtn = getElement('reset-btn')

    if(incomplete.length === 0 && complete.length === 0 ){

        allclear.classList.remove('hidden')
        taskFinish?.classList.add('hidden')
        icompleteTitle?.classList.add('hidden')
        completeTitle?.classList.add('hidden')
        resetBtn.classList.add('hidden')

    }
    else if(incomplete.length === 0){
        taskFinish?.classList.remove('hidden')
        allclear.classList.add('hidden')
    }
    else{

        allclear.classList.add('hidden')
        icompleteTitle?.classList.remove('hidden')
        completeTitle?.classList.remove('hidden')
        resetBtn.classList.remove('hidden')
    }
}
errorHandling()
incompleteProcess()
completeProcess()
