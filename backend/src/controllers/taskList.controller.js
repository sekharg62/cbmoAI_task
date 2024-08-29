import { statusCode } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helper.js";
import User from "../models/User.model.js";

export const GetTasks = async(req,res)=>{
    try {
        const list = await User.findById(req.userId)
        .select("-password")
        .populate('tasks')
        .exec();

        return res.json(jsonGenerate(statusCode.SUCCESS,"Task List",list));


    } catch (error) {
        return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY,"Something went wrong",error));
    }
}