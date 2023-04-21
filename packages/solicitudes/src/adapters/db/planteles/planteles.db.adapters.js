// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  Plantel,
  Infraestructura,
  InfraestructuraPrograma,
  AsignaturaInfraestructura,
} = models;

const {
  createQuery,
  findOneQuery,
  findAllQuery,

} = queries;

module.exports = {
  findOnePlantelQuery: findOneQuery(Plantel),
  createInfraestructuraQuery: createQuery(Infraestructura),
  createInfraestructuraProgramaQuery: createQuery(InfraestructuraPrograma),
  createAsignaturaInfraestructuraQuery: createQuery(AsignaturaInfraestructura),
  findAllInfraestructuraQuery: findAllQuery(Infraestructura),
};
