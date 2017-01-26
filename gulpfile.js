var gulp = require('gulp');
var notify = require('gulp-notify');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');
var ngAnnotate = require('browserify-ngannotate');
var browserSync = require('browser-sync').create();
var rename = require('gulp-rename');
var templateCache = require('gulp-angular-templatecache');
var uglify = require('gulp-uglify');
var merge = require('merge-stream');
var cleanCSS = require('gulp-clean-css');
var modRewrite = require('connect-modrewrite');
var concat = require('gulp-concat');
var del = require('del');

// Where our files are located
var jsFiles = "src/js/**/*.js";
var fontFiles = "src/fonts/**/*.{otf,eot,svg,ttf,woff,woff2}";
var imageFiles = "src/img/**/*.{jpg,gif,png,bmp,svg}";

// Angular files
var appFiles = "src/app/**/*.js";
var viewFiles = "src/app/**/*.html";

var interceptErrors = function (error) {
    var args = Array.prototype.slice.call(arguments);

    // Send error to notification center with gulp-notify
    notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>'
    }).apply(this, args);

    // Keep gulp from hanging on this task
    this.emit('end');
};


gulp.task('browserify', ['views'], function () {
    return browserify('./src/app/app.js')
        .transform(babelify, {presets: ["es2015"]})
        .transform(ngAnnotate)
        .bundle()
        .on('error', interceptErrors)
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('app/app.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./build/'));
});

gulp.task('html', function () {
    return gulp.src("src/index.html")
        .on('error', interceptErrors)
        .pipe(gulp.dest('./build/'));
});

gulp.task('views', function () {
    return gulp.src(viewFiles)
        .pipe(templateCache({
            standalone: true
        }))
        .on('error', interceptErrors)
        .pipe(rename("app.templates.js"))
        .pipe(gulp.dest('./src/js/config/'));
});


gulp.task('clean:assets', function () {
    return del([
        './build/js',
        './build/css',
        './build/fonts',
        './build/img'
    ]);
});

gulp.task('clean:dist', function () {
    return del('./dist');
});

gulp.task('copy', ['clean:assets'], function () {
    gulp.src(jsFiles)
        .pipe(gulp.dest('./build/js/'));

    gulp.src('src/css/custom.css')
        .pipe(gulp.dest('./build/css/'));

    gulp.src('src/css/ie9.css')
        .pipe(gulp.dest('./build/css/'));

    gulp.src(['src/css/pages.css', 'src/css/custom.css'])
        .pipe(concat('app.css'))
        .pipe(gulp.dest('./build/css/'));

    gulp.src(fontFiles)
        .pipe(gulp.dest('./build/fonts/'));

    gulp.src(imageFiles)
        .pipe(gulp.dest('./build/img/'));
});


// This task is used for building production ready
// minified JS/CSS files into the dist/ folder
gulp.task('build', ['clean:dist', 'html', 'browserify'], function () {
    var html = gulp.src("build/index.html")
        .pipe(gulp.dest('./dist/'));

    var app = gulp.src("build/app/app.js")
        .pipe(uglify())
        .pipe(gulp.dest('./dist/app/'));

    var css = gulp.src("build/css/**/*.css")
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./dist/css/'));

    var js = gulp.src("build/js/**/*.js")
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'));

    var img = gulp.src("build/img/**/*.{jpg,gif,png,bmp,svg}")
        .pipe(gulp.dest('./dist/img/'));

    var fonts = gulp.src("build/fonts/**/*.{otf,eot,svg,ttf,woff,woff2}")
        .pipe(gulp.dest('./dist/fonts/'));

    return merge(html, js, css, js, img, fonts);
});

gulp.task('default', ['html', 'browserify'], function () {

    browserSync.init(['./build/**/**.**'], {
        server: {
            baseDir: "./build",
            middleware: [
                modRewrite([
                    '!\\.html|\\.js|\\.svg|\\.css|\\.woff2|\\.tff|\\.jpg|\\.png$ /index.html [L]'
                ])
            ]
        },
        port: 4000,
        notify: false,
        ui: {
            port: 4001
        }
    });

    gulp.watch("src/index.html", ['html']);
    gulp.watch(viewFiles, ['views']);
    gulp.watch(appFiles, ['browserify']);
    gulp.watch('src/css/custom.css', ['copy']);
});
