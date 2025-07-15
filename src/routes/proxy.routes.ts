import express from 'express';
import axios from 'axios';
import { config } from '../config/config';
import { verifyToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/profile', verifyToken, async (req, res, next) => {
    try {
        const response = await axios.get(`${config.authServiceUrl}/api/auth/profile`, {
            headers: {
                Authorization: `Bearer ${req.cookies.accessToken || req.headers.authorization?.split(' ')[1]}`
            }
        });
        res.json(response.data);
    } catch (err) {
        next(err);
    }
});

export default router;
