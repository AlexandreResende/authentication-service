module.exports = {
  spec: 'tests/**/*.spec.js',
  recursive: true,
  ttimeout: 5000,
  ui: 'bdd',
  require: ['chai/register-expect'],
};
