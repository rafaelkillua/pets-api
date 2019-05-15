module.exports = {
  friendlyName: 'Create',

  description: 'Create pet',

  inputs: {
    name: {
      type: 'string',
      required: true
    },

    species: {
      type: 'ref',
      required: true,
      custom: value => sails.helpers.validators.objectidValidator(value)
    },

    race: {
      type: 'string',
      required: true
    },

    gender: {
      type: 'string',
      isIn: ['male', 'female'],
      required: true
    },

    status: {
      type: 'string',
      isIn: ['lost', 'found', 'adopt', 'finished'],
      defaultsTo: 'pending'
    },

    description: {
      type: 'string',
      required: true
    },

    contact: {
      type: 'string',
      required: true
    },

    street: {
      type: 'string',
      required: true
    },

    neighborhood: {
      type: 'string',
      required: true
    },

    city: {
      type: 'string',
      required: true
    }
  },

  exits: {},

  fn: async function (inputs, exits) {
    const {
      name,
      species,
      race,
      gender,
      status,
      contact,
      description,
      street,
      neighborhood,
      city
    } = inputs

    const foundSpecies = await Species.findOne({ id: species })
    if (!foundSpecies) { throw 'notFound' }

    const address = await Address.create({
      street,
      neighborhood,
      city
    }).fetch()

    const pet = await Pet.create({
      name,
      owner: this.req.sender.id,
      species,
      race,
      gender,
      status,
      contact,
      description,
      address: address.id
    }).fetch()

    return exits.success(pet)
  }
}

