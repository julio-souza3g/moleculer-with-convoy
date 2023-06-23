import config from './config';

export default [{
  ...config,
  path: '/api/webhook',

  aliases: {

    // webhook
    'GET /': 'webhook.hello',
  },
}];
