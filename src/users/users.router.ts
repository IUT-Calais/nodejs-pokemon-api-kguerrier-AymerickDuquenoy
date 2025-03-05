import { Router } from 'express';
import {postUsers,postLogin} from './users.controller';

export const userRoute = Router();

userRoute.post('/', postUsers);
userRoute.post('/login',postLogin);