import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const changeHandler = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    };

    const loginhandler = async () => {
        try {
            const res = await axios.post("http://localhost:3000/api/v1/user/login", user, //this user is we are sending user data i.e. email and password to database
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
                navigate("/");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <>
            <Navbar/>
            <div className='mx-20 px-10 my-10 flex flex-col gap-3 '>
                <div className='flex flex-col gap-3'>
                    <Input
                        type="text"
                        placeholder="Email"
                        value={user.email}
                        name="email"
                        onChange={changeHandler}
                    />
                    <Input
                        type="password"
                        placeholder="password"
                        value={user.password}
                        name="password"
                        onChange={changeHandler}
                    />
                </div>
                <Button className="w-fit " onClick={loginhandler }>Login </Button>
            </div>
        </>
        
    )
}

export default Login