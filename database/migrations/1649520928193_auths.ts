import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AuthsSchema extends BaseSchema {
  protected tableName = 'auths'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary(),
      table.string('username', 25).notNullable()
      table.string('email', 100).notNullable()
      table.string('url_foto',50),
      table.string('password', 100).notNullable()
      table.string('remember_me_token').nullable()
      table.integer('sesion').unsigned().references('id').inTable('sesions').defaultTo(2)
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
