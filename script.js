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

const myArray = [];
const addTodo = toDovalue => {
  const toDocontainer = document.createElement('div');
  toDocontainer.className = 'toDocontainer';
  toDocontainer.innerHTML += `
  <input type="checkbox" class="checkbox">
  <span>${toDovalue}</span>
  <i class="fa fa-ellipsis-v"></i>
  <i class="fa fa-trash-o"></i>
  `
  todoList.appendChild(toDocontainer);
};

//Add event lister when enter is clicked while in input field
myInput.addEventListener ('keypress', e => {
  if (e.key === 'Enter' && myInput.value ) {
    addTodo(myInput.value);
  }
})