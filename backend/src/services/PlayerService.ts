import { Comment } from '../typeorm/entity/Comment';
import { IbmTtsClient } from '../utilities/IbmTtsClient';
const commentCli = new IbmTtsClient();
import { Response, Request } from 'express';
const mediaserver = require('mediaserver');

const stream = async (req: Request | { params: { id: any } }, res: Response, inj: { comment?: any } = {}) => {
  const id = req.params.id;
  // const comment: any = inj.comment || (await Comment.findOne(id));
  const comment = await Comment.findOne(id);
  if (!comment) throw ['Comentário não encontrado.'];

  commentCli
    .convert(comment.comment)
    .then(buffer => {
      res.setHeader('Content-Type', 'audio/wav');
      //  res.setHeader('Content-Disposition', `attachment; filename=audio.wav`);
      res.setHeader('Content-Disposition', `inline`);
      res.write(buffer);
    })
    .then(() => res.end());

  // mediaserver.pipe(req, res, 'audio.wav');

  // commentCli
  //   .convert('Hello')
  //   .then(repairedFile => {
  //     fs.writeFileSync('audio.wav', repairedFile);
  //     console.log('audio.wav written with a corrected wav header');
  //   })
  //   .then(file => {
  //     mediaserver.pipe(req, res, file);
  //   })
  //   .then(() => res.end());

  return;
};

export const PlayerService = { stream };
