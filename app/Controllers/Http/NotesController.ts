import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
const mongoose = require('mongoose')
// eslint-disable-next-line @typescript-eslint/naming-convention
const Notes = require('App/Models/notes')
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

export default class NotesController {
  public async todo({ response }: HttpContextContract) {
    var agg = {}
    agg = await Notes.aggregate([
      {
        $project: {
          title: '$title',
          note: '$note',
          date: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$Dia',
            },
          },
          __v: '$__v',
        },
      },
    ])
    return response.created({
      status: true,
      response: agg,
    })

    // eslint-disable-next-line eqeqeq
  }
  public async store({ request, response }: HttpContextContract) {
    const userdata = await request.only(['title', 'note'])
    console.log(userdata.title, userdata.note)

    console.log(userdata)
    const user = await Notes.create(userdata)
    return response.created({
      status: true,
      response: user,
    })
  }
  public async destroy({ params, response }: HttpContextContract) {
    console.log(params._id)
    const borrar = params._id
    await Notes.deleteOne({ _id: borrar })
      .then(
        () => console.log('conectado'),
        response.created({
          status: true,
        })
      )
      .catch((error) => console.error(error))
  }
}
