import React, {useState, useEffect} from 'react';
import ToDoForm from './ToDoForm';
import ToDo from './ToDo';

function ToDoList() {
    const [toDos, setToDos] = useState([]);

    useEffect(()=>{
        const getToDos = async() =>{
            const toDosFromServer = await fetchToDos();
            setToDos(toDosFromServer);
        }
        getToDos();
    }, [])

    const fetchToDos = async(id) =>{
        const res = await fetch(`http://localhost:5000/api/item/get`, {
            method: 'GET',
            headers:{
                'Content-type':'application/json',
            },
            body: JSON.stringify(id),
        })
        const data = await res.json();
        return data
    };

    const addToDo = async(toDo) =>{
        if(!toDo.text){
            return;
        }
        const res = await fetch(`http://localhost:5000/api/item/add`, {
            method: 'POST',
            headers: {
                'Content-type':'application/json',
                },
            body: JSON.stringify(toDo),
        })

        const data = await res.json()
        setToDos([...toDos, data])
    };

    const removeToDo = async(id) =>{
        await fetch(`http://localhost:5000/api/item/delete`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(id),
        })
        const removeById = [...toDos].filter(toDo => toDo.id !== id)
        setToDos(removeById);
    };

    const editToDo = async (toDoId, newValue) =>{
        if(!newValue.text){
            return;
        }       
        setToDos(prev => prev.map(item => (item.id === toDoId ? newValue : item)));
        await fetch(`http://localhost:5000/api/item/edit`) 
    };

    const completeToDos = async(id) =>{
        const toDoComplete = await fetchToDos(id)
        const editedToDo = {...toDoComplete, done: !toDoComplete.done}

        const res = await fetch(`https://localhost:5000/api/item/edit`,{
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(editedToDo),
        })

        const data = await res.json()

        let updatedToDos = toDos.map(toDo => {
            if (toDo.id === id){
                toDo.done = data.done
                toDo.isComplete = !toDo.isComplete;
            }
            return toDo;
        });
        setToDos(updatedToDos);
    };

    return (
        <div>
            <h1>To Do List</h1>
            <ToDoForm onSubmit={addToDo}/>
            <ToDo
            toDos={toDos}
            completeToDos={completeToDos}
            removeToDo={removeToDo}
            editToDo={editToDo}
            />
        </div>
    );
}

export default ToDoList;
