import { Application, Request, Response } from 'express';
import UserRoutes from '../../modules/user/routes';

class Routes {

  constructor(app: Application) {
    this.getRoutes(app);
  }

  getRoutes(app: Application): void {
    app.route('/api/users/all').get(UserRoutes.index);
    app.route('/api/users/create').post(UserRoutes.create);
    app.route('/api/users/:id').get(UserRoutes.findOne);
    app.route('/api/users/:id/update').put(UserRoutes.update);
    app.route('/api/users/:id/destroy').delete(UserRoutes.destroy);
  }

}

export default Routes;