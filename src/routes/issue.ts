import express, { Request, Response, NextFunction as Next } from 'express';
import StatusCodes from 'http-status-codes';
import Issue from '../models/issue';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const issues = await Issue.find({});
  res.send(issues);
});

router.get('/:id', async (req: Request, res: Response) => {
  const issue: any = await Issue.findOne({ _id: req.params.id });
  res.send(issue);
});

router.post('/', async (req: Request, res: Response) => {
  const issue = new Issue(req.body);
  const result = await issue.save();
  res.send({ id: result._id.toString() });
});

router.put('/:id', async (req: Request, res: Response) => {
  const issue = await Issue.findOne({ _id: req.params.id });
  issue.title = req.body.title;
  issue.content = req.body.content;
  const savedIssue = await issue.save();
  res.send(savedIssue);
});

router.delete('/:id', async (req: any, res: Response) => {
  await Issue.deleteOne({ _id: req.params.id });
  res.sendStatus(StatusCodes.OK);
});

router.use((err: Error, req: Request, res: Response, next: Next) => {
  res.sendStatus(StatusCodes.BAD_REQUEST);
});

export default router;