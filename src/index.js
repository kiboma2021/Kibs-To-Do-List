import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import './style.css';
import updateLocal from './status_update.js'

//Selectors
const myInput = document.querySelector('input');
const clearContent = document.querySelector('#clear-content');
const todoList = document.querySelector('#display-list');
const checkbox = document.querySelectorAll('.checkbox');
const editIcons = document.querySelectorAll('.edit-to-do');
const todo_container = document.querySelectorAll('.toDocontainer');
const removeList = document.querySelectorAll('.remove-icon');

//Template class addItem
class toDoitem {
  constructor (description, complited, index) {
    this.description = description;
    this.complited = complited;
    this.index = index;
  }
}

const myTodoList = [];

//Add event lister when enter is clicked while in input field
myInput.addEventListener ('keypress', e => {
  if (e.key === 'Enter' && myInput.value ) {
    addTodo(myInput.value);
    myInput.value = null;
  }
})

const addTodo = toDovalue => {
  const toDocontainer = document.createElement('div');
  toDocontainer.className = 'toDocontainer';
  toDocontainer.innerHTML += `
  <input type="checkbox" class="checkbox">
  <span>${toDovalue}</span>
  <span class="edit-to-do"> <i class="fa fa-ellipsis-v"></i></span>
  <span class="remove-icon"><i class="fa fa-trash-alt" ></i></span>
  `
  todoList.appendChild(toDocontainer);

  //Add items to Local Storage
  const addItem = new toDoitem (toDovalue, false, checkbox.length )
  myTodoList.push(addItem);
  localStorage.setItem ('List', JSON.stringify(myTodoList));

 /* //Edit todo list
  editIcons.forEach (i => {
    i.addEventListener('click', () => {
      i.parentElement.classList.add('checkedContainer');
      editTodo(toDocontainer, i.previousElementSibling);
    })
  })
  //Remove from the list
  const removeList = document.querySelectorAll('.remove-icon');
  removeList.forEach (i => {
    i.addEventListener('click', () => {
      removeTodo(i.parentElement);
    })
  })  */
};

//Add editTodo function
const editTodo = (toDocontainer, todo) => {
  const editInput = document.createElement('input');
  editInput.type = "text";
  editInput.className = "editInput";
  editInput.value = todo.textContent;
  toDocontainer.replaceChild(editInput, todo);

  //add event listerner to edit input
  editInput.addEventListener ('keypress', e => {
    if (e.key === 'Enter') {
      const editContainers = document.querySelectorAll('.toDocontainer');
      const localData = JSON.parse (localStorage.getItem('List'));
      for (let i=0; i<editContainers.length; i++) {
        if (editContainers[i].classList.contains('checkedContainer')) {
          localData[i].description = editInput.value;
          localStorage.setItem ('List', JSON.stringify(localData));
        }
      }
      editInput.parentElement.classList.remove('checkedContainer');
      toDocontainer.replaceChild(todo, editInput);
      todo.textContent = editInput.value;
    }
  })
}

//Remove Items from to do list
const removeTodo = (todo) => {
  todoList.removeChild(todo);
  let count = 1;
  const localData = JSON.parse(localStorage.getItem('List'));
  const data = Array.from(localData).filter (i => i.complited === false);
  data.map (i => i.index = count++);
  localStorage.setItem ('List', JSON.stringify(data));
  window.location.reload();
}



//Get data from local storage
const getFromLocal = () => {
  const data = JSON.parse(localStorage.getItem('List'));
  data.map (i => {
    myTodoList.push(i);
    const toDocontainer = document.createElement('div');
    toDocontainer.className = 'toDocontainer';
    toDocontainer.innerHTML += `
    <input type="checkbox" class="checkbox">
    <span class="description">${i.description}</span>
    <span class="edit-to-do"> <i class="fa fa-ellipsis-v"></i></span>
    <span class="remove-icon"><i class="fa fa-trash-alt" ></i></span>
    `
    todoList.appendChild(toDocontainer);

    //Edit todo list
    const editIcons = document.querySelectorAll('.edit-to-do');
    editIcons.forEach (i => {
      i.addEventListener('click', () => {
        i.parentElement.classList.add('checkedContainer');
        editTodo(toDocontainer, i.previousElementSibling);
      })
    })
  })
  //Get the checkbox
  checkbox.forEach(i => {
    i.addEventListener('change', () => {
      i.parentElement.classList.toggle('checkedContainer');
      i.nextElementSibling.classList.toggle('check-to-do');
      i.parentElement.lastElementChild.classList.toggle('trash-active');
      i.parentElement.lastElementChild.previousElementSibling.classList.toggle('edit-disabled');
      updateLocal();
    })
  })

  //Remove from the list
  removeList.forEach (i => {
    i.addEventListener('click', () => {
      removeTodo(i.parentElement);
    })
  })

  //Now send data to local storage
  localStorage.setItem('List',JSON.stringify(myTodoList));
}

window.addEventListener('load',getFromLocal);

//Clear All
const clearAll = () => {
  const localData = JSON.parse(localStorage.getItem('List'));
  todo_container.forEach (i => {
    if (i.classList.contains('checkedContainer')) {
      removeTodo(i);
    }
  })
  let count = 1;
  const data = Array.from(localData).filter(i => i.complited == false);
  data.map (i => i.index = count++);
  localStorage.setItem ('List', JSON.stringify(data));
  window.location.reload();
}

clearContent.addEventListener ('click', clearAll);

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = dd + '/' + mm + '/' + yyyy;
document.getElementById("date").innerHTML = today;