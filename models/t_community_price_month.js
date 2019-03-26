/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('t_community_price_month', {
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
    communityprice: {
      type: DataTypes.STRING(1024),
      allowNull: true,
    },
    updatetime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createtime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: 't_community_price_month',
  });
};
