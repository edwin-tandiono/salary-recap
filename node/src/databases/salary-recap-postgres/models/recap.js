const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

module.exports = sequelize.define('recap', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  period: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, { timestamps: false, });
