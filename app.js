document.addEventListener('DOMContentLoaded', () => {
    const todoList = document.getElementById('todoList');
    const newTodoInput = document.getElementById('newTodo');
    const addTodoButton = document.getElementById('addTodo');
  
    addTodoButton.addEventListener('click', () => {
      const newTodo = newTodoInput.value;
      if (newTodo) {
        fetch('/addTodo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ todo: newTodo })
        })
          .then(response => response.json())
          .then(() => {
            newTodoInput.value = '';
            fetchTodos();
          })
          .catch(error => console.error('Error adding todo:', error));
      }
    });
  
    todoList.addEventListener('click', event => {
      if (event.target.classList.contains('delete-button')) {
        const listItem = event.target.closest('li');
        const todoId = listItem.dataset.todoId;
        deleteTodo(todoId);
      }
    });
  
    function createTodoElement(todo) {
      const li = document.createElement('li');
      li.dataset.todoId = todo._id;
  
      const taskSpan = document.createElement('span');
      taskSpan.textContent = todo.task;
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('delete-button');
      
      li.appendChild(taskSpan);
      li.appendChild(deleteButton);
  
      return li;
    }
  
    function fetchTodos() {
      fetch('/getTodos')
        .then(response => response.json())
        .then(todos => {
          todoList.innerHTML = '';
          todos.forEach(todo => {
            const li = createTodoElement(todo);
            todoList.appendChild(li);
          });
        })
        .catch(error => console.error('Error fetching todos:', error));
    }
  
    function deleteTodo(todoId) {
      fetch(`/deleteTodo/${todoId}`, {
        method: 'DELETE'
      })
        .then(response => response.json())
        .then(() => {
          fetchTodos();
        })
        .catch(error => console.error('Error deleting todo:', error));
    }
  
    fetchTodos();
  });
  