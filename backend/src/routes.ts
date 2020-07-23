import { CommentController } from './controllers/CommentController';
import { PlayerController } from './controllers/PlayerController';

const router = (app: any) => {
  app.get('/comments', CommentController.index);
  app.get('/comments/:id', CommentController.show);
  app.post('/comments', CommentController.create);
  app.put('/comments/:id', CommentController.update);
  app.delete('/comments/:id', CommentController.remove);

  app.get('/play/:id', PlayerController.stream);    

  return app;
};

export { router };
