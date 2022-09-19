let input = document.querySelector('#input')
let addBtn = document.querySelector('#addBtn')
let editBtn = document.querySelector('#editBtn')

addBtn.onclick = () =>{
     let editId = addBtn.getAttribute("editId")
   
    if(!input.value){
        alert("Please enter some tasks...")
        return false
    }
    let data = getDataFromLocalStorage()
    if(editId === 0 || editId){
        addBtn.textContent = 'Edit'
        data[editId] = {name: input.value}
         addBtn.removeAttribute("editId")
    } else{

        data.push({name: input.value})
    }
    addBtn.textContent = 'Add'
    localStorage.setItem('data', JSON.stringify(data))
    input.value = ''
    input.focus()
    renderData(data)

}
getDataFromLocalStorage = () =>{
    return localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : []
}
renderData = (data) =>{
    
    let html = data.map((data1, index) => 
        `
        <li class="task-item" >
            <div class="todo__name col-10 ">${data1.name}</div>
            <div class="todo_button col-2 d-flex"> 
                <a href="#" onclick="editData(${index})" class="col-6 ">
                    <i class="fa-sharp fa-solid fa-pen "></i>
                </a>
                <a href="#" onclick="deleteData(${index})" class="col-6 ">
                    <i class="fa-solid fa-trash "></i>
                </a>
            </div>     
        </li>
        `
    
           
    )
        document.querySelector('#root').innerHTML = html.join("")
          
}


let data = getDataFromLocalStorage()

renderData(data)

deleteData = (id) =>{
    let data = getDataFromLocalStorage()
    data.splice(id, 1)
    localStorage.setItem('data', JSON.stringify(data))
    renderData(getDataFromLocalStorage())
}
editData = (id) =>{
    addBtn.textContent = 'Edit'
    let data = getDataFromLocalStorage()
  
        input.value = data[id].name
        
         addBtn.setAttribute("editId", id) 
    
}

input.addEventListener('keypress', (e) =>{
    if(e.key === 'Enter'){
        e.preventDefault()      
        addBtn.click()
    }
});
