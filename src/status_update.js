//Update Local storage with True or False
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

export default updateLocal;