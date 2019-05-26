const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

// complie scss in css

function style() {
    //where is my sass file
    return gulp.src('./scss/**/*.scss')
        //pass it to sass compiler
        .pipe(sass().on('error', sass.logError))
        //where to coplile CSS
        .pipe(gulp.dest('./css'))
        //stream changes to all browserSync
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('./scss/**/*.scss', style);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;

// run gilp watch and voala