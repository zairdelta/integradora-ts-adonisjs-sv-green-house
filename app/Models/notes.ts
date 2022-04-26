const mongoose6 = require('mongoose')
// eslint-disable-next-line @typescript-eslint/naming-convention
const Notes = mongoose6.Schema({
  title: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  Dia: {
    type: Date,
    required: true,
    default: Date.now(),
  },
})

module.exports = mongoose6.model('Notes', Notes)
