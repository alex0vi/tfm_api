/* eslint global-require: 0 */

import { fromJS } from 'immutable';

export default fromJS([
  // The "getting started" schema provides table-of-contents links
  // for the sections in src/client/introduction.js.  You are free
  // to customize or remove both the schema and the introduction component.
  require('../documentationApiSchema/a.session.json'),
  require('../documentationApiSchema/b.signUp.json'),
  require('../documentationApiSchema/c.user.json'),
  require('../documentationApiSchema/d.forgotPassword.json'),
  require('../documentationApiSchema/e.token.json')
]);
