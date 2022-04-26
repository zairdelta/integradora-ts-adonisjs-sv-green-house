import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
const mongoose = require('mongoose')
// eslint-disable-next-line @typescript-eslint/naming-convention
const sensor_NFC = require('App/Models/Sensor_NFC')
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
  public async todo({ response }: HttpContextContract) {
    const agg = await sensor_NFC.aggregate([
      {
        $project: {
          usuario_acceso: '$usuario_acceso',
          codigo_acceso: '$codigo_acceso',
          dia_acceso: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$dia_acceso',
            },
          },
          __v: '$__v',
        },
      },
    ])
    console.log(agg, 'aggre')

    // eslint-disable-next-line eqeqeq

    return response.created({
      status: true,
      response: agg,
    })
  }
  public async index({ response }: HttpContextContract) {
    const agg = await sensor_NFC.aggregate([
      {
        $sort: {
          _id: -1,
        },
      },
      {
        $limit: 3,
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
    const userdata = await request.only(['usuario_acceso', 'codigo_acceso'])
    console.log(userdata.usuario_acceso, userdata.codigo_acceso)

    console.log(userdata)
    const user = await sensor_NFC.create(userdata)
    return response.created({
      status: true,
      response: user,
    })
  }

  public async show({ params, response }: HttpContextContract) {
    const user = await sensor_NFC.findOne({ params })
    return response.created({
      status: true,
      response: user,
    })
  }

  public async edit({}: HttpContextContract) {}

  public async update({ params, request, response }: HttpContextContract) {
    const user = await sensor_NFC.findOne(params)
    console.log(user)
    user.usuario = request.input('usuario')
    user.libro = request.input('libro')
    user.comentario = request.input('comentario')
    await user.save()
    return response.created({
      status: true,
      data: user,
    })
  }

  public async destroy({ params, response }: HttpContextContract) {
    console.log(params._id)
    const borrar = params._id
    await sensor_NFC
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
