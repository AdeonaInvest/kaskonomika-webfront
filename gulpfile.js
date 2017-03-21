var gulp = require('gulp'),
// common
    lr = require('tiny-lr'),
    livereload = require('gulp-livereload'),
    lec = require('gulp-line-ending-corrector'),
    concat = require('gulp-concat'),
    server = lr(),
    expect = require('gulp-expect-file'),
// css
    less = require('gulp-less'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
// js
    uglify = require('gulp-uglify'),
    fileinclude = require('gulp-file-include'),
    bower = require('gulp-bower'),
    angularFilesort = require('gulp-angular-filesort')
    ;

var express = require('express');
var vhost = require('vhost');
var proxyMiddleware = require('http-proxy-middleware');
var revHash = require('gulp-rev-hash');
var hash_src = require("gulp-hash-src");
var templateCache = require('gulp-angular-templatecache');
var htmlmin = require('gulp-htmlmin');
var https = require('https');
var fs = require('fs');

var jsPaths = [
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/bootstrap/dist/js/bootstrap.min.js',
    'bower_components/angular/angular.min.js',
    'bower_components/angular-animate/angular-animate.min.js',
    'bower_components/angular-cookies/angular-cookies.min.js',
    'bower_components/angular-sanitize/angular-sanitize.min.js',
    'bower_components/angular-bootstrap/ui-bootstrap.min.js',
    'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
    'bower_components/angular-route/angular-route.min.js',
    'bower_components/angular-file-upload/dist/angular-file-upload.min.js',
    'bower_components/angular-environment/dist/angular-environment.min.js',
    'bower_components/angular-translate/angular-translate.min.js',
    'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js',
    'bower_components/angular-translate-storage-local/angular-translate-storage-local.min.js',
    'bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.min.js',
    'bower_components/angular-translate-handler-log/angular-translate-handler-log.min.js',
    'bower_components/angular-jquery/dist/angular-jquery.min.js',
    'sites/src/js/lib/intercom.min.js',
    'sites/src/js/lib/echarts.js',
    'sites/src/js/lib/ngecharts.js'
];

/**
 * Сборка всего JS
 */
var jsGen = function(name){
    return function(){
        return gulp.src(['./assets/'+name+'/**/*.js'])
            .pipe(angularFilesort())
            .pipe(concat('script.js'))
            .pipe(lec({eolc: 'LF', encoding:'utf8'}))
            .pipe(gulp.dest('./sites/'+name+'/js'))
            .pipe(livereload(server));
    };
};
gulp.task('js-stream', jsGen('kaskonomika'));
gulp.task('js-partners', jsGen('partners'));

/**
 * Сборка Vendor JS
 */
gulp.task('js-vendor', ['bower'], function(){
    return gulp.src(jsPaths)
        .pipe(expect(jsPaths))
        .pipe(concat('vendor.js'))
        .pipe(lec({ eolc: 'LF', encoding:'utf8'}))
        .pipe(gulp.dest('./sites/src/js'))
});


/**
 * Сборка всего CSS + LESS
 */
var lessGen = function(name){
    return function (){
        return gulp.src('./assets/'+name+'/core/styles/_common.less')
            .pipe(less({
                compress: true
            }))
            .pipe(autoprefixer())
            .pipe(concat('style.css'))
            .pipe(lec({eolc: 'LF', encoding:'utf8'}))
            .pipe(gulp.dest('./sites/'+name+'/css'))
            .pipe(livereload(server));
    };
};
gulp.task('less-stream', lessGen('kaskonomika'));
gulp.task('less-partners', lessGen('partners'));

/**
 * Сборка всего HTML - kaskonomika
 */
gulp.task('html-stream',['js-stream', 'templates'], function() {
    return gulp.src(['./assets/kaskonomika/modules/index.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(revHash({assetsDir: './sites'}))
        .pipe(hash_src({build_dir: "./sites/kaskonomika", src_path: "./assets/kaskonomika/modules"}))
        .pipe(gulp.dest('./sites/kaskonomika'));
});

/**
 * Сборка всего HTML - partners
 */
gulp.task('html-partners',['js-partners', 'templates'], function() {
    return gulp.src(['./assets/partners/modules/index.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(revHash({assetsDir: './sites'}))
        .pipe(hash_src({build_dir: "./sites/partners", src_path: "./assets/partners/modules"}))
        .pipe(gulp.dest('./sites/partners'));
});

/**
 * Сборка всех шаблонов в JS файл - kaskonokika
 */
gulp.task('templates-stream', [], function () {
    return gulp.src(['./assets/kaskonomika/modules/**/*.html'])
        .pipe(htmlmin({
            collapseWhitespace: true,
            conservativeCollapse: true
        }))
        .pipe(templateCache('templates.js', {
            module: 'kaskonomika',
            root: '/'
        }))
        .pipe(gulp.dest('./sites/kaskonomika/js'))
        .pipe(livereload(server));
});

/**
 * Сборка всех шаблонов в JS файл - partners
 */
gulp.task('templates-partners', [], function () {
    return gulp.src(['./assets/partners/modules/**/*.html'])
        .pipe(htmlmin({
            collapseWhitespace: true,
            conservativeCollapse: true
        }))
        .pipe(templateCache('templates.js', {
            module: 'partners',
            root: '/'
        }))
        .pipe(gulp.dest('./sites/partners/js'))
        .pipe(livereload(server));
});

/**
 * Запуск bower install перед сборкой, что бы у всех всегда совпадали версии либ.
 */
gulp.task('bower', ['bower-prune'], function() {
    return bower();
});

gulp.task('bower-prune', function() {
    return bower({cmd: 'prune'});
});

gulp.task('kaskonomika', ['js-stream', 'less-stream', 'html-stream','js-partners','less-partners','html-partners']);
gulp.task('templates', ['templates-stream','templates-partners']);
gulp.task('html', ['html-stream','html-partners']);

gulp.task('build', ['kaskonomika']);

var taskWatch = function(){
    gulp.run('build');

    gulp.watch(['./assets/kaskonomika/**/*.html'], ['html-stream']);
    gulp.watch(['./assets/kaskonomika/**/*.less'],['less-stream']);
    gulp.watch(['./assets/kaskonomika/**/*.js'],['js-stream']);
    gulp.watch(['./assets/partners/**/*.html'],['html-partners']);
    gulp.watch(['./assets/partners/**/*.less'],['less-partners']);
    gulp.watch(['./assets/partners/**/*.js'],['js-partners']);
};

// Watch
gulp.task('watch', function() {
    server.listen(35729, function(err) {
        if (err) return console.log(err);
        taskWatch()
    });
    gulp.run('local-serverRu');
});

// configure proxy middleware options
var options = {
    target: 'http://api.kaskonomika.ru', // target host
    changeOrigin: true,               // needed for virtual hosted sites
    ws: true,                         // proxy websockets
    secure: false,                   //for https
    onProxyRes: function(proxyRes, req, res) {
        var cook = proxyRes.headers['set-cookie'];

        if(cook!=undefined ) {
            if (cook[0].indexOf('PLAY_SESSION')>-1) {
                proxyRes.headers['set-cookie'] = cook[0].replace('Domain=.kaskonomika.ru','Domain=.kaskonomika.local');
                console.log('cookie created successfully');
            }
        }
    }
};

var proxy = proxyMiddleware(['/api','/kaskonomika'], options);

var serverGen = function(proxy1, cb){
    var streamapp = express().use(express.static('./sites/kaskonomika')).get('/*', function(req, res, next){
        if ( req.path.indexOf('/src')>-1) return next();
        res.sendFile("index.html", {"root": __dirname + '/sites/kaskonomika'});
    });

    var partnersapp = express().use(express.static('./sites/partners')).get('/*', function(req, res, next){
        if ( req.path.indexOf('/src')>-1) return next();
        res.sendFile("index.html", {"root": __dirname + '/sites/partners'});
    });
    return function() {
        express()
            .use('/src', express.static('./sites/src'))
            .use(proxy1).on('upgrade', proxy1.upgrade)//
            .use(vhost('kaskonomika.local', streamapp))
            .use(vhost('partners.kaskonomika.local', partnersapp))
            .listen(9360);
        cb()
    }
};

// Local server
gulp.task('local-serverRu', serverGen(proxy, function(){}));

// Default
gulp.task('default', function() {
    gulp.run('watch');
});