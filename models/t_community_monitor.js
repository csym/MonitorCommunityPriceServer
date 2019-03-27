/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('t_community_monitor', {
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
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    area: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    town: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    createtime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    validflag: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
    },
  }, {
    tableName: 't_community_monitor',
  });
};
