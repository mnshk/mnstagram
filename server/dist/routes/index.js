import { Router } from "express";
import auth from './auth.js';
const router = Router();
router.use('/auth', auth);
router.get('/', (req, res) => {
    res.send({ message: 'Hi, mom' });
});
export default router;
