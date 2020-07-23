import { Comment } from '../typeorm/entity/Comment';
import { IbmTtsClient } from '../utilities/IbmTtsClient';
const commentCli = new IbmTtsClient();
import { Response, Request } from 'express';
import { RedisCli } from '../utilities/RedisCli';

const stream = async (req: Request | { params: { id: any } }, res: Response, inj: { comment?: any } = {}) => {
  const id = req.params.id;
  const comment = await Comment.findOne(id);
  if (!comment) throw ['Comentário não encontrado.'];

  const getBuffer = () =>
    commentCli.convert(comment.comment).then(buffer => {
      return { type: 'Buffer', data: buffer };
    });

  const buffer = await RedisCli.getOrSet(`comment:${comment.comment}`, getBuffer)
  .then(object => Buffer.from(object.data));

  res.setHeader('Content-Type', 'audio/wav');
  //  res.setHeader('Content-Disposition', `attachment; filename=audio.wav`);
  res.setHeader('Content-Disposition', `inline`);
  res.write(buffer);
  res.end();
};

export const PlayerService = { stream };
