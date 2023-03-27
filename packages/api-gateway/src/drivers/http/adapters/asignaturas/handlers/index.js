const createAsignaturaPrograma = require('./create.handlers.asignatura-programa.adapters');
const findOneAsignaturaPrograma = require('./find-one.handlers.asignatura.adapters');
const updateAsignaturas = require('./update.handlers.asignatura.adapters');
const deleteAsignaturaPrograma = require('./delete.handlers.asignatura-programa.adapters');
const findProgramaAsignaturas = require('./find.handlers.programa-asignaturas.adapters');

module.exports = {
  createAsignaturaPrograma,
  findOneAsignaturaPrograma,
  updateAsignaturas,
  deleteAsignaturaPrograma,
  findProgramaAsignaturas,
};
