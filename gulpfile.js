var del = require('del'),
    gulp = require('gulp'),
    watch = require('gulp-watch'),
    batch = require('gulp-batch'),
    jsdoc = require('gulp-jsdoc3'),
    concat = require('gulp-concat'),
    usemin = require('gulp-usemin'),
    usemin = require('gulp-usemin'),
    uglify = require('gulp-uglify'),
    header = require('gulp-header'),
    wrapper = require('gulp-wrapper'),
    minifyCss = require('gulp-minify-css'),
    minifyHtml = require('gulp-minify-html');

//--------------------------------------------------------------------------
// Configuration
//--------------------------------------------------------------------------

var pkg = require('./package.json'),
    banner = [
        '/**',
        ' * C37 - CAD in <%= new Date().toString() %>',
        ' *',
        ' * <%= pkg.name %> - <%= pkg.description %>',
        ' * @version <%= pkg.version %>',
        ' * @link <%= pkg.homepage %>',
        ' * @license <%= pkg.license %>',
        ' *',
        ' */',
        ''
    ].join('\n');


//--------------------------------------------------------------------------
// Tasks
//--------------------------------------------------------------------------


gulp.task('usemin', function () {
    return del([
        './www/**/*',
        
    ]).then(function (paths) {

        gulp.src('./src/index.html')
            .pipe(usemin({
                css: [minifyCss()],
                html: [minifyHtml({ empty: true })],
                jsLibrary: [uglify()],
                jsApp: [uglify()],
                jsData: [uglify()],
                inlinejs: [uglify()],
                inlinecss: [minifyCss(), 'concat']
            }))
            .pipe(gulp.dest('./www/'));

        gulp.src(['./src/img/**/*']).pipe(gulp.dest('./www/img/'));
        gulp.src(['./src/doc/**/*']).pipe(gulp.dest('./www/doc/'));

    });
});



gulp.task('doc', function () {
    return del([
        './doc/',
    ], gulp.src("./src/**/*.js")
        .pipe(jsdoc.parser())
        .pipe(jsdoc.generator('./doc')));
});

gulp.task('concat', function () {
    return gulp.src(['./src/namespace.js', './src/extension/*.js', './src/library.js'])
        .pipe(concat(pkg.name + '.js'))
        .pipe(wrapper({
            header: '(function (window) { \n',
            footer: [
                '\n',
                'if (typeof module === \'object\' && typeof module.exports === \'object\') {',
                '   module.exports = ' + pkg.name + '; //npm, we want to export egg instead of assigning to global Window',
                '} else {',
                '   window.' + pkg.name + ' = ' + pkg.name + ';',
                '}',
                ' ',
                '}(typeof window !== \'undefined\' ? window : this));',
            ].join('\n')
        }))
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function () {
    watch('./src/**/*.js', batch(function (events, done) {
        gulp.start('concat', done);
        gulp.start('doc', done);
    }));
});

gulp.task('default', function () {
    // place code for your default task here
});