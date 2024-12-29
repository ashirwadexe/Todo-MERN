import { Todo } from "../model/todo.model.js";

export const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;

        if(!title || !description) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        //here we are creating a new todo and storing it in a variable names as "todo"
        const todo = new Todo({title, description});
        //savng the todo in MongoDB
        todo.save();

        //returning success msg with todo
        return res.status(200).json({
            message: "Todo Created.",
            success: true,
            todo
        });

    } catch (error) {
        console.log(error)
    }
};

//BUSINESS LOGIC TO GET ALL THE TODOS
export const getAllTodos = async (req, res) => {
    try {
        //this will find all the todos 
        const todos = await Todo.find();

        return res.status(200).json({
            success: true,
            todos
        });

    } catch (error) {
        console.log(error);
    }
};

//BUSINESS LOGIC TO UPDATE A TODO
export const updateTodo = async (req, res) => {
    try {
        //here we are getting todoId from url
        const todoId = req.params.todoId;
        const { title, description } = req.body;

        //finding the todo by id and updating its title & description
        const todo = await Todo.findByIdAndUpdate(todoId, {title, description}, {new: true});
        await todo.save();

        return res.status(200).json({
            message: "Todo Updated",
            success: true,
            todo
        });
         
    } catch (error) {
        console.log(error);
    }
};

//BUSINESS LOGIC FOR DELETEING A TODO
export const deleteTodo = async (req, res) => {
    try {

       const todoId = req.params.todoId;
       await Todo.findByIdAndDelete(todoId);
       return res.status(200).json({
        message: "Todo Deleted.",
        success: true
       });

    } catch (error) {
        console.log(error);
    }
};