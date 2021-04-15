import { Router } from "express";
import { CountryRouter } from "./country";
import { TherapistListRouter } from "./therapists";

const router = Router();

router.use('/country', CountryRouter);
router.use('/therapists', TherapistListRouter);

export { router as PublicRouter };
