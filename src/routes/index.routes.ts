import express from 'express';
import { hello } from '../controllers/index.controller';

const router = express.Router();

router.route('/').get(hello);

export default router;
