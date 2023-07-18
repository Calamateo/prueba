// eslint-disable-next-line import/no-extraneous-dependencies
const supertest = require('supertest');
const {
  apiKey,
  updateToken,
  downServer,
  upServer,
  statusCodeName,
  createUserData,
} = require('./utils/fixtures/server');
const { upSeed, downSeed } = require('./utils/umzug');
const {
  createUser,
  loginUser,
  userPasswordIncorrect,
  errorPasswordUserCreate,
  errorUserCreate,
  createUserInitial,
} = require('./utils/fixtures/users');
const { models } = require('../packages/core/src/drivers/db/connection');

describe('test for users', () => {
  let api = null;
  let token = null;
  let id = null;
  let headers = null;
  beforeAll(async () => {
    api = supertest(await upServer());
    await upSeed();
  });
  describe('[POST] /api/v1/usuarios', () => {
    it('should new user', async () => {
      const { body, statusCode } = await api.post('/api/v1/usuarios')
        .send(createUser)
        .set(apiKey);
      id = body.data.id;
      const data = await models.Usuario.findByPk(id);
      expect(statusCode).toEqual(statusCodeName.created);
      expect(body.data.usuario).toEqual(data.usuario);
    });
    it('should exists user', async () => {
      const { statusCode, body } = await api.post('/api/v1/usuarios')
        .send(createUser)
        .set(apiKey);
      expect(statusCode).toEqual(statusCodeName.conflict);
      expect(body.message).toEqual(`User ${createUser.usuario} already exists`);
    });
    it('should error password user', async () => {
      const { statusCode, body } = await api.post('/api/v1/usuarios')
        .send(errorPasswordUserCreate)
        .set(apiKey);
      expect(statusCode).toEqual(statusCodeName.badRequest);
      expect(body.message).toEqual('body/contrasena must match pattern "^(?!.* )(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9])(?=.*[@$!%*?&./])[A-Za-z0-9@$!%*?&./]{8,25}$"');
    });
    it('should error create user', async () => {
      const { statusCode, body } = await api.post('/api/v1/usuarios')
        .send(errorUserCreate)
        .set(apiKey);
      expect(statusCode).toEqual(statusCodeName.badRequest);
      expect(body.message).toEqual('body/usuario must NOT have fewer than 3 characters');
    });
  });

  describe('[POST] /api/v1/auth/login', () => {
    it('should login', async () => {
      const { body, statusCode } = await api.post('/api/v1/auth/login')
        .send(loginUser)
        .set(apiKey);
      token = body.token;
      headers = updateToken(token);
      expect(statusCode).toEqual(statusCodeName.ok);
      expect(body.data.usuario).toEqual(loginUser.usuario);
    });
    it('should Unauthorized access', async () => {
      const { statusCode, body } = await api.post('/api/v1/auth/login')
        .send(userPasswordIncorrect)
        .set(apiKey);
      expect(statusCode).toEqual(statusCodeName.unauthorized);
      expect(body.message).toEqual('Unauthorized');
    });
  });

  describe('[GET] /api/v1/usuarios/', () => {
    it('should all users', async () => {
      const { body: users, statusCode } = await api.get('/api/v1/usuarios/')
        .set(headers);
      const { count: usersDataCount } = await models.Usuario.findAndCountAll();
      expect(users.data.length).toEqual(usersDataCount);
      expect(statusCode).toEqual(statusCodeName.ok);
    });
    it('should Unauthorized access', async () => {
      const { statusCode, body: error } = await api.get('/api/v1/usuarios/').set(apiKey);
      expect(statusCode).toEqual(statusCodeName.unauthorized);
      expect(error.message).toEqual('Autorization token header[Bearer] is missing!');
    });
  });

  describe('[GET] /api/v1/usuarios/:{id}', () => {
    it('should a user', async () => {
      const { body: dataUser, statusCode } = await api.get(`/api/v1/usuarios/${id}`)
        .set(headers);
      expect(dataUser.data.id).toEqual(id);
      expect(dataUser.data.usuario).toEqual(loginUser.usuario);
      expect(statusCode).toEqual(statusCodeName.ok);
    });
    it('should user not found', async () => {
      const { body: error, statusCode } = await api.get('/api/v1/usuarios/-1').set(headers);
      expect(statusCode).toEqual(statusCodeName.notFound);
      expect(error.message).toEqual("[usuario]: can't usuario with identifier: [object Object]");
    });
    it('should usuarioId must be integer', async () => {
      const { body: error, statusCode } = await api.get('/api/v1/usuarios/sca').set(headers);
      expect(error.message).toEqual('params/usuarioId must be integer');
      expect(statusCode).toEqual(statusCodeName.badRequest);
    });
    it('should ', async () => {
      const data = await createUserData(createUserInitial);
      console.log(data);
    });
  });

  afterAll(async () => {
    await downSeed();
    await downServer();
  });
});
