const gulp = require('gulp');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const jasmine = require('gulp-jasmine-phantom');
const webserver = require('gulp-webserver');
const Server = require('karma').Server;

var paths = {
    src: ['./src/**/*.js'],
    tests: ['./tests/**/*.js']
};


gulp.task('js-build', function () {
    gulp.src(paths.src)
        .pipe(babel({
            presets: ['es2015']
        }))
	.pipe(gulp.dest('./dist/'));
});

gulp.task('test-build', function () {
    gulp.src(paths.src.concat(paths.tests))
        .pipe(babel({
            presets: ['es2015']
        }))
	.pipe(concat('test.js'))
	.pipe(gulp.dest('./spec/'));
});

gulp.task("run-tests", ["js-build", "test-build"], function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('webserver', function() {
  gulp.src('./')
	.pipe(webserver({
	    host: "0.0.0.0",
      livereload: true,
      directoryListing: true,
      open: true
    }));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(paths.src.concat(paths.tests), ['test-build']);
  gulp.watch(paths.src, ['js-build']);
});

gulp.task('default', ['js-build'], function() {
    // place code for your default task here
});
