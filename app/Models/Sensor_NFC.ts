const mongoose2 = require('mongoose')

// eslint-disable-next-line @typescript-eslint/naming-convention
const sensor_NFC = mongoose2.Schema({
  usuario_acceso: {
    type: String,
    required: true,
  },
  codigo_acceso: {
    type: String,
    required: true,
  },
  dia_acceso: {
    type: Date,
    required: true,
    default: Date.now,
  },
})

module.exports = mongoose2.model('sensor_NFC', sensor_NFC)
