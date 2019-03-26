/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('t_user_info', {
    userid: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    role: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    createtime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatetime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 't_user_info',
  });
};
