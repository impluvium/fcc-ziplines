
var connect        = require('gulp-connect'),
    gulp           = require('gulp'),
    livereload     = require('gulp-livereload'),
    notify         = require('gulp-notify'),
    plumber        = require('gulp-plumber'),
    sass           = require('gulp-sass');

function customPlumber (errTitle) {
  return plumber({
    errorHandler: notify.onError({
      title: errTitle || "Error running Gulp",
      message: "Error: <%= error.message %>"
    })
  });
}

// Livereload Server
gulp.task('connect', function() {
  connect.server({
    root: 'ziplines',
    livereload: true
  });
});

// Livereload
gulp.task('html', function () {
  gulp.src('./ziplines/*')
    .pipe(connect.reload());
});

// Styles
gulp.task('styles', function() {
 return gulp.src('ziplines/**/*.scss')
            .pipe(customPlumber('Error Running Sass'))
            .pipe(sass({errLogToConsole: true}))
            .pipe(gulp.dest('ziplines/'))
            .pipe(notify({ message: 'Styles task complete' }))
            .pipe(livereload());
});

// Watch
gulp.task('watch', function() {
  gulp.watch('ziplines/**/*.scss', ['styles']);
});

gulp.task('default', function() {
  gulp.start('connect', 'watch');
});
