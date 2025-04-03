let todos = new Map();

const elCompletedTemp = document.querySelector(".js-completed-temp").content;
const elIncompleteTemp = document.querySelector(".js-incomplete-temp").content;

const elAllTodos = document.querySelector(".js-all-todos");
const elCompletedTodos = document.querySelector(".js-completed-todos");
const elIncompleteTodos = document.querySelector(".js-incomplete-todos");

const elSearch = document.getElementsByName("search")[0];
const elMarkAsCompletedBtn = document.querySelector(".js-complete-btn");
const elEditBtn = document.querySelector(".js-edit-btn");
const elDeleteBtn = document.querySelector(".js-delete-btn");
const elAddTodoBtn = document.querySelector(".js-add-todo-btn");
const elTitle = document.getElementsByName("title")[0];
const elDescription = document.getElementsByName("description")[0];

const renderTodos = () => {
    elAllTodos.innerHTML = "";
    elCompletedTodos.innerHTML = "";
    elIncompleteTodos.innerHTML = "";

    todos.forEach(todo => {
        if (todo.isCompleted) {
            let clone = elCompletedTemp.cloneNode(true);
            clone.querySelector(".js-title").textContent = todo.title;
            clone.querySelector(".js-description").textContent = todo.description;
            clone.querySelector(".js-delete-btn").dataset.id = todo.id;

            elCompletedTodos.appendChild(clone);

            clone = elCompletedTemp.cloneNode(true);
            clone.querySelector(".js-title").textContent = todo.title;
            clone.querySelector(".js-description").textContent = todo.description;
            clone.querySelector(".js-delete-btn").dataset.id = todo.id;

            elAllTodos.appendChild(clone);

        } else {
            let clone = elIncompleteTemp.cloneNode(true);
            clone.querySelector(".js-title").textContent = todo.title;
            clone.querySelector(".js-description").textContent = todo.description;
            clone.querySelector(".js-complete-btn").dataset.id = todo.id;
            clone.querySelector(".js-edit-btn").dataset.id = todo.id;
            clone.querySelector(".js-delete-btn").dataset.id = todo.id;

            elIncompleteTodos.appendChild(clone);

            clone = elIncompleteTemp.cloneNode(true);
            clone.querySelector(".js-title").textContent = todo.title;
            clone.querySelector(".js-description").textContent = todo.description;
            clone.querySelector(".js-complete-btn").dataset.id = todo.id;
            clone.querySelector(".js-edit-btn").dataset.id = todo.id;
            clone.querySelector(".js-delete-btn").dataset.id = todo.id;

            elAllTodos.appendChild(clone);

        }
    })
}

elAddTodoBtn.addEventListener("click", (evt) => {
    evt.preventDefault();
    if (elTitle.value.trim() == "" || elDescription.value.trim() == "") return alert("title and description are required")
    let todo = {
        id: 1,
        title: "first todo",
        description: "create the first todo with js",
        isCompleted: false
    }
    todo.id = (todos.size == 0) ? 1 : todos.get(todos.size).id + 1;
    todo.title = elTitle.value;
    todo.description = elDescription.value;

    todos.set(todo.id, todo);
    renderTodos();

    elDescription.value = "";
    elTitle.value = "";
    elTitle.focus();
})

elSearch.addEventListener("change", (evt) => {
    evt.preventDefault();
    elAllTodos.innerHTML = "";
    elCompletedTodos.innerHTML = "";
    elIncompleteTodos.innerHTML = "";
    const value = evt.target.value.trim();
    console.log(value);
    if (value != "") {
        todos.forEach(todo => {
            if (todo.title.includes(value) || todo.description.includes(value)) {
                if (todo.isCompleted) {
                    let clone = elCompletedTemp.cloneNode(true);
                    clone.querySelector(".js-title").textContent = todo.title;
                    clone.querySelector(".js-description").textContent = todo.description;
                    clone.querySelector(".js-delete-btn").dataset.id = todo.id;

                    elCompletedTodos.appendChild(clone);


                } else {
                    let clone = elIncompleteTemp.cloneNode(true);
                    clone.querySelector(".js-title").textContent = todo.title;
                    clone.querySelector(".js-description").textContent = todo.description;
                    clone.querySelector(".js-complete-btn").dataset.id = todo.id;
                    clone.querySelector(".js-edit-btn").dataset.id = todo.id;
                    clone.querySelector(".js-delete-btn").dataset.id = todo.id;

                    elIncompleteTodos.appendChild(clone);

                }
            }
        })
    }
})


window.addEventListener("click", (evt) => {
    evt.preventDefault();
    const id = Number(evt.target.dataset.id);
    const todo = todos.get(id);

    if (evt.target.classList.contains("js-complete-btn")) {
        todo.isCompleted = true;
        todos.set(id, todo);
    } else if (evt.target.classList.contains("js-delete-btn")) {
        todos.delete(id);
    } else if (evt.target.classList.contains("js-edit-btn")) {
        elDescription.value = todo.description;
        elTitle.value = todo.title;
        todos.delete(id);
    }
    renderTodos();
});

renderTodos();