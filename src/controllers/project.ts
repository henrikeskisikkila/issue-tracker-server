import { Request, Response, NextFunction as Next } from 'express';
import StatusCodes from 'http-status-codes';
import Project from '../models/project';

export const create = async (req: Request, res: Response, next: Next): Promise<void> => {
  const project = new Project(req.body);
  const result = await project.save();
  res.send(result);
};


// export const issues = async (req: Request, res: Response, next: Next): Promise<void> => {
//   const issues = await Issue.find({});
//   res.send(issues);
// };

// export const issue = async (req: Request, res: Response, next: Next): Promise<void> => {
//   const issue: any = await Issue.findOne({ _id: req.params.id });
//   res.send(issue);
// };



// export const update = async (req: Request, res: Response, next: Next): Promise<void> => {
//   const issue = await Issue.findOne({ _id: req.params.id });
//   issue.title = req.body.title;
//   issue.content = req.body.content;
//   const savedIssue = await issue.save();
//   res.send(savedIssue);
// };

// export const remove = async (req: Request, res: Response, next: Next): Promise<void> => {
//   await Issue.deleteOne({ _id: req.params.id });
//   res.sendStatus(StatusCodes.OK);
// }