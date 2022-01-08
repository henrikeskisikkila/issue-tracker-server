import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import Issue from '../models/issue';

/**
 * Get all issues that includes the project which is defined by projectId
 * 
 * @param req represents the HTTP request and has properties for the request
 *             query string, parameters, body, HTTP headers.
 * @param res represents the HTTP response that an Express app sends when
 *            it gets an HTTP request.
 */
export const getIssues = async (req: Request, res: Response) => {
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

/**
 * Get one issue based on issue and issue creator ids
 */
export const getIssue = async (req: Request, res: Response) => {
  const issue: any = await Issue.findOne({
    _id: req.params.id,
    createdBy: req.user['_id'].toString()
  });

  res.send(issue);
};

/**
 * 
 * @param req 
 * @param res 
 */
export const save = async (req: Request, res: Response) => {
  const issue = new Issue(req.body);
  const result = await issue.save();

  res.send({ id: result._id.toString() });
};

/**
 * 
 * @param req 
 * @param res 
 */
export const update = async (req: Request, res: Response) => {
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

/**
 * 
 * @param req 
 * @param res 
 */
export const remove = async (req: Request, res: Response) => {
  await Issue.deleteOne({ _id: req.params.id, createdBy: req.user['_id'].toString() });

  res.sendStatus(StatusCodes.OK);
}