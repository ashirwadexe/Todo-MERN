import express from "express";
import connectDB from "./utils/db.js";
import dotenv from "dotenv";
const app = express();
const PORT = 3000;
import userRouter from "./routes/user.route.js";
import todoRouter from "./routes/todo.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

//always declare dotenv.config() to access the .env file using process.env
dotenv.config();
//helping to make cookies available to routes
app.use(cookieParser());
//converts the json data to js code
app.use(express.json());

app.use(
    cors({
        origin: "http://localhost:5174",
        credentials: true,
    })
);


//apis
app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", todoRouter);


app.listen(PORT, () => {
    connectDB();
    console.log(`app is listening on PORT ${PORT}`);
});