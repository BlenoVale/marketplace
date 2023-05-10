import { Request, Response, NextFunction } from 'express'
import User from '../models/user';

export const Auth = {
    private: async (req: Request, res: Response, next: NextFunction) => {
        
        let token = '';
        if (req.query.token) {
            token = req.query.token as string;
        } else if (req.body.token) {
            token = req.body.token as string;
        } else {
            res.json({ notallowed: true })
            return;
        }

        if (token.trim() == '') {
            res.json({ notallowed: true })
            return;
        }

        const user = await User.findOne({ token });

        if(!user){
            res.json({ notallowed: true })
            return;
        }
        
        return next();
    }
}