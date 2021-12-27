import express, { Request, Response, NextFunction } from 'express';
import StatusCodes from 'http-status-codes';
import Issue from '../models/issue';
import mongoose, { Error } from 'mongoose';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const issues = await Issue.find({});
  res.send(issues);
});

router.get('/:id', async (req: Request, res: Response, next) => {
  try {
    const issue: any = await Issue.findOne({ _id: req.params.id });
    res.send(issue);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req: any, res: Response, next) => {
  try {
    const issue = new Issue(req.body);
    const result = await issue.save();
    res.send({ id: result._id.toString() });
  } catch (err) {
    if (err instanceof Error.ValidationError) {
      res.sendStatus(StatusCodes.BAD_REQUEST);
    } else {
      next(err);
    }
  }
});

router.delete('/:id', async (req: any, res: Response, next) => {
  try {
    await Issue.deleteOne({ _id: req.params.id });
    res.sendStatus(StatusCodes.OK);
  } catch (err) {
    next(err)
  }
});

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
});

export default router;