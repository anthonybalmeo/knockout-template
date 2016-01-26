var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass  = require('gulp-ruby-sass'),
    plumber = require('gulp-plumber'),
    imagemin=require('gulp-imagemin'),
    prefix = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    inject = require('gulp-inject'),
    watch = require('gulp-watch');

//SCRIPTS TASK
gulp.task('scripts', function() {
  gulp.src('js/**/*.js')
      .pipe(plumber())
      .pipe(concat('main.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dest/js/'));
});

//SASS TASK
gulp.task('sass', function() {
  return sass('sass/**/*.sass', {
    style: 'compressed'
  })
    .pipe(plumber())
    .pipe(concat('styles.css'))
    .pipe(prefix('last 2 versions'))
    .pipe(gulp.dest('dest/css/'));
});

//IMAGE OPTIMIZATION TASK
gulp.task('image', function(){
  gulp.src('img/*')
      .pipe(imagemin())
      .pipe(gulp.dest('dest/img/'));
});

//WATCH TASK
gulp.task('watch', function() {
  gulp.watch('js/**/*.js', ['scripts']);
  gulp.watch('img/*', ['sass']);
  gulp.watch('sass/**/*.sass', ['sass']);
});

gulp.task('default', ['scripts', 'sass', 'image', 'watch']);
