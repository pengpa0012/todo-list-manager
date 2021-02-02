const containers = document.querySelectorAll('.draggable-box')
const popUpDraggable = document.querySelector('.pop-up-draggable')
const overlay = document.querySelector('.overlay')
const addDraggable = document.querySelector('.add-draggable')


containers.forEach(container => {
    container.addEventListener('dragover', e => {
        const draggable = document.querySelector('.dragging')

        container.appendChild(draggable)    
    })  
})

addDraggable.addEventListener('click', e => {
    overlay.classList.add('show')
    popUpDraggable.classList.add('show')
    popUpDraggable.innerHTML = `
        <h2>Add Todo</h2>
        <input type="text" placeholder="Project Title">
        <button class="done-btn">done</button>
    `
    const doneBtn = document.querySelector('.done-btn')

    doneBtn.addEventListener('click', () => {
        if(popUpDraggable.children[1].value == ""){
            alert('Project name required') 
            return
        }   
        addDraggableElement(overlay, popUpDraggable, e)
        draggablesMove(overlay, popUpDraggable)
    })  
}) 

function draggablesMove(overlay, popUpDraggable){
    const draggables = document.querySelectorAll('.draggable')

    draggables.forEach(draggable => {

        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging')
        })
        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging')
        })

        draggable.addEventListener('dblclick', e => {          
            editDraggableElement(overlay, popUpDraggable, draggable, e)
        })
    })
}

function addDraggableElement(overlay, popUp, e){

    localStorage.setItem('new-todo', popUp.children[1].value)
    
    overlay.classList.remove('show')
    popUp.classList.remove('show')

    const containerParent = e.target.closest('.draggable-box')
    const draggableElement = document.createElement('div')        
    const draggableElementTitle = document.createElement('h4')

    draggableElementTitle.classList.add('title')
    draggableElement.appendChild(draggableElementTitle)

    draggableElement.classList.add('draggable')
    draggableElement.classList.add('border')
    draggableElement.setAttribute('draggable', true)

    draggableElementTitle.innerText = localStorage.getItem('new-todo')
    draggableElementTitle.classList.add('text-dark')

    containerParent.appendChild(draggableElement)
}

function editDraggableElement(overlay, popUp, draggable, e){
    overlay.classList.add('show')
    popUp.classList.add('show')
    popUp.innerHTML = `
        <h2>Edit Todo</h2>
        <input type="text" value="${e.target.innerText}">
        <button class="done-btn">done</button>
    `
   
    const doneBtn = document.querySelector('.done-btn')
    doneBtn.addEventListener('click', () => {
        overlay.classList.remove('show')
        popUp.classList.remove('show')
        draggable.firstElementChild.innerText = popUp.children[1].value  

    })
}