import { useState } from "react";

export default function List() {
    const [todoList, setTodoList] = useState([])

    const [title, setTitle] = useState("")

    const handleAddClick = () => {
        setTodoList((prevList) => {
            if (title === "") {
                return prevList;
            } else {
                return [...prevList, { id: prevList.length + 1, todo: title }];
            }
        });
        setTitle("")
    }

    const handleRemoveClick = (index) => {
        setTodoList((prevList) => {
            const newList = [...prevList];
            newList.splice(index,1)
            return newList;
        })
    }

    const handleMoveUp = (index) => {
        if (index > 0) {
            setTodoList((prevList) => {
                const newList = [...prevList];
                [newList[index], newList[index-1]] = [newList[index-1], newList[index]];
                return newList;
            });
        }
    };

    const handleMoveDown = (index) => {
        if (index < todoList.length - 1) {
            setTodoList((prevList) => {
                const newList = [...prevList];
                [newList[index], newList[index + 1]] = [newList[index + 1], newList[index]]; // Swap with the next item
                return newList;
            });
        }
    };

    const list = todoList.map((list,index) => <li key={index}> <div><p>{list.todo}</p> <button onClick={() => handleMoveUp(index)}>Up</button> <button onClick={() => handleMoveDown(index)} >Down</button> <button onClick={() => handleRemoveClick(index)}>Delete</button></div>  </li>)
    return(
        <>
        <div className="inputContainer">
            <h2>To Do List </h2>
            <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
             />
            <button onClick={handleAddClick}>Add</button>
        </div>
        <ul>
            {list}
        </ul>
        </>
    );
}