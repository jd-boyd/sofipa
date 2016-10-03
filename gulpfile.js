const gulp = require('gulp');
const babel = require('gulp-babel');
const jasmine = require('gulp-jasmine-phantom');

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
    gulp.src(['dist/*.js', 'spec/test.js'])
        .pipe(jasmine({
		integration: true
	}));
});

gulp.task('default', ['js-build'], function() {
    // place code for your default task here
});
