const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

module.exports = sequelize.define('tax_slip', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  recap_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  order_num: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  base_salary: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  meal_allowance: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  meal_allowance_multiplier: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  overtime_pay: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  overtime_pay_multiplier: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  installment_payment: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  installment_remaining: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  allowance_bonus: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  attendance_bonus: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  transportation_bonus: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bonus: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, { timestamps: false, });
