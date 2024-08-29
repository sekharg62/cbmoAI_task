import express from 'express';
import Register from '../controllers/Register.controller.js';
import { RegisterSchema } from '../validationSchema/RegisterSchema.js';
import Login from '../controllers/Login.controller.js';
import { LoginSchema } from '../validationSchema/LoginSchema.js';
import { createTodo } from '../controllers/task.controller.js';
import { check } from 'express-validator';

const apiRoute = express.Router();
export const apiProtected = express.Router();

apiRoute.post('/register',RegisterSchema,Register);
apiRoute.post('/Login',LoginSchema,Login);


//protected routes
apiProtected.post('/createtask',[check("desc","task desc is required").exists()],createTodo);


export default apiRoute;