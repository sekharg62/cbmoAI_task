import { statusCode } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helper.js";
import Task from "../models/Task.model.js";
import User from "../models/User.model.js";
import { validationResult } from "express-validator";

export const DeleteTask = async(req,res)=>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.json(jsonGenerate(statusCode.VALIDATION_ERROR,"task id is needed",errors.mapped()));
    }

    try {
        const taskResult = await Task.findOneAndDelete({
            _id:req.body.task_id,
            userId: req.useId,
        });

        if(taskResult){

            const user = await User.findOneAndUpdate({
                _id: req.body.task_id
            },
            {
                $pull:{
                    tasks: req.body.task_id
                }
            });

            return res.json(jsonGenerate(statusCode.SUCCESS,"task deleted successfully",null));
        }

    } catch (error) {
        return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY,"task cannot deleted",null));
    }
}