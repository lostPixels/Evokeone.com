var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        proxy: "localhost"
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

gulp.task('default', ['serve']);
