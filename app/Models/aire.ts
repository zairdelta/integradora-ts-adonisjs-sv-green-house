const mongoose7 = require('mongoose')
const aire = mongoose7.Schema({
  valor: {
    type: String,
    required: true,
  },
  Dia: {
    type: Date,
    required: true,
    default: Date.now(),
  },
})

module.exports = mongoose7.model('aire', aire)
