const { run, clean, styles, scripts, html, images, resources } = require('./config/gulp.dev.js');
const { prod } = require('./config/gulp.prod.js');

exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.html = html;
exports.images = images;
exports.resources = resources;
exports.prod = prod;
exports.default = run;
