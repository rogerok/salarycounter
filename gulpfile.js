const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const del = require('del');
const fileinclude = require('gulp-file-include');

let preprocessor = 'sass'; 
function browsersync() {
    browserSync.init({
        server: { baseDir: 'app'},
        notify: false,
        online: true
    });
}


function scripts() {
    return src([
        'app/js/script.js'

    ])
    .pipe(concat('script.min.js'))
    /* .pipe(uglify()) */
    .pipe(dest('app/js'))
    .pipe(browserSync.stream());
}

function images() {
    return src('app/img/src/**/*')
    .pipe(newer('app/img/dest'))
    .pipe(imagemin())
    .pipe(dest('app/img/dest'));
}

function cleanimg() {
    return del('app/img/dest/**/*', { force: true });
}

function cleandist() {
    return del('dist/**/*', { force: true });
}

function styles() {
    return src('app/' + preprocessor + '/main.' + preprocessor + '')
    .pipe(eval(preprocessor)())
    .pipe(sass()/* .on('error', sass.logError) */)
    .pipe(concat('app.min.css'))
    .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true}))
    .pipe(cleancss( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } ))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream());
}


function buildcopy() {
    return src([
        'app/css/**/*.min.css',
        'app/js/**/*.min.js',
        'app/img/dest/**/*',
        'app/**/*.html',
    ], { base: 'app' })
    .pipe(dest('dist'));
}

function startWatch() {
    watch([
        'app/js/**/*.js',
        '!app/**/*.min.js'
    ], scripts);
    watch('app/**/' + preprocessor + '/**/*', styles);
    watch('app/**/*.html').on('change', browserSync.reload);
    watch('app/img/src/**/*', images);

}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.cleanimg = cleanimg;
exports.cleandist = cleandist;

exports.build = series(cleandist, styles, scripts, images, buildcopy);
exports.default = parallel(styles, scripts, browsersync, startWatch);