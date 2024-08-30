import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helper.js";
import { JWT_TOKEN, statusCode } from "../utils/constants.js";
import bcrypt from 'bcrypt';
import User from '../models/User.model.js';
import jwt from 'jsonwebtoken';

const Register = async(req,res) =>{

    const errors = validationResult(req);
    if(errors.isEmpty()){

        const{name,username,password,email}=req.body;

        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password,salt);

        //password = hashedPassword;
        //check user is already exists
        const userExists = await User.findOne({$or:[{username:username},{email:email}]});

        if(userExists){
            return res.json(statusCode.UNPROCESSABLE_ENTITY,"User Already Exists",null);
        }
        
        //save to database
        try {
            const result = await User.create({
                name:name,
                username:username,
                password:hashedPassword,
                email:email
            });

            //generate token

            const token = jwt.sign({userId:result._id},JWT_TOKEN);

            res.json(jsonGenerate(statusCode.SUCCESS,"User Registered",{userId:result._id,token:token}));
        } catch (error) {
            console.log(error);   
        }


    }
    res.json(jsonGenerate(statusCode.VALIDATION_ERROR,"Validation Error",errors.mapped()));
}

export default Register;