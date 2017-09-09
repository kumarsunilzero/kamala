var gulp = require('gulp');
var gulpNgConfig = require('gulp-ng-config');
var env = process.env.NODE_ENV;
console.log(env);
gulp.task('test', function() {
    gulp.src('config/main.json')
        .pipe(gulpNgConfig('myApp.config', { environment: env }))
        .pipe(gulp.dest('app/js/'))
});