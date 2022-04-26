// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Application, HttpContext } from '@adonisjs/core/build/standalone'
import Database from '@ioc:Adonis/Lucid/Database'
import auth from 'App/Models/auth'
export default class UsuariosController {
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  async index({ response }) {
    const users = await Database.from('auths')
      .join('sesions', 'auths.sesion', '=', 'sesions.id')
      .select('auths.id')
      .select('auths.username')
      .select('auths.url_foto')
      .select('auths.email')
      .select('sesions.sesion')
      .orderBy('auths.id')

    return response.created({
      status: true,
      response: users,
    })
  }
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  async update({ request, params }: HttpContext) {
    const usuario = await auth.findOrFail(params.id);
    (usuario.email = request.input('email')),
    (usuario.username = request.input('username')),
    (usuario.url_foto = request.input('url_foto')),
      (usuario.sesion = request.input('sesion')),
      await usuario.save()
  }

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  async destroy({ params, response }) {
    const usuario = await auth.findOrFail(params.id)
    console.log(params.id)
    await usuario.delete()
    return response.created({
      res: true,
      message: 'Registro eliminado correctamente',
    })
  }

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  async show({ params }) {
    const usuario = await auth.findOrFail(params.id)
    return usuario
  }
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility

}
