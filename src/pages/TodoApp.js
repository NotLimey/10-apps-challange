import React, {useEffect, useState} from 'react'
import '../scss/todoApp.scss';

const Colors = [
    '#E27D60',
    '#85CDCA',
    '#E8A87C',
    '#C38D9E',
    '#41B3A3'
]

const TodoApp = () => {
    const [Todos, setTodos] = useState();
    const [Title, setTitle] = useState('');
    var storage = window.localStorage;

    useEffect(() => {
        if(storage.todos === undefined || storage.todos === null) return;
        var todos = JSON.parse(storage.todos);
        setTodos(todos);
    }, [storage.todos])

    const UpdateTodos = () => {
        if(storage.todos === undefined || storage.todos === null) return;
        var todos = JSON.parse(storage.todos);
        setTodos(todos);
    }

    const addTodo = (title) => {

        if(storage.todos !== undefined && storage.todos !== null) {
            var prevValue = JSON.parse(storage.todos);
            var element = {title: title, checked: false, id: prevValue.length + 1, color: Colors[Math.floor(Math.random() * Colors.length)]};
            prevValue.push(element);
            storage.setItem('todos', JSON.stringify(prevValue));
        }else {
            var arr = [];
            var elem = {title: title, checked: false, id: 1, color: Colors[Math.floor(Math.random() * Colors.length)]};
            arr.push(elem);
            storage.setItem('todos', JSON.stringify(arr));
        }
        UpdateTodos();
    }

    const deleteTodo = (item) => {
        var prevValue = JSON.parse(storage.todos);
        console.log(item.id);
        var todoToDelete = prevValue.findIndex(index => index.id === item.id);
        console.log(todoToDelete)
        prevValue.splice(todoToDelete, 1)
        storage.setItem('todos', JSON.stringify(prevValue))
        UpdateTodos();
    }

    var newTodoEnter = document.getElementById('newTodo');
    
    useEffect(() => {
        if(newTodoEnter === undefined || newTodoEnter === null) return;
        newTodoEnter.addEventListener('keyup', function(event) {
            if(event.key === "Enter") {
                // eslint-disable-next-line
                addTodo(event.target.value);
                // eslint-disable-next-line
                event.target.value = '';
            }
        })
    }, [newTodoEnter])

    const Todo = ({todo}) => {
        return (
            <div className="todo" style={{backgroundColor: todo.color}}>
                <div className="todo-title__Checked">
                    <h3>{todo.title}</h3>
                </div>
                <div className="todo-button">
                    <button onClick={() => deleteTodo(todo)}><span>Done</span> <ion-icon name="close-outline"></ion-icon></button>
                </div>
            </div>
        )
    }

    return (
       <section className="todo-app">
           <h1>Todo list</h1>
           <div>
                <div className="new-todo">
                    <input id="newTodo" onChange={e => setTitle(e.target.value)}/>
                    <button onClick={() => addTodo(Title)}><ion-icon name="add-outline"></ion-icon></button>
                </div>
                
                {Todos !== undefined && Todos !== null ?
                Todos.reverse().map((item, index) => {
                    return <Todo key={index} todo={item} />
                    }) : <></>}
           </div>
       </section>
    )
}


export default TodoApp;