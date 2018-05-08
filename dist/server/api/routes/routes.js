"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = require("../../modules/user/routes");
class Routes {
    constructor(app) {
        this.getRoutes(app);
    }
    getRoutes(app) {
        app.route('/api/users/all').get(routes_1.default.index);
        app.route('/api/users/create').post(routes_1.default.create);
        app.route('/api/users/:id').get(routes_1.default.findOne);
        app.route('/api/users/:id/update').put(routes_1.default.update);
        app.route('/api/users/:id/destroy').delete(routes_1.default.destroy);
    }
}
exports.default = Routes;
