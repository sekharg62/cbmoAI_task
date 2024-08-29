import { validationResult } from "express-validator"
import { jsonGenerate } from "../utils/helper.js";
import { statusCode } from "../utils/constants.js";
import Task from "../models/Task.model.js";
import User from "../models/User.model.js";

export const createTodo = async(req,res)=>{

    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.json(jsonGenerate(statusCode.VALIDATION_ERROR,"Task is required",error.mapped()));
    };

    try {
        const result = await Task.create({
            userId:req.userId,
            desc: req.body.desc,
        });

        if(result){
            const user = await User.findOneAndUpdate(
                {_id: req.userId},
                {
                    $push: {
                        tasks: result
                    }
                }
            );

            return res.json(jsonGenerate(statusCode.SUCCESS,"Task created succssfully",result));
        }

    } catch (error) {
        return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY,"Something went wrong",error));
    }

}