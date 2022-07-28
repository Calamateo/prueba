/**
 * @description Export all features and business rules from the package
 */

// Domains
const {
  findAllQuery,
  findOneDetailedQuery,
  findOneQuery,
  createQuery,
  updateQuery,
  deleteQuery,
} = require('./domains');

// Services
const {
  findAllUsuarios,
  findOneUsuarioDetailed,
  findOneUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} = require('./useCases');

module.exports = {
  findAllUsuarios: findAllUsuarios(findAllQuery),
  findOneUsuario: findOneUsuario(findOneQuery),
  findOneUsuarioDetailed: findOneUsuarioDetailed(findOneDetailedQuery),
  createUsuario: createUsuario(createQuery),
  updateUsuario: updateUsuario(updateQuery),
  deleteUsuario: deleteUsuario(deleteQuery),
};
