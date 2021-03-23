import React, {useState, useEffect, useRef} from 'react';

let numberId = 0

function ToDoForm(props) {
    const [input, setInput] = useState(props.edit ? props.edit.value:'');

    const inputRef = useRef(null)

    useEffect(()=>{
        inputRef.current.focus()
    });

    const handleSubmit = e => {
        e.preventDefault();

        props.onSubmit({
            id: numberId++,
            text: input,
            done: false
        });
        setInput('');
    };

    const handleChange = e =>{
        setInput(e.target.value);
    }

    return (
        <form className= "to-do-form" onSubmit={handleSubmit}>            
            <>
            <input
                type="text"
                placeholder={props.edit ? "Edit your item":"Add an item" }
                value={input}
                name="text"
                className="to-do-input"
                onChange={handleChange}
                ref={inputRef}
            />
            <button className="button-input">{props.edit ? "Edit":"Add" }</button>
            </>                
        </form>
    )
}

export default ToDoForm
