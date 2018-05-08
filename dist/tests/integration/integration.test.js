"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HTTPStatus = require("http-status");
const helpers_1 = require("./config/helpers");
describe('Testes de Integração', () => {
    'use strict';
    const config = require('../../server/config/env/config')();
    const model = require('../../server/models');
    let id;
    const userTest = {
        id: 100,
        name: 'Usuario Teste',
        email: 'teste@teste.com',
        password: 'teste'
    };
    const userDefault = {
        id: 1,
        name: 'Default User',
        email: 'default@gmail.com',
        password: 'default'
    };
    beforeEach((done) => {
        model.User.destroy({
            where: {}
        })
            .then(() => {
            return model.User.create(userDefault);
        })
            .then(user => {
            model.User.create(userTest)
                .then(() => {
                done();
            });
        });
    });
    describe('GET /api/users/all', () => {
        it('Deve retornar um array com todos os Usuários', done => {
            helpers_1.request(helpers_1.app)
                .get('/api/users/all')
                .end((error, res) => {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload).to.be.an('array');
                helpers_1.expect(res.body.payload[0].name).to.be.equal(userDefault.name);
                helpers_1.expect(res.body.payload[0].email).to.be.equal(userDefault.email);
                done(error);
            });
        });
    });
    describe('GET /api/users/:id', () => {
        it('Deve retornar um Json com um Usuário', done => {
            helpers_1.request(helpers_1.app)
                .get(`/api/users/${userDefault.id}`)
                .end((error, res) => {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload.id).to.be.equal(userDefault.id);
                helpers_1.expect(res.body.payload).to.have.all.keys([
                    'id', 'name', 'email', 'password'
                ]);
                done(error);
            });
        });
    });
    describe('POST /api/users/create', () => {
        it('Deve adicionar um Usuário', done => {
            const user = {
                id: 2,
                name: 'Usuario Teste',
                email: 'usuario@gmail.com',
                password: 'novouser'
            };
            helpers_1.request(helpers_1.app)
                .post('/api/users/create')
                .send(user)
                .end((error, res) => {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload.id).to.eql(user.id);
                helpers_1.expect(res.body.payload.name).to.eql(user.name);
                helpers_1.expect(res.body.payload.email).to.eql(user.email);
                done(error);
            });
        });
    });
    describe('PUT /api/users/:id/update', () => {
        it('Deve editar um Usuário', done => {
            const user = {
                nome: 'TestUpdate',
                email: 'update@email.com'
            };
            helpers_1.request(helpers_1.app)
                .put(`/api/users/${userTest.id}/update`)
                .send(user)
                .end((error, res) => {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload.id).to.be.equal(id);
                done(error);
            });
        });
    });
    describe('DELETE /api/users/:id/destroy', () => {
        it('Deve deletar um Usuário', done => {
            helpers_1.request(helpers_1.app)
                .delete(`/api/users/${userTest.id}/destroy`)
                .end((error, res) => {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload.id).to.be.equal(id);
                done(error);
            });
        });
    });
});
