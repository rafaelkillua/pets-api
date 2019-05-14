const beforeHook = async function (values, cb) {
  if (values.password) {
    try {
      const hash = await sails.helpers.cipher.cipherHash(values.password)
      values.password = hash
      return cb()
    } catch (error) {
      return cb(error)
    }
  } else {
    return cb()
  }
}

module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true
    },

    email: {
      type: 'string',
      required: true,
      unique: true
    },

    password: {
      type: 'string'
    },

    status: {
      type: 'string',
      isIn: ['activated', 'blocked'],
      defaultsTo: 'activated'
    },

    accessLevel: {
      type: 'string',
      isIn: ['customer', 'admin'],
      defaultsTo: 'customer'
    },

    phone: {
      type: 'string',
      required: true
    },

    city: {
      model: 'city',
      required: true
    },

    myPets: {
      collection: 'pet',
      via: 'owner'
    }
  },

  customToJSON: function () {
    return _.omit(this, ['password'])
  },

  // Lifecycle Callbacks
  beforeCreate: beforeHook,
  beforeUpdate: beforeHook
}
