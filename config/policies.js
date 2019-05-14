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
  'user/forgot-password': true,
  'user/update-password': true,
  'user/findOne': 'isLogged',
  'user/sync': 'isLogged',
  'user/update': 'isLogged',
  'user/my-place-solicitations': 'isLogged',

  // PLACE POLICIES
  'place/create': true,
  'place/update': 'isLogged',
  'place/findOne': 'isLogged',
  'place/upload-images': true,

  // ADDRESS POLICIES
  'address/findOne': 'isLogged',
  'address/create': 'isLogged',
  'address/update': 'isLogged',

  // PLACE SOLICITATION POLICIES
  'placeSolicitation/create': 'isLogged',
  'placeSolicitation/findOne': 'isLogged',
  'placeSolicitation/update': 'isLogged',
  'placeSolicitation/suggest': 'isLogged',
  'placeSolicitation/generate-suggestions': 'isLogged',
  'placeSolicitation/select-suggestion': 'isLogged',

  // NEWSLETTER POLICIES
  'newsletter/subscribe': true,
  'newsletter/cancel': true,

  // ETC POLICIES
  'city/find': 'isLogged',
  'state/find': 'isLogged',
  'placeType/find': true,

}
