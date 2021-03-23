import React, {useState} from 'react';
import ToDoForm from './ToDoForm';
import ToDo from './ToDo';

function ToDoList() {
    const [toDos, setToDos] = useState([]);

    const addToDo = toDo =>{
        if(!toDo.text){
            return;
        }
        const newToDos = [toDo, ...toDos];

        setToDos(newToDos);
    };

    const removeToDo = id =>{
        const removeById = [...toDos].filter(toDo => toDo.id !== id)
        setToDos(removeById);
    };

    const editToDo = (toDoId, newValue) =>{
        if(!newValue.text){
            return;
        }
        setToDos(prev => prev.map(item => (item.id === toDoId ? newValue : item))); 
    };

    const completeToDos = id =>{
        let updatedToDos = toDos.map(toDo => {
            if (toDo.id === id){
                toDo.done = !toDo.done
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
