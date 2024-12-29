import React, { useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import axios from 'axios';
import toast from 'react-hot-toast';

const Todo = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState(""); 

    //here we will add Todo
    const addTodoHandler = async () => {
        try {
            const res = await axios.post("http://localhost:3000/api/v1/todo/create", {title, description}, 
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
             );
             console.log(res);
             if(res.data.success) {
                toast.success(res.data.message);
                setTitle("");
                setDescription("");
             }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className='mx-20 my-10 px-10 flex items-center justify-center flex-col gap-5'>
            <div className='w-full'>
                <Input
                    type="text"
                    placeholder="Add title of todo"
                    value={title}
                    id={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mb-3"
                />
                <Textarea
                    type="text"
                    placeholder="Add description of todo"
                    value={description}
                    id={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <Button onClick={addTodoHandler} variant="outline">Add Todo🚀</Button>
        </div>
    )
}

export default Todo