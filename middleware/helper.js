const dayjs = require('dayjs')

const helper = {
  cleanObject: obj => {
    // Delete and modify data from database
    delete obj.password
    delete obj.isDeleted
    delete obj.createdAt
    delete obj.updatedAt
    
    return obj
  }
}

module.exports = helper