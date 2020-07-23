import { Comment } from '../typeorm/entity/Comment';

interface iComment {
  id?: number;
  comment: string;
  save?: () => Promise<any>;
  remove?: () => Promise<any>;
}

const index = async (req: any, inj: { comments?: iComment[] } = {}) => {
  const where = req.query;
  return inj.comments || Comment.find({ order: { id: 'DESC' }, where });
};

const show = async (req: { params: { id: any } }, inj: { comment?: iComment } = {}) => {
  const id = req.params.id;
  const comment: any = inj.comment || (await Comment.findOne(id));
  if (!comment) throw ['Comentário não encontrado.'];
  return comment;
};

const save = async (req: { body: any; params: { id?: any } }, inj: { comment?: iComment } = {}) => {
  const errors = [];
  const body = req.body;
  const id = req.params.id;

  const dbComment = async () => (id ? Comment.findOne(id) : new Comment());

  if (!id && !body.comment) errors.push('Comentário é obrigatório.');

  if (errors.length) throw errors;

  const comment = inj.comment || (await dbComment());
  if (!comment) throw ['Comentário não encontrado para edição.'];

  if (errors.length) throw errors;

  comment.comment = body.comment;

  const duplicateCommentCallback = err => {
    if (err.code === 'ER_DUP_ENTRY') throw ['Este comentário já está cadastrado.'];
    throw err;
  };

  return inj.comment || comment.save().catch(duplicateCommentCallback);
};

const remove = async (req: any, inj: { comment?: iComment } = {}) => {
  const id = req.params.id;
  const comment = inj.comment || (await Comment.findOne(id));
  if (!comment) throw ['Comentário não encontrado para exclusão.'];
  return inj.comment || (await comment.remove());
};

export const CommentService = {
  index,
  show,
  save,
  remove,
};
