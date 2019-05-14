/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  // '/': { view: 'pages/homepage' },

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/

  // USER ROUTES
  'post /login': 'user/login',
  'post /signup': 'user/signup',
  'get /user': 'user/find',
  'get /user/:id': 'user/findone',
  'patch /user/:id': 'user/update',
  'get /user/dashboard': 'user/dashboard',
  'get /user/sync': 'user/sync',
  'post /forgotPassword': 'user/forgot-password',
  'post /updatePassword': 'user/update-password',
  'get /myPlaceSolicitations': 'user/my-place-solicitations',

  // PLACE ROUTES
  'post /place/create': 'place/create',
  'get /place': 'place/find',
  'get /place/:id': 'place/findone',
  'patch /place/:id': 'place/update',
  'post /place/:id/uploadImages': 'place/upload-images',

  // PLACE SOLICITATION ROUTES
  'post /placeSolicitation/create': 'placeSolicitation/create',
  'get /placeSolicitation': 'placeSolicitation/find',
  'get /placeSolicitation/:id': 'placeSolicitation/findone',
  'patch /placeSolicitation/:id': 'placeSolicitation/update',
  'get /placeSolicitation/:id/generateSuggestions': 'placeSolicitation/generate-suggestions',
  'post /placeSolicitation/:id/suggest': 'placeSolicitation/suggest',
  'post /placeSolicitation/:id/selectSuggestion': 'placeSolicitation/select-suggestion',

  // CITY, STATE AND PLACETYPE ROUTES
  'get /city': 'city/find',
  'get /state': 'state/find',
  'get /placeType': 'placeType/find'
}
