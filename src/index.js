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

const myArray = [
  {
    description: 'Practice using Bootsrap',
    completed: false,
    index: 4,
  },
  {
    description: 'Do coding challenge',
    completed: false,
    index: 3,
  },
  {
    description: 'Attend Morning session',
    completed: false,
    index: 2,
  },
  {
    description: 'Meet with my coding partners',
    completed: false,
    index: 1,
  },
];

myArray.sort((a, b) => a.index - b.index);

myArray.forEach((list) => {
  for (let i = 0; i < myArray.length; i += 1) {
    if (myArray[i] === myArray.index) {
      return;
    }
  }
  const card = `
  <input type="checkbox" class="checkbox">
  <span>${list.description}</span>
   <div><i class="fa fa-ellipsis-v"></i></div>
  <div class="remove-icon"> <i class="fa fa-trash-o" ></i></div>
  `
  document.getElementById('display-list').innerHTML += card;
});





const addTodo = toDovalue => {
  const toDocontainer = document.createElement('div');
  toDocontainer.className = 'toDocontainer';
  toDocontainer.innerHTML += `
  <input type="checkbox" class="checkbox">
  <span>${toDovalue}</span>
   <div><i class="fa fa-ellipsis-v"></i></div>
  <div class="remove-icon"> <i class="fa fa-trash-o" ></i></div>
  `
  todoList.appendChild(toDocontainer);


  const checkbox = document.querySelectorAll('.checkbox');
  checkbox.forEach(i => {
    i.addEventListener('click', () => {
      i.parentElement.classList.toggle('checkedContainer');
      i.nextElementSibling.classList.toggle('check-to-do');
      i.parentElement.lastElementChild.classList.toggle('trash-active');
      i.parentElement.lastElementChild.previousElementSibling.classList.toggle('edit-disabled');
    })
  }) 
  
  //Add items to Local Storage
  const object = new myObject (toDovalue, false, checkbox.length-1 )
  myArray.push(object);
  localStorage.setItem ('List', JSON.stringify(myArray));

  //Edit todo list
  const editIcons = document.querySelectorAll(".fa-ellipsis-v");
  editIcons.forEach (i => {
    i.addEventListener ('click', ()=> {
      editTodo(toDocontainer, i.previousElementSibling);
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
      for (let i=1; i<editContainers.length; i++) {
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

//Add event lister when enter is clicked while in input field
myInput.addEventListener ('keypress', e => {
  if (e.key === 'Enter' && myInput.value ) {
    e.preventDefault();
    addTodo(myInput.value);
    myInput.value = null;
  }
})