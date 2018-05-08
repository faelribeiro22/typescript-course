import { testDouble, expect } from './config/helpers';
import User from '../../server/modules/user/service';
const model = require('../../server/models');

describe('Testes Unitários do Controller', () => {

  let email;
  let _id;

  const defaultUser = {
    id: 1,
    name: 'Default User',
    email: 'defaultuser@email.com',
    password: '1234'
  }

  describe('Método Create', () => {
    it('Deve criar um novo Usuário', () => {
      const novoUsuario = {
        id: 3,
        name: 'Novo Usuario',
        email: 'novousuario@gmail.com',
        password: '1234'
      };
      return User.create(novoUsuario)
                .then(data => {
                  expect(data.dataValues).to.have.all.keys(
                    ['email', 'id', 'name', 'password', 'updatedAt', 'createdAt']
                  )
                })
    });
  });
  
  describe('Método Get Users', () => {
    it('Deve retornar uma lista com todos os Usuários', () => {
      return User.getAll().then(data => {
        expect(data).to.be.an('array');
        expect(data[0]).to.have.all.keys(
          ['email', 'id', 'name', 'password']
        )
      });
    });
  });
  
  describe('Método Update', () => {
    it('Deve Atualizar um Usuário', () => {
      const usuarioAtualizado = {
        name: 'Nome Atualizado',
        email: 'atualizado@email.com'
      };
      return User.update(1, usuarioAtualizado).then(data => {
        expect(data[0]).to.be.equal(1);
      })
    });
  });
  describe('Método Delete', () => {
    it('Deve Deletar um Usuário', () => {
      return User.delete(1).then(data => {
        expect(data).to.be.equal(1);
      });
    });
  });
  describe('Método getById', () => {
    it('Retornar um usuário de acordo com o id passado', () => {
      return User.getById(2).then(data => {
        expect(data).to.have.all.keys(
          ['email', 'id', 'name', 'password']
        );
        expect(data.id).to.have.equal(2);
      });
    });
  });

  describe('Método getByEmail', () => {
    it('Retornar um usuário de acordo com o email passado', () => {
      return User.getByEmail('novousuario@gmail.com').then(data => {
        expect(data).to.have.all.keys(
          ['email', 'id', 'name', 'password']
        );
        expect(data.email).to.have.equal('novousuario@gmail.com');
      });
    });
  });

});