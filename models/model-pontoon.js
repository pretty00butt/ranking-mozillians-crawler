module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Pontoon', {
    rank: {
      type: DataTypes.INTEGER
    },
    total: {
      type: DataTypes.INTEGER
    },
    translated: {
      type: DataTypes.INTEGER
    },
    suggested: {
      type: DataTypes.INTEGER
    },
    fuzzy: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false,
  })
}
