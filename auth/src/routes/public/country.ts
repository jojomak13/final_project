import { Request, Response, Router } from "express";
import { Country } from "../../models/Country";

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
    const countries = await Country.find({});
    res.status(200).json({
        status: true,
        msg: countries,
      });
});

export { router as CountryRouter };