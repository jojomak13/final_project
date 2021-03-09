import { Router } from 'express';

const router = Router();

router.get('/me', (req, res) => {
  res.send('current doctor sent');
});

router.post('/logout', (req, res) => {
  res.send('loged out');
});

router.post('/login', (req, res) => {
  res.send('doctor login');
});

router.post('/register', (req, res) => {
  res.send('loged up');
});

export { router as authRouter };
