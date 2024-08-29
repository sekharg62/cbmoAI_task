import {check} from 'express-validator';

export const RegisterSchema = [


    check('name')
    .trim()
    .isLength({min:3})
    .withMessage('Name must be at least 3 characters long'),

    check('username','username is required')
    .exists()
    .isAlphanumeric()
    .withMessage('Username must be alphanumeric')
    .trim().isLength({min:6,max:32}),

    check('password','password is required')
    .exists()
    .isLength({min:6,max:100})
    .trim(),

    check('email','email is required')
    .exists()
    .isEmail(),
]