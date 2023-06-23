/**
 * Default config for any private route
 */
export default {
  path: '/api',
  mappingPolicy: 'restrict',
  authorization: false,
  bodyParsers: {
    json: {
      strict: false,
    },
    urlencoded: {
      extended: false,
    },
  },
};
