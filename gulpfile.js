var gulp = require('gulp'),
    tap = require('gulp-tap'),
    rename = require('gulp-rename'),
    browserify = require('browserify');

var bundler = function (file) {
    var opts = {
        entries: [file.path],
        paths: ['./node_modules', './src'],
        debug: true
    }

    file.contents = browserify(opts)
        .transform("babelify", {presets: ["es2015"], plugins: ["syntax-jsx", "transform-h-jsx"]})
        .bundle();
}

gulp.task('example:router', function () {
    return gulp.src('examples/router/app.js', {read: false})
        .pipe(tap(bundler))
        .pipe(rename('app.bundle.js'))
        .pipe(gulp.dest('examples/router'));
});

gulp.task('example:rest', function () {
    return gulp.src('examples/rest/app.js', {read: false})
        .pipe(tap(bundler))
        .pipe(rename('app.bundle.js'))
        .pipe(gulp.dest('examples/rest'));
});

gulp.task('example:todomvc', function () {
    return gulp.src('examples/todomvc/src/app.js', {read: false})
        .pipe(tap(bundler))
        .pipe(rename('app.bundle.js'))
        .pipe(gulp.dest('examples/todomvc'));
});

gulp.task('default', [
    'example:router',
    'example:rest',
    'example:todomvc'
]);
