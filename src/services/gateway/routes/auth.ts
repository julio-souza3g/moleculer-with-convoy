import config from './config';

export default [{
  ...config,
  path: '/api/auth',

  aliases: {
    // auth
    'POST /user': 'auth.createUser',
  },
}];
