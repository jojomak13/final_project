import { Router } from 'express';

const router = Router();

router.get('/doctor/auth/get-doctor', (req, res) => {
    res.send('current doctor sent');
});


router.post('/doctor/auth/logout', (req, res) => {
    res.send('loged out');
});

router.post('/doctor/auth/login', (req, res) => {
    res.send('doctor login');
});


router.post('/doctor/auth/register', (req, res) => {
    res.send('loged up');
});

export { router as authRouter };