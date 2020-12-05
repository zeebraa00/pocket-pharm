const { sequelize } = require('../models');
const isForce = process.argv.length >= 3 && process.argv[2] == '--force';

// force: true -> DROP TABLE IF EXISTS
// sequelize.sync({force:isForce});

sequelize.sync({force:false}).then( () => {
  console.log(" DB 연결 성공");
}).catch(err => {
  console.log("DB 연결 실패\n", err);
});