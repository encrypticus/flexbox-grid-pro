const gulp = require('gulp');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const groupCss = require('gulp-group-css-media-queries');
const rename = require('gulp-rename');
const cleanCss = require('gulp-clean-css');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();
const stylelint = require('gulp-stylelint');

gulp.task('development', () => {
  return gulp.src('grid/scss/grid.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(groupCss())
    .pipe(cleanCss({ format: 'beautify' }))
    .pipe(gulp.dest('dist'));
});

gulp.task('production', () => {
  return gulp.src('grid/scss/grid.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(groupCss())
    .pipe(csso())
    .pipe(rename('grid.min.css'))
    .pipe(gulp.dest('dist'));
});

gulp.task('docs-pug', () => {
  const data = require('./src/pug/data.json');

  return gulp.src(['src/pug/index.pug', 'src/pug/index.ru.pug'])
    .pipe(pug({
      pretty: true,
      locals: data
    }))
    .pipe(gulp.dest('docs'));
});

gulp.task('docs-sass', () => {
  return gulp.src(['src/sass/**/*.scss' ,'src/sass/**/*.sass'])
    .pipe(sass().on('error', sass.logError))
    .pipe(groupCss())
    .pipe(csso())
    .pipe(gulp.dest('docs'));
});

gulp.task('docs-js', () => {
  return gulp.src('src/pug/components/burger/burger.js')
    .pipe(gulp.dest('docs'));
});

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: './docs'
    }
  });
  browserSync.watch('docs', browserSync.reload);
});

// Линтинг sass/scss
gulp.task('lint-sass', () => {
  return gulp.src('./**/*.scss', './**/*.sass')
    .pipe(stylelint({
      fix: true,
      reporters: [
        { formatter: 'string', console: true }
      ]
    }))
    .pipe(gulp.dest((file) => {
      return file.base;
    }));
});

gulp.task('watch', () => {
  gulp.watch(['grid/**/*.scss', 'src/**/*.scss', 'src/**/*.sass'], gulp.series(['development', 'production', 'docs-sass']));
  gulp.watch(['src/**/*.pug'], gulp.parallel('docs-pug'));
});

gulp.task('default', gulp.series(
  'development',
  'production',
  'docs-pug',
  'docs-sass',
  'lint-sass',
  gulp.parallel('watch', 'browserSync')
));