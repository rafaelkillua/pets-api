const jwt = require('jsonwebtoken')

module.exports = {
  friendlyName: 'Generate custom signed token',

  description: 'Generate token for data using custom secret',

  inputs: {
    data: {
      description: 'data to encrypt',
      type: 'ref',
      required: true
    },

    secret: {
      type: 'string',
      required: true
    },

    exp: {
      type: 'number'
    }
  },

  exits: {},

  fn: async function (inputs, exits) {
    const { data, secret, exp } = inputs
    let tokenIss = { iss: data }

    if (exp) {
      tokenIss.exp = Math.floor(Date.now() / 1000) + (exp || 3600)
    }
    let token = await jwt.sign(tokenIss, secret, { algorithm: 'HS256' })

    return exits.success(token)
  }
}
