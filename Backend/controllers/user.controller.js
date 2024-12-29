import { User } from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//registration business logic
export const register = async (req, res) => {
    try {
        const { name, email, password} = req.body;
        //check if everthing is present n 
        if(!name || !email || !password) {
            return res.status(404).json({
                message: "Something is missing",
                success: false
            });
        }

        //we check if someone is already have an account we the same email
        const user = await User.findOne({email});
        if(user) {
            return res.status(401).json({
                message: "Email already exists, try another one",
                success: false
            });
        };

        //yaha aa gye mtlb user unique hai, uska password hashed kr ke save kr lenge
        const hashedPassword = await bcrypt.hash(password, 10);

        //creating new user account here
        await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.status(200).json({
            message: "Account Created Successfully!",
            success: true
        });

    } catch (error) {
        console.log(error);
    }
};

//LOGIN BUSSINESS LOGIC
export const login = async (req, res) => {
    try {
        const { email, password} = req.body;
        if(!email || !password) {
            return res.status(401).json({
                message: "Something is missing",
                success: false
            });
        };

        //find the user with email id so that we can login
        let user = await User.findOne({email});
        //if user not found
        if(!user) {
            res.status(404).json({
                message:"User not found",
                success: false
            });
        };

        //user found, compare its password
        const isPassMatched = await bcrypt.compare(password, user.password);
        if(!isPassMatched) {
            return res.status(404).json({
                message:"Password is incorrect!",
                success:false
            });
        };

        //if user is valid, a tokenData of user is created which stores only the user'd Id
        const tokenData = {
            userId: user._id
        };
        
        //we will now signin in our account using jwt-jsonwebtoken, a token is created using tokenData, secretKey to access the password
        //tokenData - it is the user's Id which we stored in tokenData if the user is valid
        //secretKey - jwt requires it to uniquely match the password(salting in hashing)
        //expiresIn - the sesson will expire in 1 day
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn: '1d'});

        user = {
            _id: user._id,
            name: user.name,
            email: user.email
        };

        //here, token is stored in the browser as a cookies so whenever user try to login broser check the authenticity using this cookie
        return res.status(200).cookie("token", token, {maxAge: 1*24*60*60*1000, httpsOnly: true, sameSite: 'strict'}).json({
            message: `Welcome ${user.name}!`,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};

//LOGOUT BUSSINES LOGIC
export const logout = async (req, res) => {
    try {
        //made the token stored in browser null and maxAge set to zero
        res.status(200).cookie("token", "", {maxAge: 0}).json({
            message: "Logged Out !!!",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};