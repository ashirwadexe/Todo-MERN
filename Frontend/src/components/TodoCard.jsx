import React, { useEffect, useState } from 'react'
import { Card, CardContent } from './ui/card';
import axios from 'axios';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const TodoCard = () => {
    const [todos, setTodos] = useState([]);

    //funtion to get all the todos
    useEffect(() => {
        const fetchTodo = async () => {
            try {
                //get ke liye hame kisi header ki jrurut nhi h 
                const res = await axios.get("http://localhost:3000/api/v1/todo/todos");
                console.log(res);
                if(res.data.success) {
                    setTodos(res.data.todos);
                 }
            } catch (error) {
                console.log(error); 
            }
        }
        fetchTodo();
    }, []);

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:3000/api/v1/todo/delete/${id}`);
            if(res.data.success) {
                setTodos((prevTodos) => prevTodos.filter(todo => todo._id !== id));
                toast.success(res.data.message);
            }

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className='mx-20 px-10 grid grid-cols-2 gap-5'>
            {
                todos.map((todo) => (
                    <Card 
                        key={todo._id}
                        className="mb-4 p-3"
                    >
                        <CardContent>
                            <p className='text-xs text-gray-400 mb-3'>{todo.createdAt}</p>
                            <h2 className='text-lg font-semibold'>{todo.title}</h2>
                            <p className='text-sm text-gray-500'>{todo.description}</p>

                            <Button 
                                variant="outline" 
                                onClick={() => (handleDelete(todo._id))}
                                className="mt-3 bg-red-400 text-white hover:bg-green-400 hover:text-white"
                            >
                                <Trash2/>
                            </Button>
                        </CardContent>
                    </Card>
                ))
            }
        </div>
    )
}

export default TodoCard 