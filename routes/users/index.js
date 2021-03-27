import { Router } from 'express';
import {addUser} from '../../controllers/Users.js';

const router = Router();

router.get('/', addUser);
export default router;