module.exports = {
  friendlyName: 'Update',

  description: 'User update',

  inputs: {
    id: {
      type: 'string',
      required: true,
      custom: value => sails.helpers.validators.objectidValidator(value)
    },

    name: {
      type: 'string'
    },

    email: {
      type: 'string'
    },

    password: {
      type: 'string',
      minLength: 6,
      maxLength: 20
    },

    status: {
      type: 'string',
      isIn: ['activated', 'blocked']
    },

    accessLevel: {
      type: 'string',
      isIn: ['customer', 'admin']
    },

    phone: {
      type: 'string'
    },

    city: {
      type: 'string',
      custom: value => sails.helpers.validators.objectidValidator(value)
    }
  },

  exits: {
    emailExists: {
      responseType: 'badRequest'
    }
  },

  fn: async function (inputs, exits) {
    const { id, name, email, password, status, accessLevel, phone, city } = inputs
    const user = this.req.sender
    let updatedUser = {}

    // Controle de acesso
    switch (user.accessLevel) {
      case 'customer':
        updatedUser = await User.updateOne(
          { id: user.id },
          { name, email, password, phone, city }
        )
          .intercept('E_UNIQUE', () => ({ emailExists: 'Email already exists' }))
        break

      case 'admin':
        updatedUser = await User.updateOne(
          { id },
          { name, email, password, status, accessLevel, phone, city }
        )
          .intercept('E_UNIQUE', () => ({ emailExists: 'Email already exists' }))
        break
    }

    return exits.success(updatedUser)
  }
}
