import { RequestValidationError } from '@hti/common';
import { Router } from 'express';
import * as OrderController from '../controllers/OrderController';
import { StoreOrderReruest } from '../requests/patient/StoreOrderRequest';

const router = Router();

router.post('/', async (req, res) => {
  const data = await StoreOrderReruest.validateAsync(req.body, {
    abortEarly: false,
    stripUnknown: true,
  }).catch((err) => {
    throw new RequestValidationError(err);
  });

  await OrderController.store(data, req, res);
});

router.delete('/:id', OrderController.cancel);

export { router as OrderRouter };
