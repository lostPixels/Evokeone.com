var gulp = require('gulp');
var sass = require('gulp-sass');
var imageResize = require('gulp-image-resize');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        proxy: "localhost:3000"
    });

    gulp.watch("assets/scss/**/*.scss", ['sass']);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("assets/scss/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(gulp.dest("assets/css/dist"))
        .pipe(browserSync.stream());
});

/*
    TODO: SUPPORT PNG?
*/
gulp.task('resize', function() {
    return gulp.src('assets/art/full/*.{jpg,png}')
        .pipe(plumber())
        .pipe(imageResize({
            width: 250,
            height: 250,
            crop: true,
            filter: "Catrom",
            format: "jpg",
            quality: 0.9
        }))
        .pipe(gulp.dest('assets/art/thumb'));
});

gulp.task('default', ['serve']);
