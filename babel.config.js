// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current', // ensures Jest runs with current Node version
        },
      },
    ],
  ],
};
