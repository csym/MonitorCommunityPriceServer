/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('t_community_price_day', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    aid: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    sumday: {
      type: DataTypes.STRING(8),
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    salecnt: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    trend: {
      type: DataTypes.STRING(8),
      allowNull: true,
    },
    createdate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: 't_community_price_day',
  });
};
