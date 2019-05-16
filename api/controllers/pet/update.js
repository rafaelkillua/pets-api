module.exports = {
  friendlyName: 'Update',

  description: 'Update pet',

  inputs: {
    id: {
      type: 'string',
      required: true,
      custom: value => sails.helpers.validators.objectidValidator(value)
    },

    name: {
      type: 'string'
    },

    race: {
      type: 'string'
    },

    gender: {
      type: 'string',
      isIn: ['male', 'female']
    },

    status: {
      type: 'string',
      isIn: ['lost', 'found', 'adopt', 'finished']
    },

    description: {
      type: 'string'
    },

    contact: {
      type: 'string'
    },

    // ADDRESS
    street: {
      type: 'string'
    },

    neighborhood: {
      type: 'string'
    },

    city: {
      type: 'string'
    }
  },

  exits: {
    notFound: {
      responseType: 'notFound'
    }
  },

  fn: async function (inputs, exits) {
    const {
      id,
      name,
      race,
      gender,
      status,
      description,
      contact,
      street,
      neighborhood,
      city
    } = inputs

    const pet = await Pet.findOne({ id })
    if (!pet) { throw 'notFound' }

    if (street && neighborhood && city) {
      await Address.updateOne(
        { id: pet.address },
        { street, neighborhood, city }
      )
    }

    await Pet.updateOne(
      { id },
      { name, race, gender, status, description, contact }
    )

    const updatedPet = await sails.helpers.pet.deepPopulateById(id)

    return exits.success(updatedPet)
  }
}
