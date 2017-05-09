module.exports = function (sequelize, DataTypes) {
  return sequelize.define('User', {
    username: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: true
    },
    pontoonId: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: true
    }
  }, {
    indexes: [{
      unique: true,
      fields: ['email']
    }],
    timestamps: false,
  })
}
