const {src, dest, series, watch, parallel} = require('gulp');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const svgSprite = require('gulp-svg-sprite');
const image = require('gulp-image');
const babel = require('gulp-babel');
const notify = require('gulp-notify');
const uglify = require('gulp-uglify-es').default;
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass')(require('sass'));
const doiuse = require('doiuse');
const typograf = require('gulp-typograf');
const fileInclude = require('gulp-file-include');
const webp = require('gulp-webp');
const browserSync = require('browser-sync').create();

const clean = () => {
  return del(['dist']);
}

const resources = () => {
  return src('src/resources/**')
  .pipe(dest('dist/resources/'));
}

const styles = () => {
  return src(['src/scss/**/normalize.css', 'src/scss/**/main.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      doiuse({
        browsers: [
          '> 0.5%',
          'last 2 versions',
          'Firefox ESR',
          'not op_mini all',
          'not dead',
        ],
        ignore: ['text-size-adjust', 'css-appearance'],
        ignoreFiles: ['**/normalize.css'],
        onFeatureUsage: function (usageInfo) {
          console.log(usageInfo.message)
        }
      }),
      autoprefixer({
        cascade: false,
      }),
    ]))
    .pipe(concat('main.css'))
    .pipe(cleanCSS({
      level: 2,
    }))
    .pipe(sourcemaps.write())
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
};

const html = () => {
  return src('src/**/index.html')
  .pipe(fileInclude({
    prefix: '@@',
    basepath: '@file'
  }))
  .pipe(htmlMin({
    collapseWhitespace: true,
  }))
  .pipe(typograf({
    locale: ['ru', 'en-US'],
    safeTags: [
      ['<\\?php', '\\?>'],
      ['<no-typography>', '</no-typography>']
    ]
  }))
  .pipe(dest('dist'))
  .pipe(browserSync.stream());
};

const svgSprites = () => {
  return src('src/images/svg/**/*.svg')
  .pipe(svgSprite({
    mode: {
      stack: {
        sprite: '../sprites.svg'
      }
    }
  }))
  .pipe(dest('dist/images'));
};

const scripts = () => {
  return src([
    'src/js/components/**/*.js',
    'src/js/**/main.js'
  ])
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(concat('app.js'))
  .pipe(uglify({
    toplevel: true,
  }).on('error', notify.onError()))
  .pipe(sourcemaps.write())
  .pipe(dest('dist'))
  .pipe(browserSync.stream());
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist',
    }
  });
};

const images = () => {
  return src([
    'src/images/**/*.jpg',
    'src/images/**/*.png',
    'src/images/**/*.svg',
    'src/images/**/*.jpeg',
  ])
  .pipe(image())
  .pipe(dest('dist/images'))
  .pipe(webp())
  .pipe(dest('dist/images'));
};

watch('src/**/*.html', html);
watch('src/scss/**/*.{css,scss}', styles);
watch('src/images/svg/**/*.svg', svgSprites);
watch('src/js/**/*.js', scripts);
watch('src/resources/**', resources);

exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.html = html;
exports.images = images;
exports.resources = resources;
exports.run = series(clean, parallel(resources, html, scripts, styles, images, svgSprites), watchFiles);
