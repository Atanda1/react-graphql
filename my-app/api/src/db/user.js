const uuid = require("uuid").v4;

const createUserModel = db => {
  return {
    findOne() {
      return db.get('user')
        .value()
    },

    create(user) {
      const newUser = {id: uuid(), createdAt: Date.now(), ...user}
      db.set('user', newUser)
        .write()
  
      return newUser
    }
  }
}

module.exports = createUserModel
