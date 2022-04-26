const mongoose1 = require('mongoose')

// eslint-disable-next-line @typescript-eslint/naming-convention
const sensor_humedad_suelo = mongoose1.Schema({
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

module.exports = mongoose1.model('sensor_humedad_suelo', sensor_humedad_suelo)
