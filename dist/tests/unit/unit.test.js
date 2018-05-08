"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./config/helpers");
const service_1 = require("../../server/modules/user/service");
const model = require('../../server/models');
describe('Testes Unitários do Controller', () => {
    let email;
    let _id;
    const defaultUser = {
        id: 1,
        name: 'Default User',
        email: 'defaultuser@email.com',
        password: '1234'
    };
    describe('Método Create', () => {
        it('Deve criar um novo Usuário', () => {
            const novoUsuario = {
                id: 3,
                name: 'Novo Usuario',
                email: 'novousuario@gmail.com',
                password: '1234'
            };
            return service_1.default.create(novoUsuario)
                .then(data => {
                helpers_1.expect(data.dataValues).to.have.all.keys(['email', 'id', 'name', 'password', 'updatedAt', 'createdAt']);
            });
        });
    });
    describe('Método Get Users', () => {
        it('Deve retornar uma lista com todos os Usuários', () => {
            return service_1.default.getAll().then(data => {
                helpers_1.expect(data).to.be.an('array');
                helpers_1.expect(data[0]).to.have.all.keys(['email', 'id', 'name', 'password']);
            });
        });
    });
    describe('Método Update', () => {
        it('Deve Atualizar um Usuário', () => {
            const usuarioAtualizado = {
                name: 'Nome Atualizado',
                email: 'atualizado@email.com'
            };
            return service_1.default.update(1, usuarioAtualizado).then(data => {
                helpers_1.expect(data[0]).to.be.equal(1);
            });
        });
    });
    describe('Método Delete', () => {
        it('Deve Deletar um Usuário', () => {
            return service_1.default.delete(1).then(data => {
                helpers_1.expect(data).to.be.equal(1);
            });
        });
    });
    describe('Método getById', () => {
        it('Retornar um usuário de acordo com o id passado', () => {
            return service_1.default.getById(2).then(data => {
                helpers_1.expect(data).to.have.all.keys(['email', 'id', 'name', 'password']);
                helpers_1.expect(data.id).to.have.equal(2);
            });
        });
    });
    describe('Método getByEmail', () => {
        it('Retornar um usuário de acordo com o email passado', () => {
            return service_1.default.getByEmail('novousuario@gmail.com').then(data => {
                helpers_1.expect(data).to.have.all.keys(['email', 'id', 'name', 'password']);
                helpers_1.expect(data.email).to.have.equal('novousuario@gmail.com');
            });
        });
    });
});
