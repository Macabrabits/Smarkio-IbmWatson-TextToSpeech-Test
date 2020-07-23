import { Request, Response } from 'express';
import { CommentService } from '../services/CommentService';
import { controller } from './index';

const index = async (req: Request, res: Response): Promise<Response> => controller(req, res, CommentService.index);

const show = async (req: Request, res: Response): Promise<Response> => controller(req, res, CommentService.show);

const create = async (req: Request, res: Response): Promise<Response> => controller(req, res, CommentService.save);

const update = async (req: Request, res: Response): Promise<Response> => controller(req, res, CommentService.save);

const remove = async (req: Request, res: Response): Promise<Response> => controller(req, res, CommentService.remove);

export const CommentController = {
  index,
  show,
  create,
  update,
  remove,
};
