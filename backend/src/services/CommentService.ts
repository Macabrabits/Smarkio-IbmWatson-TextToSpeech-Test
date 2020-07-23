import { Comment } from '../typeorm/entity/Comment';

interface iComment {
  id?: number;
  comment: string;
  save?: () => Promise<any>;
  remove?: () => Promise<any>;
}

const index = async (req: any) => {
  const where = req.query;
  return Comment.find({ order: { id: 'DESC' }, where });
};

const show = async (req: any) => {
  const id = req.params.id;
  const comment = await Comment.findOne(id);
  if (!comment) throw ['Comentário não encontrado.'];
  return comment;
};

const save = async (req: any, commentInjection?: iComment) => {
  const errors = [];
  const body = req.body;
  const id = req.params.id;

  if (!id && !body.comment) errors.push('Comentário é obrigatório.');

  if (errors.length) throw errors;

  const comment = id ? await Comment.findOne(id) : commentInjection || new Comment();

  if (!comment) throw ['Comentário não encontrado para edição.'];

  if (errors.length) throw errors;

  comment.comment = body.comment;

  const duplicateCommentCallback = err => {
    if (err.code === 'ER_DUP_ENTRY') throw ['Este comentário já está cadastrado.'];
    throw err;
  };

  return comment.save().catch(duplicateCommentCallback);
};

const remove = async (req: any) => {
  const id = req.params.id;
  const comment = await Comment.findOne(id);
  if (!comment) throw ['Comentário não encontrado para exclusão.'];
  return await comment.remove();
};

export const CommentService = {
  index,
  show,
  save,
  remove,
};
