const bcrypt = require('bcryptjs')

module.exports = {
  friendlyName: 'Compare hash',

  description: 'Compare hash with bcrypt',

  inputs: {
    password: {
      description: 'Plain text password',
      type: 'string',
      required: true
    },

    userPassword: {
      description: 'Hashed current password',
      type: 'string',
      required: true
    }
  },

  exits: {},

  fn: async (inputs, exits) => {
    const { password, userPassword } = inputs

    bcrypt.compare(password, userPassword)
      .then(match => exits.success(match))
      .catch(error => exits.error(error))
  }
}
