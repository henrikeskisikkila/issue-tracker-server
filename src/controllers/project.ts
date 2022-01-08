import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import Project from '../models/project';

export const create = async (req: Request, res: Response) => {
  const project = new Project(req.body);
  const result = await project.save();
  res.send(result);
};

export const update = async (req: Request, res: Response) => {
  const project = await Project.findOne({ _id: req.params.id });
  project.name = req.body.name;
  project.description = req.body.description;
  const updatedProject = await project.save();
  res.send(updatedProject);
}

export const getProjects = async (req: Request, res: Response) => {
  const userId = req.query.userId;

  if (!userId) {
    res.sendStatus(StatusCodes.BAD_REQUEST);
    return
  }

  const projects = await Project.find({ createdBy: userId });
  res.send(projects);
}