import { useState } from 'react';

const ToDo = () => {
    const [todo, setTodo] = useState([]);
    const [todoText, setTodoText] = useState("");
    const [deletedTodo, setdeletedTodo] = useState([]);
    const [completedTodo, setCompletedTodo] = useState([]);
    const [edit, setEdit] = useState({});
    const [editTodo, seteditTodo] = useState("");

    const handleAddTodo = () => {
        setTodo((prev) => [
            ...prev, { id: Math.floor(Math.random() * 100), value: todoText }
        ])
        setTodoText("");
    }

    const handleTodoDelete = (id) => {
        const filteredData = todo.filter((item) => item.id !== id);
        const deletedData = todo.filter((item) => item.id === id);
        // Using spread operator which creates a new array out of old array 
        // and using second spread operator which takes elements from deleteddata array and appends to the deletedSArray
        setdeletedTodo((prev) => [...prev, ...deletedData])
        setTodo(filteredData);
    }

    const handleTodoComplete = (id) => {
        const completedData = todo.filter((item) => item.id === id);
        const removeUponComplete = todo.filter((item) => item.id !== id);
        setTodo([...removeUponComplete]);
        setCompletedTodo((prev) => [...prev, ...completedData]);
    }

    const handleEditedTodo = (id) => {
        const todoEdit = todo.map((item => {
            if (item.id === id) {
                return { ...item, value: editTodo }
            }
            return item;
        }))
        setTodo(todoEdit);
        setEdit({ id: id, open: false });
    }
    return (
        <div className='todoList'>
            <div style={{marginLeft:"10%"}}>
                <h1>To-Do App</h1>
                <input type="text" placeholder='Add a Todo' value={todoText} onChange={(e) => setTodoText(e.target.value)} />
                <button onClick={handleAddTodo}>Add ToDo</button>
            </div>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <div>
                    <h4>Active Todos</h4>
                    <ul>
                        {todo.map((item) => {
                            return (
                                <li key={item.id}>{item.value}
                                    <button onClick={() => handleTodoComplete(item.id)}>Completed</button>
                                    <button onClick={() => setEdit({ id: item.id, open: true })}>Edit</button>
                                    {(item.id === edit.id && edit.open) && (
                                        <>
                                            <input type="text" placeholder='Edit the Todo' value={editTodo} onChange={(e) => seteditTodo(e.target.value)} />
                                            <button onClick={() => handleEditedTodo(item.id)}>Save</button>
                                            <button onClick={() => setEdit({ id: item.id, open: false })}>Cancel</button>
                                        </>
                                    )}
                                    <button onClick={() => handleTodoDelete(item.id)}>Delete</button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div>
                    <h4>Deleted Todo</h4>
                    <ul>
                        {deletedTodo.map((item) => {
                            return (
                                <li key={item.id}>{item.value}</li>
                            )
                        })}
                    </ul>
                </div>
                <div>
                    <h4>Completed Todo</h4>
                    <ul>
                        {completedTodo.map((item) => {
                            return (
                                <li key={item.id}>{item.value}</li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ToDo;