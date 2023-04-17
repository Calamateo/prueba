// Infraestructura
const infraestructura = {
  plantelId: { type: 'integer' },
  tipoInstalacionId: { type: 'integer' },
  programaId: { type: 'integer' },
  nombre: { type: 'string' },
  ubicacion: { type: 'string' },
  capacidad: { type: 'integer' },
  metros: { type: 'integer' },
  recursos: { type: 'string' },
};

module.exports = { infraestructura };
