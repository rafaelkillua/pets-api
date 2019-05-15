module.exports = {
  friendlyName: 'Login',

  description: 'User login with email and password',

  inputs: {
    email: {
      type: 'string',
      required: true
    },

    password: {
      type: 'string',
      required: true
    }
  },

  exits: {
    wrongData: {
      responseType: 'badRequest'
    }
  },

  fn: async function (inputs, exits) {
    const { email, password } = inputs
    const user = await User.findOne({ email: { like: `%${email}%` } }).meta({ makeLikeModifierCaseInsensitiveInMongo: true })
    if (!user) {
      throw { wrongData: 'Wrong email or password' }
    }

    if (user.status !== 'activated') {
      throw { wrongData: 'Wrong email or password' }
    }

    const passwordMatch = await sails.helpers.cipher.cipherCompare(
      password,
      user.password
    )
    if (!passwordMatch) {
      throw { wrongData: 'Wrong email or password' }
    }

    const token = await sails.helpers.jwt.authToken(user)
    if (token) {
      return exits.success({ token, user: user.id })
    } else {
      throw { wrongData: 'Error generating token' }
    }
  }
}
