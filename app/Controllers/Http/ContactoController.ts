import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
const mongoose = require('mongoose')
const contacto = require('App/Models/contacto')

try
{
console.log("BIEN")
mongoose.connect('mongodb://164.90.203.136:27017')
}
catch
{
console.log("MAL")
mongoose.connect('mongodb://164.90.203.245:27017')
}
export default class NFCController {
  public async index({ response }: HttpContextContract) {
    const agg = await contacto.aggregate([
      {
        $sort: {
          _id: 1,
        },
      },
    ])
    console.log(agg, 'aggre')

    return response.created({
      status: true,
      response: agg,
    })
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const userdata = await request.only(['nombre', 'email', 'mensaje'])

    const user = await contacto.create(userdata)

    return response.created({
      status: true,
      response: user,
    })
  }

  public async destroy({ params, response }: HttpContextContract) {
    console.log(params._id)
    const borrar = params._id
    await contacto
      .deleteOne({ _id: borrar })
      .then(
        () => console.log('conectado'),
        response.created({
          status: true,
        })
      )
      .catch((error) => console.error(error))
  }
}
