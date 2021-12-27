import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  // const issues = await Issue.find({});
  res.send({});
});

export default router;