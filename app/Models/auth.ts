import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'

// eslint-disable-next-line @typescript-eslint/naming-convention
export default class auth extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public url_foto: string
  @column()
  public username: string
  @column()
  public email: string
  @column({ serializeAs: null })
  public password: string
  @column()
  public rememberMeToken?: string
  @column()
  public sesion: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(auth: auth) {
    if (auth.$dirty.password) {
      auth.password = await Hash.make(auth.password)
    }
  }
}
