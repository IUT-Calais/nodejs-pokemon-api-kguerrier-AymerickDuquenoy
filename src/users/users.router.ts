import { Router } from 'express';
import {postUsers} from './users.controller';

export const userRoute = Router();

userRoute.post('/', postUsers);