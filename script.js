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
   <div><i class="fa fa-ellipsis-v"></i></div>
  <div class="remove-icon"> <i class="fa fa-trash-o" ></i></div>
  `
  todoList.appendChild(toDocontainer);

  const checkbox = document.querySelectorAll('.checkbox');
  checkbox.forEach(i => {
    i.addEventListener('click', () => {
      //i.parentElement.classList.toggle('checkedContainer');
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
      editTodo();
    })
  })
};

//Add editTodo function
const editTodo = (toDocontainer, todo) => {
  const editInput = document.createElement('input');
  editInput.type = "text";
  editInput.className = "editInput";
  editInput.value = todo.textContent;

}

//Add event lister when enter is clicked while in input field
myInput.addEventListener ('keypress', e => {
  if (e.key === 'Enter' && myInput.value ) {
    e.preventDefault();
    addTodo(myInput.value);
    myInput.value = null;
  }
})