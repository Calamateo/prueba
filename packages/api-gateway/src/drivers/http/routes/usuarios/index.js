const { usuariosAdapter } = require('../../adapters');

const {
  getAllUsuariosSchema,
  getUsuarioSchema,
  getUsuarioDetalleSchema,
  createUsuarioSchema,
  createUsuarioUsuarioSchema,
  updateUsuarioSchema,
  deleteUsuarioSchema,
  getAllUsuarioUsuariosSchema,
} = require('./schema');

async function usuarioRouter(fastify, opts, next) {
  await fastify.get(
    '/',
    { schema: getAllUsuariosSchema },
    usuariosAdapter.findAllUsuarios,
  );

  await fastify.get(
    '/:usuarioId',
    {
      schema: getUsuarioSchema,
    },
    usuariosAdapter.findOneUsuario,
  );

  await fastify.get(
    '/:usuarioId/detalle',
    {
      schema: getUsuarioDetalleSchema,
    },
    usuariosAdapter.findOneDetailedUsuario,
  );

  await fastify.get(
    '/:usuarioId/usuarios',
    {
      schema: getAllUsuarioUsuariosSchema,
    },
    usuariosAdapter.findAllUsuarioUsuarios,
  );

  await fastify.post(
    '/',
    {
      schema: createUsuarioSchema,
    },
    usuariosAdapter.createUsuario,
  );

  await fastify.post(
    '/:usuarioId/usuario',
    {
      schema: createUsuarioUsuarioSchema,
    },
    usuariosAdapter.createUsuarioUsuario,
  );

  await fastify.patch(
    '/:usuarioId',
    {
      schema: updateUsuarioSchema,
    },
    usuariosAdapter.updateUsuario,
  );

  await fastify.delete(
    '/:usuarioId',
    {
      schema: deleteUsuarioSchema,
    },
    usuariosAdapter.deleteUsuario,
  );

  next();
}

module.exports = usuarioRouter;
