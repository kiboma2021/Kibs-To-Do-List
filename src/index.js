import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import './style.css';

//Reference HTML
const myInput = document.querySelector('input');
const clearContent = document.querySelector('#clear-content');
const todoList = document.querySelector('#display-list');

//Template class object
class myObject {
  constructor (description, complited, index) {
    this.description = description;
    this.complited = complited;
    this.index = index;
  }
}

const myTodoList = [];

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


  const checkbox = document.querySelectorAll('.checkbox');
  checkbox.forEach(i => {
    i.addEventListener('click', () => {
      i.parentElement.classList.toggle('checkedContainer');
      i.nextElementSibling.classList.toggle('check-to-do');
      i.parentElement.lastElementChild.classList.toggle('trash-active');
      i.parentElement.lastElementChild.previousElementSibling.classList.toggle('edit-disabled');
      updateLocal();
    })
  }) 
  
  //Add items to Local Storage
  const object = new myObject (toDovalue, false, checkbox.length-1 )
  myTodoList.push(object);
  localStorage.setItem ('List', JSON.stringify(myTodoList));

  //Edit todo list
  const editIcons = document.querySelectorAll('.edit-to-do');
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
  })
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
  let count = 0;
  const localData = JSON.parse(localStorage.getItem('List'));
  const data = Array.from(localData).filter (i => i.complited === false);
  data.map (i => i.index = count++);
  localStorage.setItem ('List', JSON.stringify(data));
}

//Add event lister when enter is clicked while in input field
myInput.addEventListener ('keypress', e => {
  if (e.key === 'Enter' && myInput.value ) {
    addTodo(myInput.value);
    myInput.value = null;
  }
})

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
  const checkbox = document.querySelectorAll('.checkbox');
  checkbox.forEach(i => {
    i.addEventListener('click', () => {
      i.parentElement.classList.toggle('checkedContainer');
      i.nextElementSibling.classList.toggle('check-to-do');
      i.parentElement.lastElementChild.classList.toggle('trash-active');
      i.parentElement.lastElementChild.previousElementSibling.classList.toggle('edit-disabled');
      updateLocal();
    })
  })

  //Remove from the list
  const removeList = document.querySelectorAll('.remove-icon');
  removeList.forEach (i => {
    i.addEventListener('click', () => {
      removeTodo(i.parentElement);
    })
  })

  //Now send data to local storage
  localStorage.setItem('List',JSON.stringify(myTodoList));
}

window.addEventListener('load',getFromLocal);

//Update Local storage
const updateLocal = () => {
  const localData = JSON.parse(localStorage.getItem('List'));
  const todos = document.querySelectorAll(".description");
  for (let i=0; i<todos.length; i++) {
    if(todos[i].classList.contains('check-to-do')) {
      localData[i].complited = true;
    } else {
      localData[i].complited = false;
    }
  }
  localStorage.setItem('List',JSON.stringify(localData));
}

//Clear All
const clearAll = () => {
  const localData = JSON.parse(localStorage.getItem('List'));
  const todo_container = document.querySelectorAll('.toDocontainer');
  todo_container.forEach (i => {
    if (i.classList.contains('checkedContainer')) {
      removeTodo(i);
    }
  })
  let count = 0;
  const data = Array.from(localData).filter(i => i.complited == false);
  data.map (i => i.index = count++);
  localStorage.setItem ('List', JSON.stringify(data));
}

clearContent.addEventListener ('click', clearAll);