/* eslint-disable strict */

var
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    minifyJs = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    sourceMaps = require('gulp-sourcemaps'),
    eslint = require('gulp-eslint'),
    replace = require('gulp-replace'),
    addsrc = require('gulp-add-src'),
    es = require('event-stream'),
    del = require('del'),
    awspublish = require('gulp-awspublish'),
    webserver = require('gulp-webserver'),
    parallelize = require('concurrent-transform'),
    pkg = require('./package.json');

gulp.task('build-js', function () {
    return gulp.src('./src/**/*.js')
        .pipe(ngAnnotate({ single_quotes: true, add: true, remove: true }))
        .pipe(addsrc('./build/' + pkg.name + '-html.js'))
        .pipe(sourceMaps.init())
        .pipe(concat(pkg.name + '.js'))
        .pipe(sourceMaps.write('.'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build-js-min', function () {
    return gulp.src('./src/**/*.js')
        .pipe(ngAnnotate({ single_quotes: true, add: true, remove: true }))
        .pipe(addsrc('./build/' + pkg.name + '-html.min.js'))
        // .pipe(sourceMaps.init())
        .pipe(concat(pkg.name + '.min.js'))
        .pipe(minifyJs())
        // .pipe(sourceMaps.write('.'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build-max', ['build-js']);
gulp.task('build-min', ['build-js-min']);

gulp.task('publish', function () {
    var
        publisher = awspublish.create({
            params: {
                Bucket: 'webui.pipdevs.com'
            },
            accessKeyId: 'AKIAJCEXE5ML6CKW4I2Q',
            secretAccessKey: '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',
            region: 'us-west-1'
        }),

        distFiles = gulp.src([
            './node_modules/pip-webui-lib/dist/**/*',
            './node_modules/pip-webui-css/dist/**/*',
            './node_modules/pip-webui-core/dist/**/*',
            './node_modules/pip-webui-rest/dist/**/*',
            './node_modules/pip-webui-controls/dist/**/*',
            './node_modules/pip-webui-connected/dist/**/*',
            './node_modules/pip-webui-pages/dist/**/*',
            './node_modules/pip-webui-test/dist/**/*',
            './dist/**/*'
        ], { xbase: '.' }),

        indexFiles = gulp.src([
            './samples/**/index.*'
        ], { xbase: '.' })
            .pipe(replace(pkg.name + '-lib.css', pkg.name + '-lib.min.css'))
            .pipe(replace(pkg.name + '-lib.js', pkg.name + '-lib.min.js'))
            .pipe(replace(pkg.name + '.css', pkg.name + '.min.css'))
            .pipe(replace(pkg.name + '.js', pkg.name + '.min.js'))
            .pipe(replace('/node_modules/pip-webui-lib', ''))
            .pipe(replace('/node_modules/pip-webui-css', ''))
            .pipe(replace('/node_modules/pip-webui-core', ''))
            .pipe(replace('/node_modules/pip-webui-rest', ''))
            .pipe(replace('/node_modules/pip-webui-test', ''))
            .pipe(replace('/node_modules/pip-webui-controls', ''))
            .pipe(replace('/node_modules/pip-webui-connected', ''))
            .pipe(replace('/node_modules/pip-webui-pages', ''))
            .pipe(replace('/node_modules/pip-webui-test', ''))
            .pipe(replace('/node_modules/pip-webui-lib-test', ''))
            .pipe(replace('../../../dist/', '/' + pkg.name + '/'))
            .pipe(replace('../../dist/', '/' + pkg.name + '/'))
            .pipe(replace('../dist/', '/' + pkg.name + '/')),

        otherFiles = gulp.src([
            './samples/**/*',
            '!./samples/**/index.*'
        ], { xbase: '.' });

    return es.merge([distFiles, indexFiles, otherFiles])
        .pipe(rename(function (path) {
            path.dirname = '/' + pkg.name + '/' + path.dirname;
        }))
        .pipe(parallelize(publisher.publish(), 5))
        .pipe(publisher.sync(pkg.name))
        .pipe(awspublish.reporter());
});

gulp.task('lint', function () {
    return gulp.src('./src/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('clean', function () {
    del(['./build', './dist']);
});

gulp.task('watch', function () {
    gulp.watch('./src/**/*', ['rebuild']);
});

gulp.task('launch', function () {
    gulp.src(['.'])
        .pipe(webserver({
            port: 8010,
            // livereload: false,
            // directoryListing: false,
            open: 'http://localhost:8010/samples/index.html'
        }));
});

gulp.task('build', ['build-max', 'build-min']);
gulp.task('rebuild', ['build-max']);
gulp.task('default', ['build']);
