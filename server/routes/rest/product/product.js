const models = require("../../../models");
const Sequelize = require('sequelize');
const axios = require('axios');

async function getProduct(req, res) {
  const pid = req.params.pid;

  // req.session.user 체크 안함 -> product는 로그인 안해도 볼 수 있다.
  if (pid) {
    const product = await models.product.findOne({
      attributes: ["id", "name", "category", "element", "effect", "img_link"],

      where: {
        id: pid,
      },
    });

    if(product.dataValues.img_link=='0\r') {
      product.dataValues.img_link = 'no_image';
    }

    res.send(product);
  } else {
    res.status(404).json({ error: "no product id" });
  }
}


async function getImageFromNaver(req, res) {
  function getBase64(url) {
    return axios
      .get(url, {
        responseType: 'arraybuffer'
      })
      .then(response => Buffer.from(response.data, 'binary').toString('base64'))
  }
  
  let url = req.query.baseurl;

  Object.keys(req.query).forEach(key => {
    if (key === 'baseurl') return;
    url += `&${key}=${req.query[key]}`
  });

  console.log(url)

  const result = await getBase64(url);
  res.send(result);
}


async function getSameElement(req, res) {
  const { pid } = req.params;
  
  if (pid) {
    const elementCondition = await models.product.findOne({
      attributes: ["id", "name", "element", "category"],
      where: {
        id: pid,
      },
    });

    const ele = elementCondition.element;
    const product = await models.product.findAll({
      attributes: ["id", "name", "element", "category"],
      where: {
        element: ele,
      },
    });

    res.send(product);
  } else {
    res.status(404).json({ error: "no product id" });
  }
}


async function getsameCategory(req, res) {
  const { pid } = req.params;
  
  if (pid){
    const catCond = await models.product.findOne({
      attributes: ["id", "name", "element", "category"],
      where: {
        id: pid,
      },
    });

    const cat = catCond.category;
    const product = await models.product.findAll({
      attributes: ["id", "name", "element", "category"],
      where: {
        category: cat,
      },
    });

    res.send(product);
  } else {
    res.status(404).json({ error: "no product id" });
  }
}


const getAllProducts = async (req, res) => {
  if (!req.session.user) {
    res.send({
      result: false,
      error: 'No auth',
    });
  }
  const response = await models.product.findAll({
    order: [["id", "ASC"]],
    attributes: ["id", "name"],
  });
  res.send(response);
}


const findProduct = async (req, res) => {
    const { searchName } = req.params;

    if (searchName) {
      const products = await models.product.findAll({
        where: {
          name: { [Sequelize.Op.like]: "%" + searchName + "%" }
        },
        attributes: ["id", "name", "category", "element"],
      });
      res.send(products);
    } 
    else {
      res.status(404).json({ error: "no product" });
    }
}

module.exports = {
  getProduct,
  getAllProducts,
  findProduct,
  getSameElement,
  getsameCategory,
  getImageFromNaver
};
