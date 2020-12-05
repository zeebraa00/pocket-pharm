module.exports = (sequelize, DataTypes) => {
  const History_ = sequelize.define(
    "history",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      fit: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: "Good: true, Bad: false",
      },
      memo: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      comment: "복약 기록",
      charset: "utf8",
      collate: "utf8_unicode_ci",
      freezeTableName: true,
      timestamps: false,
    }
  );

  History_.associate = (models) => {
    History_.belongsTo(models.product, {
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    History_.belongsTo(models.user, {
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  };

  return History_;
};
