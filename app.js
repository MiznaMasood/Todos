// app.js
var firebaseConfig = {
  apiKey: "AIzaSyCTIJ2XH2M0x6u7qL6eLEHUQaM_NuDZzAI",
  authDomain: "my-first-webpage-e8384.firebaseapp.com",
  projectId: "my-first-webpage-e8384",
  storageBucket: "my-first-webpage-e8384.appspot.com",
  databaseURL: "https://my-first-webpage-e8384-default-rtdb.firebaseio.com",
  messagingSenderId: "330482739663",
  appId: "1:330482739663:web:8d74e1294e63ac91528aba"
};

// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);

firebase.database().ref("to-do").on("child_added", function(data) {
  var list = document.getElementById("list");

  var liElement = document.createElement("li");
  liElement.setAttribute("id", data.val().key);

  var liText = document.createTextNode(data.val().todoValue);
  liElement.appendChild(liText);

  var delBtnELement = document.createElement("button");
  var delBtnText = document.createTextNode("Delete");
  delBtnELement.appendChild(delBtnText);
  delBtnELement.setAttribute("class", "delete");
  delBtnELement.setAttribute("onclick", "deleteItem(this)");
  delBtnELement.setAttribute("id", data.val().key);

  var editBtnElement = document.createElement("button");
  var editBtnText = document.createTextNode("Edit");
  editBtnElement.appendChild(editBtnText);
  editBtnElement.setAttribute("class", "edit");
  editBtnElement.setAttribute("onclick", "editItem(this)");
  editBtnElement.setAttribute("id", data.val().key);

  liElement.appendChild(editBtnElement);
  liElement.appendChild(delBtnELement);
  list.appendChild(liElement);
});

function addTodo() {
  var input = document.getElementById("todoInput");
  var id = Date.now().toString(31);
  var obj = {
    key: id,
    todoValue: input.value
  };
  firebase.database().ref("to-do/" + id).set(obj);
  input.value = "";
}

function deleteAll() {
  firebase.database().ref("to-do").remove();
  var list = document.getElementById("list");
  list.innerHTML = "";
}

function deleteItem(e) {
  firebase.database().ref("to-do/" + e.id).remove();
  e.parentNode.remove();
}

function editItem(e) {
  var updateValue = prompt("Enter updated value..");
  if (updateValue !== null) {
    firebase.database().ref("to-do/" + e.id).set({
      key: e.id,
      todoValue: updateValue
    }).then(() => {
      e.parentNode.firstChild.nodeValue = updateValue;
    }).catch(error => {
      console.error("Error updating item:", error);
    });
  }
}
