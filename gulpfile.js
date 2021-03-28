var gulp        = require('gulp');
var sass        = require('gulp-sass');
var concat      = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var express     = require('express');
var app         = express();
var server      = require('http').Server(app);
var path        = require('path');
var livereload  = require('gulp-livereload')
var browserSync = require('browser-sync').create()
var serverPort  = 8000;

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: '.'
    },
  });
});

gulp.task('sass', function() {
    return gulp.src('sass/**/*.scss')
        .pipe(sass({
            outputStyle: 'expanded',
            sourceComments: true,
            errLogToConsole: false,
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            versions: ['last 2 browsers']
        }))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('js', function() {
  return gulp.src('/js/**/*.js')
    .pipe( gulp.dest('/js/'))
    .pipe(livereload());
});

gulp.task('express', function() {
    app.use(express.static(path.resolve('./')));
    server.listen(serverPort, function(){
        console.log('Servidor corriendo en http://localhost:'+serverPort);
    });
});

gulp.task('watch', ['browserSync'], function () {
    livereload.listen();
    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch('js/**/*.js',['js']);
    gulp.watch('**/*.html');
});

// Default task to be run with `gulp`
gulp.task('default', ['sass', 'js', 'express', 'watch']);