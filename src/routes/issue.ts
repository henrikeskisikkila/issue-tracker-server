import express, { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import HttpStatusCodes from 'http-status-codes';
import { IIssue, Issue } from '../models/issue';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const issues = await Issue.find({});
  res.send(issues);
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const issue: any = await Issue.findOne({ _id: req.params.id });
    res.send(issue);
  } catch (err) {
    console.error(err);
    res.json({ error: 'Can not get the issue from the database' });
  }
});

router.post('/', [
  check('title', 'Please include a valid title').exists()
], async (req: any, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ errors: errors.array() })
  }

  try {
    const issue = new Issue(req.body);
    const result = await issue.save();
    res.send({ id: result._id.toString() });
  } catch (err) {
    console.error(err);
    res.json({ error: 'Can not save to the database' });
  }
});

router.delete('/:id', async (req: any, res: Response) => {
  res.send('DELETE ' + req.params.id);
});

export default router;