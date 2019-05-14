const jwt = require('jsonwebtoken')

module.exports = {
  friendlyName: 'Decode custom signed token',

  description: 'Decode token for data using custom secret',

  inputs: {
    token: {
      description: 'token to decode',
      type: 'string',
      required: true
    },

    secret: {
      type: 'string',
      required: true
    }
  },

  exits: {
    tokenExpiredError: {
      description: 'jwt token expired'
    }
  },

  fn: async function (inputs, exits) {
    const { token, secret } = inputs

    try {
      let data = await jwt.verify(token, secret, { algorithm: 'HS256' })
      return exits.success(data)
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw 'tokenExpiredError'
      }
      throw error
    }
  }
}
