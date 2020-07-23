import { Request, Response } from 'express';
import { PlayerService } from '../services/PlayerService';
import { controller } from './index';

const stream = async (req: Request, res: Response) => PlayerService.stream(req, res);

export const PlayerController = { stream };
