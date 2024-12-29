import React from 'react'
import { Button } from './ui/button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Navbar = () => {

  const naviagate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/user/logout");
      if(res.data.success) {
        toast.success(res.data.message);
        naviagate("/login");
      }
    } catch (error) {
      toast.success(error.response.data.message);
    }
  } 
  return (
    <>
        <div className='flex items-center justify-between mx-20 px-10 py-2'>
            <div>
                <h1 className='text-3xl font-bold text-green-500'>Rojmarra📑</h1>
            </div>
            <div>
                <Button onClick={logoutHandler} variant="outline">Logout</Button>
            </div>
        </div>
    </>
  )
}

export default Navbar