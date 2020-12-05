module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      uid: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        comment: "아이디",
      },
      pw: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: "비밀번호",
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: true,
        defaultValue: "name",
        comment: "이름",
      },
      gender: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
        comment: "남자: 0, 여자: 1",
      },
      age: {
        type: DataTypes.TINYINT(4),
        allowNull: true,
        defaultValue: 0,
        comment: "나이",
      },
      email: {
        type: DataTypes.STRING(45),
        allowNull: false,
        comment: "이메일",
      },
      level: {
        type: DataTypes.TINYINT(4),
        allowNull: true,
        defaultValue: 2,
        comment: "0: 어드민, 1: 중간 권한 어드민, 2: 강의 이력 있는 유저, 3: 신규 유저",
      },
    },
    {
      comment: "학생",
      charset: "utf8",
      collate: "utf8_unicode_ci",
    }
  );

  User.associate = (models) => {
    User.hasMany(models.history);
  };

  return User;
};
