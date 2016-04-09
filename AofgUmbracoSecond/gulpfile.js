var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var path = require('path');
var watch = require('gulp-watch');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require("gulp-plumber");
var gutil = require('gulp-util');

gulp.task('less', function () {
    var s = gulp.src('Assets/site.less')
        .pipe(plumber(function (error) {
            gutil.log(error.message);
            this.emit('end');
        }))
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('css/min'));

    return s;
});

gulp.task('watch', function () {
    gulp.watch("Assets/**/*.less", ['less']);
});

gulp.task('default', ['watch', 'less']);