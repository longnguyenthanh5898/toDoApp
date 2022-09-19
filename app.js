let input = document.querySelector('#input')
let addBtn = document.querySelector('#addBtn')

addBtn.onclick = () =>{
     let editId = addBtn.getAttribute("editId")
   
    if(!input.value){
        alert("Please enter some tasks...")
        return false
    }
    let data = getDataFromLocalStorage()
    if(editId === 0 || editId){
        console.log(editId)
        data[editId] = {name: input.value}
         addBtn.removeAttribute("editId")
    } else{

        data.push({name: input.value})
    }

    localStorage.setItem('data', JSON.stringify(data))
    input.value = ''
    input.focus()
    renderData(data)

}
getDataFromLocalStorage = () =>{
    return localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : []
}
renderData = (data  = []) =>{
    
    let html = data.map((data1, index) =>
        `    
        <li>
            <div class="todo__name">${data1.name}</div>
            <div class="todo_button"> 
                <a href="#" onclick="editData(${index})">
                    <i class="fa-sharp fa-solid fa-pen"></i>
                </a>
                <a href="#" onclick="deleteData(${index})">
                    <i class="fa-solid fa-trash"></i>
                </a>
            </div>
            
        </li>
        `
    
           
    )
        document.querySelector('#root').innerHTML = html
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
    let data = getDataFromLocalStorage()
  
        input.value = data[id].name
        
         addBtn.setAttribute("editId", id)
    
    
}


