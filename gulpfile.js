var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');

// Default task - Run with command 'gulp'
gulp.task('default', function() {
  console.log('Gulp funcionando...');
});

/* Variaveis */
// Fonte do Sass
var sassFile = './CSS/inspiration.scss';
// Destino do CSS compilado
var cssDest = './CSS';

// Task 'sass' - Run with command 'gulp sass'
gulp.task('sass', function() {
  return gulp.src(sassFile)
    .pipe(autoprefixer({
      browsers: ['last 30 versions'],
      cascade: false
    }))
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(rename('inspiration.css'))
    .pipe(gulp.dest(cssDest));
});

// Vigia Global
gulp.task('watch', function() {
  gulp.watch(sassFile, 'sass');
});
