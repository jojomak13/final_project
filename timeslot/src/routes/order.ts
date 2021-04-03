import { Router } from 'express';
import * as OrderController from '../controllers/OrderController';

const router = Router();
router.post('/', async (req, res) => {
  const data: any = [];

  await OrderController.store(data, req, res);
});

export { router as OrderRouter };
