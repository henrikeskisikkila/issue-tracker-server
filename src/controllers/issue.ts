import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import Issue from '../models/issue';

/**
 * Get all issues that includes the project which is defined by projectId
 * @route GET /issues
 */
export const getIssues = async (req: Request, res: Response) => {
  const projectId = req.query.projectId;

  if (!projectId) {
    res.sendStatus(StatusCodes.BAD_REQUEST);
    return
  }

  /**
   * Get an issue that includes the project which is defined by projectId
   * @route GET /issue
   */
  const issues = await Issue.find({
    projectId: projectId,
    createdBy: req.user['_id'].toString()
  });

  res.send(issues);
};

/**
 * Get one issue based on issue and issue creator ids
 * @route GET /issue/:id
 */
export const getIssue = async (req: Request, res: Response) => {
  const issue: any = await Issue.findOne({
    _id: req.params.id,
    createdBy: req.user['_id'].toString()
  });

  res.send(issue);
};

/**
 * Save an issue to the database
 * @route POST /issue
 */
export const save = async (req: Request, res: Response) => {
  const issue = new Issue(req.body);
  const result = await issue.save();

  res.send({ id: result._id.toString() });
};

/**
 * Update an issue
 * @route PUT /issue/:id
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
 * Remove an issue
 * @route DELETE /issue/:id
 */
export const remove = async (req: Request, res: Response) => {
  await Issue.deleteOne({ _id: req.params.id, createdBy: req.user['_id'].toString() });

  res.sendStatus(StatusCodes.OK);
}