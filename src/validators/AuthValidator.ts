import { checkSchema } from 'express-validator';

export const AuthValidator = {
    singup: checkSchema({
        name: {
            trim: true,
            isLength: {options: {min: 2}}, errorMessage: 'Nome precisa ter pelo menos 2 caracteres.'
        },
        email: {
            notEmpty: true,
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'E-mail Inválido'
        },
        password: {
            isLength: {
                options: {min: 2}, errorMessage: 'Senha precisa ter pelo menos 2 caracteres.'
            }
        },
        state: {
            notEmpty: true,
            errorMessage: 'Estado não preenchido'
        }
    })
}