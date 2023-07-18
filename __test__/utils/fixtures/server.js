const { fastify } = require('../../../packages/api-gateway/src/drivers/http/server');
const { config } = require('../../../packages/api-gateway/config/environment');

const apiKey = {
  api_key: process.env.API_KEY,
};

/**
 * Update token and create headers with api_key
 * @param {String} token
 * @returns Objet headers
 * @example
 * {
 *  api_key: 'anvjinaun283rjw8jjiwsev',
 *  Authorization: 'Bearer mocaso93qjq9osa',
 * }
 */
const updateToken = (token) => {
  const headers = { ...apiKey, Authorization: `Bearer ${token}` };
  return headers;
};

const upServer = async () => fastify.listen(
  {
    port: config.serverPort,
    host: config.serverHost,
  },
);

const downServer = async () => {
  await fastify.close();
};

const statusCodeName = {
  ok: 200,
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
};

const createUserData = async (data) => {
  const usuario = await fastify.usuarioServices.createUser(data);
  return usuario;
};

module.exports = {
  apiKey,
  updateToken,
  upServer,
  downServer,
  statusCodeName,
  createUserData,
};
