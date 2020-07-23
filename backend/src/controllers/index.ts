import { Request, Response } from 'express';

const controller = (req: Request, res: Response, callback: Function): Response => {
  return callback(req)
    .then((data: Object) => res.json(data))
    .catch((err: Object) => {
      console.log(err);
      res.status(400).json(err);
    });
};

export { controller };
