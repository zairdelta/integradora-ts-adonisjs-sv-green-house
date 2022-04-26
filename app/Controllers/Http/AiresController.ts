import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
const mongoose = require('mongoose')


const aire = require('App/Models/aire')


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




export default class AiresController {
  public async todo({ response }: HttpContextContract) {



                const agg = await aire.aggregate([
                  {
                    $project: {
                      valor: '$valor',
                      date: {
                        $dateToString: {
                          format: '%Y-%m-%d',
                          date: '$Dia',
                        },
                      },
                      __v: '$__v',
                    },
                  },
                  {
                    $sort: {
                      _id: -1,
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

    const agg = await aire.aggregate([
      {
        $project: {
          valor: '$valor',
          date: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$Dia',
            },
          },
          __v: '$__v',
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
      {
        $limit: 1
      }
    ])
    console.log(agg, 'aggre')

    return response.created({
      status: true,
      response: agg,
    })
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const userdata = await request.only(['valor'])
    console.log(userdata.valor)

    const user = await aire.create(userdata)
    return response.created({
      status: true,
      response: user,
    })
  }

  public async destroy({ params, response }: HttpContextContract) {
    console.log(params._id)
    const borrar = params._id
    await aire
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
