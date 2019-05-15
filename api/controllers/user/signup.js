module.exports = {
  friendlyName: 'Signup',

  description: 'User signup',

  inputs: {
    name: {
      type: 'string',
      required: true
    },

    email: {
      type: 'string',
      required: true
    },

    password: {
      type: 'string',
      required: true,
      minLength: 6,
      maxLength: 20
    },

    phone: {
      type: 'string',
      required: true
    },

    city: {
      type: 'string',
      required: true,
      custom: value => sails.helpers.validators.objectidValidator(value)
    }
  },

  exits: {
    emailExists: {
      responseType: 'badRequest'
    }
  },

  fn: async function (inputs, exits) {
    const { name, email, password, phone, city } = inputs
    const user = { name, email: email.toLowerCase(), password, phone, city }
    let finalUser

    const foundUser = await User.findOne({ email: { like: `%${user.email}%` } })
      .meta({ makeLikeModifierCaseInsensitiveInMongo: true })

    if (foundUser) {
      throw { emailExists: 'Email already exists.' }
    }

    finalUser = await User.create(user)
      .fetch()
    const token = await sails.helpers.jwt.authToken(finalUser)
    return exits.success({ user: finalUser.id, token })
  }
}
