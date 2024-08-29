import { validationResult } from "express-validator";
import User from "../models/User.model.js";
import { json } from "express";
import { jsonGenerate } from "../utils/helper.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { JWT_TOKEN, statusCode } from "../utils/constants.js";


const Login = async (req, res) => {

    const errors = validationResult(req);
    if(errors.isEmpty()){
        const{username,password} = req.body;

        //check if the user exists
        const user = await User.findOne({username:username})

        if(!user){
           return  res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY,"Invalid username or password"));
        }
        
        //check if the password is correct
        const verified  =  bcrypt.compareSync(password,user.password);

        if(!verified){
            return res.json(jsonGenerate(statusCode.VALIDATION_ERROR,"Invalid username or password"));
        }

        //generate token
        const token = Jwt.sign({userId: user._id},JWT_TOKEN);

        return res.json(jsonGenerate(statusCode.SUCCESS,"Login successful",{userId: user._id, token:token}));
        

    }
    res.json(jsonGenerate(statusCode.VALIDATION_ERROR,"validation error",errors.mapped()));

}

export default Login;