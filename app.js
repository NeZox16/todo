(function () {
    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }

    function createTodoItemForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Enter the name of the new case';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn');
        button.textContent = 'Add cases';

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);


        input.addEventListener('input', () => {
            if (input.value === '') {
                button.setAttribute('disabled', 'disabled')
            } else {
                button.removeAttribute('disabled')
            }
        })

        if (input.value === '') {
            button.setAttribute('disabled', 'disabled')
        } 
        return {
            form,
            input,
            button,
        };
    };

    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }


    function createTodoItem(obj) {

        let item = document.createElement('li');
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');
        
        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = obj.name;


        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Success';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Delete';


        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);
        

        return {
            item,
            doneButton,
            deleteButton,
        };
        

    };



    function createTodoApp(container, title = 'List cases', keys) {

        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);
           
        
        if (localStorage.getItem(keys)) {
            let itemList = JSON.parse(localStorage.getItem(keys));


            for (let i = 0; i < itemList.length; i++) {
                let todoItem = createTodoItem(itemList[i]);

                if(itemList[i].done === true) {
                    todoItem.item.classList.add('list-group-item-success');
                }
                todoItem.doneButton.addEventListener('click', () => {
                    todoItem.item.classList.toggle('list-group-item-success');
                    itemList[i].done = !itemList[i].done;
                    localStorage.setItem(keys, JSON.stringify(itemList));
                });
                todoItem.deleteButton.addEventListener('click', () => {
                    if (confirm('Are you sure?')) {
                        itemList.splice(i, 1);
                        localStorage.setItem(keys, JSON.stringify(itemList));
                        todoItem.item.remove();
                    }
                });
                todoList.append(todoItem.item);
            }
        }
        

        
        todoItemForm.form.addEventListener('submit', function(e) {
            e.preventDefault();

        let nameTodo = todoItemForm.input.value;

        let todoObj = {
            name: nameTodo,
            done: false,
        };

        let itemList = JSON.parse(localStorage.getItem(keys)) || [];
        itemList.push(todoObj);
        localStorage.setItem(keys, JSON.stringify(itemList));


        let todoItem = createTodoItem(todoObj);
        todoList.append(todoItem.item);
            

        if (!todoItemForm.input.value) {
            return;
        }



        todoItem.doneButton.addEventListener('click', () => {
            todoItem.item.classList.toggle('list-group-item-success');
            todoObj.done = !todoObj.done;
            localStorage.setItem(keys, JSON.stringify(itemList));
        });
        
        todoItem.deleteButton.addEventListener('click', () => {
            if (confirm('Are you sure?')) {
                itemList.splice(itemList.indexOf(todoObj), 1);
                localStorage.setItem(keys, JSON.stringify(itemList));
                todoItem.item.remove();
            }
        });

        

        todoList.append(todoItem.item);

        todoItemForm.input.value = '';
        todoItemForm.button.setAttribute('disabled', 'disabled')


        })
    }

    window.createTodoApp = createTodoApp;
})();