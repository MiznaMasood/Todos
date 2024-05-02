function addTodo(){
    var input = document.getElementById("todoInput")
   
     console.log(input.value)

     var list =  document.getElementById("list")
     list.innerHTML += `<li><strong><em>${input.value}</strong></em><button class = "edit" onclick = "editItems(this)"> Edit </button>
     <button class = "del" onclick = "deleteItems(this)"> Delete </button>
     </li>
     `

    

}

function deleteAll(){
    var list = document.getElementById("list")
    list.innerHTML= " ";
}

function deleteItems(e){
  e.parentNode.remove()

}

function editItems(e){
var updateValue = prompt("Enter updated value")
e.parentNode.firstChild.nodeValue = updateValue


}




