module.exports = {
  friendlyName: 'Generate auth token',

  description: 'Generate token for authentication using jsonwebtoken',

  inputs: {
    user: {
      description: 'user data to encrypt',
      type: 'ref',
      required: true
    }
  },

  exits: {},

  fn: async function (inputs, exits) {
    const secret = process.env.JWT_SECRET
    console.log(secret)
    const exp = 86400

    const { user } = inputs
    let token = await sails.helpers.jwt.customSign(user, secret, exp)

    return exits.success(token)
  }
}
