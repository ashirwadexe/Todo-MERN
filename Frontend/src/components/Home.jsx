import React from 'react'
import Navbar from './Navbar'
import Todo from './Todo'
import TodoCard from './TodoCard'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Todo/>
        <TodoCard/>
    </div>
  )
}

export default Home