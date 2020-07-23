import { CommentService } from '../src/services/CommentService';
import typeorm = require('typeorm');

describe('Comentários', () => {
  test('Listar', async () => {
    const comments = [
      {
        id: 5,
        comment: '011',
        created_at: '2020-07-12T00:04:40.421Z',
        updated_at: '2020-07-12T00:05:07.000Z',
      },
      {
        id: 1,
        comment: '011',
        created_at: '2020-07-11T21:51:19.749Z',
        updated_at: '2020-07-11T21:51:19.749Z',
      },
    ];

    typeorm.BaseEntity.find = jest.fn().mockReturnValue(comments);
    const res = await CommentService.index({});
    expect(res).toEqual(comments);
  });

  test('Exibir se existir', async () => {
    const comment = {
      id: 1,
      comment: '011',
      created_at: '2020-07-11T21:51:19.749Z',
      updated_at: '2020-07-11T21:51:19.749Z',
    };

    typeorm.BaseEntity.findOne = jest.fn().mockReturnValue(comment);

    const res = await CommentService.show({ params: { id: 1 } });
    expect(res).toEqual(comment);
  });

  test('Erro ao tentar exibir se não existir', async () => {
    typeorm.BaseEntity.findOne = jest.fn().mockReturnValue(null);
    const err = await CommentService.show({ params: { id: 1 } }).catch(err => err);
    expect(err).toEqual(['Comentário não encontrado.']);
  });

  test('Criar', async () => {
    const body = {
      comment: 'O rato roeu a roupa do rei de roma',
    };

    const CommentInjection = {
      id: 7,
      comment: null,
      created_at: '2020-07-11T21:51:19.749Z',
      updated_at: '2020-07-11T21:51:19.749Z',
    };
    const save = async () => CommentInjection;
    const res = await CommentService.save({ params: {}, body }, { ...CommentInjection, save });
    expect(res).toEqual({ ...body, ...CommentInjection });
  });

  test('Erro ao tentar criar sem preencher comentário', async () => {
    const body = {};
    const err = await CommentService.save({ params: {}, body }).catch(err => err);
    expect(err).toEqual(['Comentário é obrigatório.']);
  });

  test('Atualizar', async () => {
    const body = {
      comment: 'Tres pratos de trigo para tres tigres tristes',
    };

    const comment = {
      comment: 'O rato roeu a roupa do rei de roma',
      id: 7,
      created_at: '2020-07-11T21:51:19.749Z',
      updated_at: '2020-07-11T21:51:19.749Z',
    };
    const save = async () => {
      return { ...comment, ...body };
    };

    typeorm.BaseEntity.findOne = jest.fn().mockReturnValue({ ...comment, save });

    const res = await CommentService.save({ params: { id: 1 }, body });

    expect(res).toEqual({
      comment: 'Tres pratos de trigo para tres tigres tristes',
      id: 7,
      created_at: '2020-07-11T21:51:19.749Z',
      updated_at: '2020-07-11T21:51:19.749Z',
    });
  });

  test('Erro ao tentar salvar comentário já existente', async () => {
    const body = {
      comment: 'Tres pratos de trigo para tres tigres tristes',
    };

    const comment = {
      comment: 'O rato roeu a roupa do rei de roma',
      id: 7,
      created_at: '2020-07-11T21:51:19.749Z',
      updated_at: '2020-07-11T21:51:19.749Z',
      save: async function () {
        throw { code: 'ER_DUP_ENTRY' };
      },
    };

    typeorm.BaseEntity.findOne = jest.fn().mockReturnValue(comment);

    const err = await CommentService.save({ params: { id: 1 }, body }).catch(err => err);

    expect(err).toEqual(['Este comentário já está cadastrado.']);
  });

  test('Remover', async () => {
    const comment = {
      comment: 'Tres pratos de trigo para tres tigres tristes',
      id: 7,
      created_at: '2020-07-11T21:51:19.749Z',
      updated_at: '2020-07-11T21:51:19.749Z',
    };

    const remove = () => comment;

    typeorm.BaseEntity.findOne = jest.fn().mockReturnValue({ ...comment, remove });

    const res = await CommentService.remove({ params: { id: 1 } });
    expect(res).toEqual(comment);
  });

  test('Erro ao tentar remover comentário inexistente', async () => {
    typeorm.BaseEntity.findOne = jest.fn().mockReturnValue(null);
    const err = await CommentService.remove({ params: { id: 1 } }).catch(err => err);
    expect(err).toEqual(['Comentário não encontrado para exclusão.']);
  });
});
