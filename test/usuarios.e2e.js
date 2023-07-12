// eslint-disable-next-line import/no-extraneous-dependencies
const supertest = require('supertest');
const HttpServer = require('../packages/api-gateway/src/drivers/http/server');
const { models } = require('../packages/core/src/drivers/db/connection');
const { config } = require('../packages/api-gateway/config/environment');
const { upSeed, downSeed } = require('./utils/umzug');

const dato = require('../packages/core/config/config');

const { mysql } = dato;
describe('test for users', () => {
  let api = null;
  let app = null;
  const apiKey = {
    api_key: 'zaCELgL.0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx',
  };
  const {
    dbHost, dbPort, dbUser, dbPassword, dbName, dbAdmin,
  } = mysql;
  const URI = `${dbAdmin}://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;
  console.log(dbAdmin, dbUser, dbPassword, URI);
  console.log(process.env.DB_HOST_MYSQL);
  // eslint-disable-next-line no-unused-vars
  let token = null;
  const user = {
    usuario: 'Calamateo',
    rolId: 3,
    correo: 'calamate0@yopmail.com',
    contrasena: '1234Qwerty@',
    actualizado: true,
    estatus: 1,
    persona: {
      nombre: 'Daniel',
      apellidoPaterno: 'Calamateo',
    },
  };
  let id = null;
  beforeAll(async () => {
    app = await HttpServer.fastify.listen(
      {
        port: config.serverPort,
      },
    );
    api = supertest(app);

    await upSeed();
  });
  describe('[POST] /api/v1/usuarios', () => {
    it('should new user', async () => {
      console.log(URI);
      const { body, statusCode } = await api.post('/api/v1/usuarios')
        .send(user)
        .set(apiKey);
      console.log(body, statusCode);
      id = body.data.id;
      const data = await models.Usuario.findByPk(id);
      expect(statusCode).toEqual(201);
      expect(body.data.usuario).toEqual(data.usuario);
    });
    it('should exists user', async () => {
      const { statusCode, body } = await api.post('/api/v1/usuarios')
        .send(user)
        .set(apiKey);
      expect(statusCode).toEqual(409);
      expect(body.message).toEqual(`User ${user.usuario} already exists`);
    });
  });

  describe('[POST] api/v1/auth/login', () => {
    it('should login', async () => {
      const { body, statusCode } = await api.post('/api/v1/auth/login')
        .send({
          contrasena: user.contrasena,
          usuario: user.usuario,
        })
        .set(apiKey);
      token = body.token;
      expect(statusCode).toEqual(200);
      expect(body.data.usuario).toEqual(user.usuario);
    });
    it('should Unauthorized access', async () => {
      const userPasswordIncorrect = {
        usuario: 'calamateo',
        contrasena: '34jifj3933wfA',
      };
      const { statusCode, body } = await api.post('/api/v1/auth/login')
        .send(userPasswordIncorrect)
        .set(apiKey);
      expect(statusCode).toEqual(401);
      expect(body.message).toEqual('Unauthorized');
    });
  });

  afterAll(async () => {
    await downSeed();
    HttpServer.fastify.close();
  });
});
