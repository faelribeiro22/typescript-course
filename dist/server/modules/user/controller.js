"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const errorHandler_1 = require("../../api/responses/errorHandler");
const successHandler_1 = require("../../api/responses/successHandler");
const dbErrorHandler_1 = require("../../config/dbErrorHandler");
const service_1 = require("./service");
class UserController {
    constructor() { }
    getAll(req, res) {
        service_1.default
            .getAll()
            .then(_.partial(successHandler_1.onSuccess, res))
            .catch(_.partial(errorHandler_1.onError, res, `Erro ao buscar todos os usuários`));
    }
    createUser(req, res) {
        service_1.default
            .create(req.body)
            .then(_.partial(successHandler_1.onSuccess, res))
            .catch(_.partial(dbErrorHandler_1.dbErrorHandler, res))
            .catch(_.partial(errorHandler_1.onError, res, `Erro ao inserir um novo usuário`));
    }
    getById(req, res) {
        const userId = parseInt(req.params.id);
        service_1.default.getById(userId)
            .then(_.partial(successHandler_1.onSuccess, res))
            .catch(_.partial(errorHandler_1.onError, res, `Usuário não encontrado`));
    }
    updateUser(req, res) {
        const userId = parseInt(req.params.id);
        const props = req.body;
        service_1.default.update(userId, props)
            .then(_.partial(successHandler_1.onSuccess, res))
            .catch(_.partial(errorHandler_1.onError, res, `Falha ao atualizar usuário`));
    }
    deleteUser(req, res) {
        const userId = parseInt(req.params.id);
        service_1.default.delete(userId)
            .then(_.partial(successHandler_1.onSuccess, res))
            .catch(_.partial(errorHandler_1.onError, res, "Falha ao remover usuário"));
    }
}
exports.default = UserController;
