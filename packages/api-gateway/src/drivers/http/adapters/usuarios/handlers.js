const errorHandler = require("../../utils/errorHandler");

// usuario services
async function find(req, reply) {
  try {
    req.log.info("[http-server]: Getting usuarios list: ");

    const usuarios = await this.usuarioServices.methods.find();

    return reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({ data: usuarios });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

async function findOne(req, reply) {
  try {
    const { usuarioId } = req.params;
    req.log.info(`[http-server]: Getting usuario: ${usuarioId}`);

    const usuario = await this.usuarioServices.methods.findOne(usuarioId);

    return reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({ data: usuario });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

async function create(req, reply) {
  try {
    const body = req.body;
    req.log.info(`[http-server]: Creating usuario`);

    const newUsuario = await this.usuarioServices.methods.create(body);

    return reply
      .code(201)
      .header("Content-Type", "application/json; charset=utf-8")
      .send(newUsuario);
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = {
  find,
  findOne,
  create,
};
