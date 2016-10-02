const gulp = require('gulp');
const babel = require('gulp-babel');
const jasmine = require('gulp-jasmine');

gulp.task('js-build', function () {
    gulp.src(['./src/**/*.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
	.pipe(gulp.dest('./dist/'));
});

gulp.task('test-build', function () {
    gulp.src(['./tests/**/*.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
	.pipe(gulp.dest('./spec/'));
});

gulp.task("run-tests", ["js-build", "test-build"], function () {
    gulp.src('spec/test.js')
        .pipe(jasmine());
});

gulp.task('default', ['js-build'], function() {
    // place code for your default task here
});
