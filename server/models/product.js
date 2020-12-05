module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "product",
    {
      id: {
        allowNull: false,
        // autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        comment: "제품 ID",
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "약 이름",
      },
      category: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "식약처 분류",
      },
      element: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "성분",
      },

      effect: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "효능/효과",
      },
      img_link: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "약품 이미지",
      },
    },
    {
      comment: "약품 목록",
      charset: "utf8",
      collate: "utf8_unicode_ci",
      freezeTableName: true,
      timestamps: false,
    }
  );

  Product.associate = (models) => {
    Product.hasMany(models.history);
  };

  return Product;
};
