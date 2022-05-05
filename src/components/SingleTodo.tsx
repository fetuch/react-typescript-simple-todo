import React, { useEffect, useRef, useState } from 'react'
import { Todo } from '../model'
import { AiFillEdit, AiFillDelete, AiOutlineCheck } from 'react-icons/ai'
import './styles.css'

interface Props {
    todo: Todo,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    const handleDone = (id: number) => {
        setTodos(todos.map((todo) => {
            if (todo.id === id) {
                todo.isDone = !todo.isDone
            }

            return todo
        }))
    }

    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    const handleSubmit = (e: React.FormEvent, id: number) => {
        e.preventDefault();

        setTodos(todos.map((todo) => {
            if (todo.id === id) {
                todo.todo = editTodo;
            }

            return todo
        }))

        setEdit(false);
    }

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    return (
        <form className='todos__single' onSubmit={(e) => handleSubmit(e, todo.id)}>
            {
                edit ? (
                    <input
                        ref={inputRef}
                        value={editTodo}
                        onChange={(e) => setEditTodo(e.target.value)}
                        className='todos__single--text'
                        type="input"
                    />
                ) : (
                    todo.isDone ? (
                        <s className='todos__single--text'>{todo.todo}</s>
                    ) : (
                        <span className='todos__single--text'>{todo.todo}</span>
                    )
                )
            }

            <div>
                <span className='icon' onClick={() => {
                    if (!todo.isDone) {
                        setEdit(!edit);
                    }
                }}>
                    <AiFillEdit />
                </span>

                <span className='icon' onClick={() => handleDelete(todo.id)}><AiFillDelete /></span>

                <span className='icon' onClick={() => handleDone(todo.id)}><AiOutlineCheck /></span>
            </div>
        </form>
    )
}

export default SingleTodo