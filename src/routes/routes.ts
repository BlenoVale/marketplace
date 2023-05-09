import esxpress, { Request, Response } from 'express';

import AuthController from '../controllers/AuthController';
import UserController from '../controllers/UserController';
import AdsController from '../controllers/AdsController';

import { Auth } from '../middlewares/Auth';

import { AuthValidator } from '../validators/AuthValidator';

const router = esxpress.Router();

router.get('/ping', (req: Request, res: Response) => {
    res.json({ pong: true });
});

router.get('/states', UserController.getStates);

router.post('/user/signin', AuthController.signin);
router.post('/user/signup', AuthValidator.singup, AuthController.signup);

router.get('/user/me', Auth.private, UserController.info);
router.put('/user/me', Auth.private, UserController.editAction);

router.get('/categories', AdsController.getCategories);
router.post('/ad/add', Auth.private, AdsController.addAction);
router.get('ad/list', AdsController.getList);
router.get('ad/item', AdsController.getItem);
router.post('ad/:id', Auth.private, AdsController.aditAction);


export default router;