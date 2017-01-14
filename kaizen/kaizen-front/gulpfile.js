const gulp = require('gulp');
const eslint = require('gulp-eslint');
const gulpIf = require('gulp-if');

gulp.task('default', function() {
  // place code for your default task here
});

function isFixed(file) {
  return file.eslint != null && file.eslint.fixed;
}

gulp.task('eslint', () => {
    return gulp.src(['app/**/*.jsx','!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
});