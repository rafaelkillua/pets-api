const bcrypt = require('bcryptjs')

module.exports = {
  friendlyName: 'Chipher helper',

  description: 'Chipher helper for password user and others',

  inputs: {
    password: {
      description: 'user password',
      type: 'string',
      required: true
    }
  },

  exits: {},

  fn: async (inputs, exits) => {
    const { password } = inputs

    bcrypt.hash(password, 11)
      .then(hash => exits.success(hash))
      .catch(err => exits.error(err))
  }
}
