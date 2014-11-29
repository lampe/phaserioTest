/* Information about this package */
Package.describe({
  summary: "phaserio wrapper for meteor",
  version: "2.1.2",
  name: "lampe:phaserio",
  git: "https://github.com/lampe/phaserio.git",
});

/* This defines your actual package */
Package.onUse(function (api) {
  api.versionsFrom('0.9.0');
  api.use('underscore', 'server');
  api.imply('templating');

  api.addFiles('phaser.js', 'client');
  api.export('Pio', 'client');
  api.export('Physics', 'client');
});
