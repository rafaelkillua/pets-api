/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  '*': ['isLogged', 'isAdmin'],

  //USER POLICIES
  'user/login': true,
  'user/signup': true,
  'user/sync': 'isLogged',
  'user/my-pets': 'isLogged',
  'user/update': 'isLogged',

  // PET ROUTES
  'pet/find': true,
  'pet/create': 'isLogged',
  'pet/update': 'isLogged',
  'pet/upload-images': 'isLogged',

  // CITY, STATE AND SPECIES POLICIES
  'city/find': true,
  'state/find': true,
  'species/find': 'isLogged'
}
