const models = require('../models');

/**
 * @param {integer} lectureId
 * @param {object} user
 * @returns {boolean}
 */
const lectureAuth = async(lectureId, user) => {

  const latestID = await models.Lecture.max('id');
  
  if(user.admin) return true
  else if(user.initialApply === 0) return false
  else if(user.initialApply < latestID) return true
  else if(user.initialApply === latestID){
    if(user.initialApply === lectureId) return true
    return false
  }
  else return false
}

module.exports = {
  lectureAuth
}