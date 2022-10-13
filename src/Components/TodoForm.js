import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import TodoItem from './TodoItem';

function TodoForm(){

    const link = 'http://localhost:5000/api/v1/tasks';
    const [todos, setTodos] = useState([]);
    const [todoName, setName] = useState('');
    const [todoComment, setComment] = useState('');
    const [editTodoData, setEditTodoData] = useState(null);

    useEffect(() =>{
        getTasks();
    }, [])

    useEffect(() =>{
        if(editTodoData){
            setName(editTodoData.name ? editTodoData.name: '')
            setComment(editTodoData.comment ? editTodoData.comment: '')
        }
    },[editTodoData])

    const editTodos = (todoData) =>{
        setEditTodoData(todoData)

    }

    const getTasks = async () =>{
        const data = await axios.get(link);
        setTodos(data.data.data);
    }

    const addTodos = async (e) =>{
        e.preventDefault(); 
        const todoData = {
            name: todoName ? todoName: undefined,
            comment: todoComment ? todoComment: undefined
        }
        if(!editTodoData){
            await axios.post(link, todoData)
        }else{
            await axios.patch(`http://localhost:5000/api/v1/tasks/${editTodoData._id}`, todoData)
        }

        setComment('');
        setName('');
        
        getTasks();
        setEditTodoData('');
    }


    const insertTodos = () =>{
        return <div className='Texteditor'>
            <form action='' onSubmit={addTodos}>
                <div className='input-control'>
                    <input type="text" 
                    placeholder='Enter Name...'
                    value={todoName}
                    onChange={ (e) => setName(e.target.value) }
                    required
                    />
                </div>
                <div className='input-control'>
                    <textarea name='' id='' cols='30' rows='6' 
                    placeholder='Add Comment...'
                    value={todoComment}
                    onChange={ (e) => setComment(e.target.value) }
                    required
                    >

                    </textarea>
                </div>
                <button type ='submit' className='submit-btn'>Add Todo</button>
            </form>
        </div>
    }



    const renderTodos = () =>{

        //Sorting Todo Data
        let sortedTodos = [...todos];

        sortedTodos = sortedTodos.sort((a,b) =>{
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return sortedTodos.map((todo, i) =>{
            return <TodoItem todos={todo} key={i} getTodos={getTasks} editTodos={editTodos} />
        })
    }



    return(
        <TodoFormStyled>
            {insertTodos()}
            {renderTodos()}
        </TodoFormStyled>
    )
}

const TodoFormStyled = styled.div`
    width: 80%;
    display: flex;
    align-items: center;
    flex-direction: column;
    align-self: flex-start;
    .Texteditor{
        width: 60%;
        padding-top: 4rem;
        form{
            padding-bottom: 4rem;
            .submit-btn{
                padding: 0.5rem 1.5rem;
                border: none;
                outline: none;
                cursor: pointer;
                border-radius: 34px;
                color: var(--white);
                filter: drop-shadow(0px 4px 28px rgba(0, 0, 0, 0.25));
                background-color: var(--bg-green);
            }
        }
    }
    
`;
export default TodoForm;