import express, { Request, Response, NextFunction as Next } from 'express';
import StatusCodes from 'http-status-codes';
import User from '../models/user';

const router = express.Router();

router.get('/:email', async (req: Request, res: Response, next: Next) => {
  const user = await User.findOne(
    { email: req.params.email },
    { username: 1, email: 1 });
  res.send({ user });
});

router.post('/', async (req: Request, res: Response, next: Next) => {
  const user = new User(req.body);
  const result = await user.save();
  res.send({ email: result.email.toString() });
});

router.delete('/:email', async (req: any, res: Response, next: Next) => {
  await User.deleteOne({ email: req.params.email });
  res.sendStatus(StatusCodes.OK);
});

router.use((err: Error, req: Request, res: Response, next: Next) => {
  res.sendStatus(StatusCodes.BAD_REQUEST);
});

export default router;