const { Model, DataTypes, Sequelize } = require('sequelize');

const { PROGRAMA_TABLE } = require('./programa');
const { ESTATUS_INSPECCIONES_TABLE } = require('./estatusInspecciones');

const INSPECCIONES_TABLE = 'Inspecciones';

const InspeccionesSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  programalId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'programa_id',
    references: {
      model: PROGRAMA_TABLE,
      key: 'id',
    },
  },
  estatus_inspeccionlId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'estatus_Inspeccionesid',
    references: {
      model: ESTATUS_INSPECCIONES_TABLE,
      key: 'id',
    },
  },
  fecha: {
    allowNull: false,
    type: DataTypes.DATETIME,
  },
  fecha_asignada: {
    allowNull: false,
    type: DataTypes.DATETIME,
  },
  resultado: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  folio: {
    allowNull: false,
    type: DataTypes.INTEGER,
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

class Inspecciones extends Model {
  static associate(models) {
    this.belongsTo(models.Programa, { as: 'Programa' });
    this.belongsTo(models.estatusInspecciones, { as: 'estatusInspecciones' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INSPECCIONES_TABLE,
      modelName: 'Inspecciones',
      timestamps: false,
    };
  }
}
module.exports = {
  INSPECCIONES_TABLE,
  InspeccionesSchema,
  Inspecciones,
};
