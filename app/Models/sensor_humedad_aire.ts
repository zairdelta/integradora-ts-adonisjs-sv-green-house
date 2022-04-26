const mongoose = require('mongoose')
// eslint-disable-next-line @typescript-eslint/naming-convention
const sensor_humedad_aire = mongoose.Schema({
  valor: {
    type: Number,
    required: true,
  },
  Dia: {
    type: Date,
    required: true,
    default: Date.now(),
  },
})

module.exports = mongoose.model('sensor_humedad_aire', sensor_humedad_aire)
