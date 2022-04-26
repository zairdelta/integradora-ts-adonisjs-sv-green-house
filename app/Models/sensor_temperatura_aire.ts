const mongoose3 = require('mongoose')

// eslint-disable-next-line @typescript-eslint/naming-convention
const sensor_temperatura_aire = mongoose3.Schema({
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

module.exports = mongoose3.model('sensor_temperatura_aire', sensor_temperatura_aire)
