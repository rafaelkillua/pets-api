const beforeHook = async (address, proceed) => {
  const city = await City.findOne({ name: { like: `%${address.city}%` } })
    .meta({ makeLikeModifierCaseInsensitiveInMongo: true })
  address.city = city.id
  return proceed()
}

module.exports = {
  attributes: {
    street: {
      type: 'string',
      required: true
    },

    neighborhood: {
      type: 'string',
      required: true
    },

    city: {
      model: 'city',
      required: true
    }
  },

  beforeCreate: beforeHook,
  beforeUpdate: beforeHook
}

