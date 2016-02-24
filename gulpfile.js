require('es6-promise').polyfill();
var gulp        = require('gulp');
var babel       = require('gulp-babel');
var react       = require('gulp-react');
var browserify  = require('browserify');
var babelify    = require('babelify');
var watchify    = require('watchify');
var streamify   = require('gulp-streamify');
var uglify      = require('gulp-uglify');
var source      = require('vinyl-source-stream');
var concat      = require('gulp-concat');
var minifyCSS   = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');

// Babelify the JSX to ordinary JS with the "react"-preset
gulp.task('react', function () {
    return browserify({entries: './src/main.jsx', debug: true})
        .transform(babelify, {presets: ["react"]})
        .bundle()
        .pipe(source('main.js'))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest('./build/js/'));
});

// Minify, concat and copy the css files
gulp.task('css', function () {
    gulp.src('src/style/*.css')
        .pipe(minifyCSS())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('build/css'))
});

// Just running the two tasks
gulp.task('default', ['react', 'css']);
