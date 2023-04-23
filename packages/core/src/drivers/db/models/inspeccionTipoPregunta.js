const { Model, DataTypes, Sequelize } = require('sequelize');

const INSPECCION_TIPO_PREGUNTA_TABLE = 'inspeccion_tipo_preguntas';

const InspeccionTipoPreguntaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  descripcion: {
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: null,
  },
  deletedAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'deleted_at',
    defaultValue: null,
  },
};

class InspeccionTipoPregunta extends Model {
  static associate() {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INSPECCION_TIPO_PREGUNTA_TABLE,
      modelName: 'InspeccionTipoPregunta',
      timestamps: false,
    };
  }
}

module.exports = {
  INSPECCION_TIPO_PREGUNTA_TABLE,
  InspeccionTipoPreguntaSchema,
  InspeccionTipoPregunta,
};
