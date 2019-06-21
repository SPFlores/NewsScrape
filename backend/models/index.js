const { Schema, model } = require('mongoose')

const db = {
  Comment: require('./comment.js')(Schema, model),
  Post: require('./article.js')(Schema, model)
}

module.exports = db
