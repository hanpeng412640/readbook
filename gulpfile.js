var gulp = require('gulp');
var less = require('gulp-less');
var squence = require('gulp-sequence');
var server = require('gulp-webserver');
var mincss = require('gulp-clean-css');
var es5js = require('gulp-babel');
var minjs = require('gulp-uglify');
var mock = require('./src/data/mock.js');
var minhtml = require('gulp-htmlmin');
var url = require('url');
gulp.task('testless', function() {
    gulp.src(['./src/css/*.css', './src/fonts/*css'])
        .pipe(less())
        .pipe(mincss())
        .pipe(gulp.dest("dist/css"))
});
gulp.task('testjs', function() {
    gulp.src(['./src/js/{common/,lib/,page/}*.js', "./src/js/main.js"])
        .pipe(minjs())
        .pipe(gulp.dest("dist/js"))
});
gulp.task('testfonts', function() {
    gulp.src('./src/fonts')
        .pipe(gulp.dest("dist/fonts"))
});
gulp.task('testhtml', function() {
    gulp.src('src/**/*.html')
        // .pipe(minhtml())
        .pipe(gulp.dest("dist"))
})
gulp.task('server', function() {
    gulp.src('dist')
        .pipe(server({
            port: 8080,
            host: 'localhost',
            // livereload: true,
            // open: true,
            middleware: function(req, res, next) {
                var uname = url.parse(req.url, true);
                if (/\/book/g.test(uname.pathname)) {
                    return res.end(JSON.stringify(mock(req.url)))

                }
                return next();
            }
        }))
});
gulp.task('default', function(cd) {
    squence("server", cd)
})