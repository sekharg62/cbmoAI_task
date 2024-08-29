import { validationResult } from "express-validator"
import { jsonGenerate } from "../utils/helper.js";
import { statusCode } from "../utils/constants.js";
import Task from "../models/Task.model.js";

export const MarkTaskAsDone = async (req, res) => {

    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.json(jsonGenerate(statusCode.VALIDATION_ERROR,"task_id is required",errors.mapped()));
    }

    try {
        const task = await Task.findByIdAndUpdate({
            _id: req.body.task_id,
            userId: req.userId,
        },[{
            $set:{
                isCompleted: {
                    $eq:[false,"$isCompleted"]
                }
            }
        }]);

        if(task){
            return res.json(jsonGenerate(statusCode.SUCCESS,"Task marked as done",task));
        }

    } catch (error) {
        return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY,"Task not updated",null));
    }

}