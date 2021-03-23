import React, {useState} from 'react';
import ToDoForm from './ToDoForm';
import {RiCloseFill} from 'react-icons/ri';
import {FiEdit3} from 'react-icons/fi';

function ToDo({toDos, completeToDos, removeToDo, editToDo}) {
    const [edit, setEdit] = useState({
        id:null,
        value: '',
        done: false
    })

    const submitEdit = value => {
        editToDo(edit.id, value)
        setEdit({
            id: null,
            value: '',
            done: false
        });
    };

    if (edit.id){
        return <ToDoForm edit={edit} onSubmit={submitEdit}/>;
    }
    
    return toDos.map((toDo, index) =>(
        <div
        className = {toDo.isComplete ? 'to-do-row complete' : 'to-do-row'}
        key = {index}>
            <div 
            key={toDo.id} onClick={() => completeToDos(toDo.id)}>
                {toDo.text}
            </div>
            <div
            className = "icons">
                <FiEdit3
                onClick={()=> setEdit({id: toDo.id, value: toDo.text})}
                className='edit-icon'
                />
                <RiCloseFill
                onClick={()=> removeToDo(toDo.id)}
                className='delete-icon'
                />                
            </div>
        </div>
    ))
}

export default ToDo
