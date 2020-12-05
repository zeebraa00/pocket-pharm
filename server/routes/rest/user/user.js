const crypto = require('crypto');
const models = require('../../../models');

async function register(req, res) {
  try {
    const find = await models.user.findOne({
      where: {
        uid: req.body.uid,
      },
    });

    if (find !== null) {
      res.send({
        result: false,
        duplicate: true,
      });
    }

    const addUser = await models.user.create({
      ...req.body,
      pw: crypto.createHash('sha512').update(req.body.pw).digest('hex'),
    });
    
    let result = null;
    if (addUser) {
      res.send({
        result: true,
      });
    } else {
      res.send({
        result: false,
      });
    }
  } catch (exception) {
    // console.log(exception);
    res.send({
      result: false,
    });
  }
}

async function session(req, res) {
  if (req.session.user) {
    res.send({
      result: true,
    });
  } else {
    res.send({
      result: false,
    });
  }
}

async function getUserId(req, res) {
  if (req.session.user) {
    res.send({
      result: true,
      id: req.session.user.id,
    });
  } else {
    res.send({
      result: false,
    });
  }
}

async function login(req, res) {
  try {
    // console.log(req.body);    
    const user = await models.user.findOne({
      where: {
        uid: req.body.uid,
        pw: req.body.pw,
      },
    });
    if (user !== null) {
      req.session.user = user.dataValues; // 세션 추가 등록
      await delete req.session.user.pw;
      res.send({
        result: true,
      });
    } else {
      res.send({
        result: false,
      });
    }
  } catch (exception) {
    res.send({
      result: false,
    });
  }
}

async function logout(req, res) {
  req.session.destroy();
}

module.exports = {
  register,
  session,
  getUserId,
  login,
  logout,
};
