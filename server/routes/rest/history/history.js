const models = require('../../../models');


async function createHist(req, res) {
  if(!req.session.user){
    res.send({
        result:false,
        notUser:true
    })
    return
  }

  const addHist = await models.history.create({
    // ...req.body,
    fit: req.body.fit,
    memo: req.body.memo,
    userId: req.session.user.id,    // user session ID
    productId: req.body.productId,
  });
  
  res.send({
    addHist,
    result:true
  });
}


listGoodHist = async (req, res) => {
  if(!req.session.user){
    res.send({
        result:false,
        notUser:true
    })
    return
  }

  const response = await models.history.findAll({
    where: {
      userId: req.session.user.id,
      fit: true
      },
    include: [
      {
        model: models.product,
        arrtibutes: ["name", "element", "effect"],
      },
    ],
  });
  res.send(response);
}


listBadHist = async (req, res) => {
  if(!req.session.user){
    res.send({
        result:false,
        notUser:true
    })
    return
  }

  const response = await models.history.findAll({
    where: {
      userId: req.session.user.id,
      fit: false
      },
    include: [
      {
        model: models.product,
        arrtibutes: ["name", "element", "effect"],
      },
    ],
  });
  res.send(response);
}

const deleteHistory = async (req, res) => {
  const history_id = req.params.id;
  // console.log("History ID",history_id);

    try {
        if(!req.session.user){
            res.send({
                result:false,
                notUser:true
            })
            return
        }

      if(history_id){
            await models.history.destroy({
                where:{
                id: history_id,
                }
            });     
            res.send({
                result: true,
            }); 
        }
        else {
            res.send({
                result: false,
            })
        }
    } catch (exception) {
        res.send({
            result: false
        });
    }
}


module.exports = {
  listGoodHist , listBadHist, createHist, deleteHistory
};
  