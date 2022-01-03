import { Request, Response, NextFunction as Next } from 'express';
import StatusCodes from 'http-status-codes';
import Issue from '../models/issue';

export const issues = async (req: Request, res: Response, next: Next): Promise<void> => {
  const projectId = req.query.projectId;

  if (!projectId) {
    res.sendStatus(StatusCodes.BAD_REQUEST);
    return
  }

  const issues = await Issue.find({
    projectId: projectId,
    createdBy: req.user['_id'].toString()
  });
  res.send(issues);
};

export const issue = async (req: Request, res: Response, next: Next): Promise<void> => {
  const issue: any = await Issue.findOne({
    _id: req.params.id,
    createdBy: req.user['_id'].toString()
  });
  res.send(issue);
};

export const save = async (req: Request, res: Response, next: Next): Promise<void> => {
  const issue = new Issue(req.body);
  const result = await issue.save();
  res.send({ id: result._id.toString() });
};

export const update = async (req: Request, res: Response, next: Next): Promise<void> => {
  const issue = await Issue.findOne({
    _id: req.params.id,
    createdBy: req.user['_id'].toString()
  });

  if (!issue) {
    res.sendStatus(StatusCodes.NOT_FOUND);
    return
  }

  issue.title = req.body.title;
  issue.content = req.body.content;
  const savedIssue = await issue.save();
  res.send(savedIssue);
};

export const remove = async (req: Request, res: Response, next: Next): Promise<void> => {
  await Issue.deleteOne({ _id: req.params.id, createdBy: req.user['_id'].toString() });
  res.sendStatus(StatusCodes.OK);
}