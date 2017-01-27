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
var expect = require('gulp-expect-file');

// Angular files
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
    return browserify('./src/app/app.module.js')
        .transform(babelify, {presets: ["es2015"]})
        .transform(ngAnnotate)
        .bundle()
        .on('error', interceptErrors)
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('app/app.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./build/'));
});

// SPA file
gulp.task('html', function () {
    var htmlFile = "src/index.html";
    return gulp.src(htmlFile)
        .on('error', interceptErrors)
        .pipe(expect(htmlFile))
        .pipe(gulp.dest('./build/'));
});

// Bundle Stylesheets
gulp.task('css', function () {
    // IE fix file, not always included.
    // Needs to be separate.
    var IEFile = 'src/css/ie9.css';
    gulp.src(IEFile)
        .on('error', interceptErrors)
        .pipe(expect(IEFile))
        .pipe(gulp.dest('./build/css/'));

    // Chrome fix for windows 8
    // Not always included, needs to be separate.
    var chromeFile = 'src/css/windows.chrome.fix.css';
    gulp.src(chromeFile)
        .on('error', interceptErrors)
        .pipe(expect(chromeFile))
        .pipe(gulp.dest('./build/css/'));

    // Source CSS file, bundle in 1 file.
    var cssFiles = [
        // Bootstrap & Font awesome
        'bower_components/bootstrap/dist/css/bootstrap.min.css',
        'bower_components/font-awesome/css/font-awesome.min.css',

        // dashboard styles
        // 'plugins/pace/pace-theme-flash.css',
        // 'plugins/jquery-scrollbar/jquery.scrollbar.css',
        // 'plugins/angular-wizard/angular-wizard.css',
        // 'plugins/nvd3/nv.d3.min.css',
        // 'plugins/switchery/css/switchery.min.css',
        // 'plugins/angular-bootstrap-nav-tree/abn_tree.css',
        // 'plugins/jquery-nestable/jquery.nestable.css',
        // 'plugins/bootstrap-select2/select2.css',
        // 'plugins/angular-ui-select/select.min.css',
        // 'plugins/bootstrap-datepicker/css/datepicker3.css',
        // 'plugins/bootstrap-timepicker/bootstrap-timepicker.min.css',
        // 'plugins/ng-table/ng-table.min.css',
        // 'plugins/angular-ui-tree/angular-ui-tree.min.css',
        // 'plugins/angular-animate/animate.min.css',
        'node_modules/angularjs-toaster/toaster.min.css',

        // Custom styles.
        'src/css/pages.css',
        'src/css/custom.css'
    ];

    gulp.src(cssFiles)
        .on('error', interceptErrors)
        .pipe(expect(cssFiles))
        .pipe(concat('stylesheets.css'))
        .pipe(gulp.dest('./build/css/'));

});

// Bundle scripts
gulp.task('js', function () {
    // Source JS file, bundle in 1 file.
    var jsFiles = [
        'bower_components/jquery/dist/jquery.min.js',

        // dashboard
        // 'plugins/pace/pace.min.js',
        // 'plugins/modernizr.custom.js',
        // 'plugins/bootstrapv3/js/bootstrap.min.js',
        // 'plugins/jquery/jquery-easy.js',
        // 'plugins/jquery-unveil/jquery.unveil.min.js',
        // 'plugins/jquery-bez/jquery.bez.min.js',
        // 'plugins/jquery-actual/jquery.actual.min.js',
        // 'plugins/jquery-scrollbar/jquery.scrollbar.min.js',
        // 'plugins/classie/classie.js',
        // 'plugins/angular/angular.js',
        // 'plugins/angular-ui-router/angular-ui-router.min.js',
        // 'plugins/angular-ui-util/ui-utils.min.js',
        // 'plugins/angular-sanitize/angular-sanitize.min.js',
        // 'plugins/angular-flash/angular-flash.min.js',
        // 'plugins/lodash/lodash.min.js',
        // 'plugins/angular-wizard/angular-wizard.min.js',
        // 'plugins/ng-file-upload/ng-file-upload-all.min.js',
        // 'plugins/angular-jwt/angular-jwt.min.js',
        // 'plugins/ng-storage/ng-storage.min.js',

        // nvd3
        // 'plugins/nvd3/lib/d3.v3.js',
        // 'plugins/nvd3/nv.d3.min.js',
        // 'plugins/angular-nvd3/angular-nvd3.js',

        // switchery
        // 'plugins/switchery/js/switchery.min.js',
        // 'plugins/ng-switchery/ng-switchery.js',

        // moment
        // 'plugins/moment/moment.min.js',
        // 'plugins/moment/moment-with-locales.min.js',
        // 'plugins/moment/moment-timezone-with-data.min.js',

        // navTree
        // 'plugins/angular-bootstrap-nav-tree/abn_tree_directive.js',

        // Nestable
        // 'plugins/jquery-nestable/jquery.nestable.js',
        // 'plugins/angular-nestable/angular-nestable.js',

        // angular-relative-date
        // 'plugins/angular-relative-date/angular-relative-date.min.js',

        // select
        // 'plugins/angular-ui-select/select.min.js',

        // date picker
        // 'plugins/bootstrap-datepicker/js/bootstrap-datepicker.js',

        // time picker
        // 'plugins/bootstrap-timepicker/bootstrap-timepicker.js',

        // input mask
        // 'plugins/jquery-inputmask/jquery.inputmask.min.js',

        // auto numeric
        // 'plugins/jquery-autonumeric/autoNumeric.js',

        // ng-table
        // 'plugins/ng-table/ng-table.min.js',

        // angular ui-tree
        // 'plugins/angular-ui-tree/angular-ui-tree.min.js',

        // 'plugins/angular-animate/animate.min.js',

        // Custom scripts.
        'src/js/pages.js'
    ];

    gulp.src(jsFiles)
        .on('error', interceptErrors)
        .pipe(expect(jsFiles))
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./build/js/'));

});

gulp.task('fonts', function () {
    var fontFiles = [
        'bower_components/bootstrap/dist/fonts/*.*',
        'bower_components/font-awesome/fonts/*.*'
    ];
    
    gulp.src(fontFiles)
        .on('error', interceptErrors)
        .pipe(expect(fontFiles))
        .pipe(gulp.dest('./build/fonts/'));
});

gulp.task('img', function () {
    var imageFiles = "src/img/**/*.{jpg,gif,png,bmp,svg}";
    gulp.src(imageFiles)
        .on('error', interceptErrors)
        .pipe(expect(imageFiles))
        .pipe(gulp.dest('./build/img/'));
});

gulp.task('.htaccess', function () {
    gulp.src('src/.htaccess')
        .on('error', interceptErrors)
        .pipe(gulp.dest('./build/'));
});

gulp.task('assets', ['clean:assets'], function() {
    gulp.start('css', 'js', 'fonts', 'img');
});

gulp.task('clean:assets', function () {
    return del([
        './build/js',
        './build/css',
        './build/fonts',
        './build/img'
    ]);
});

gulp.task('views', function () {
    return gulp.src(viewFiles)
        .pipe(templateCache({
            standalone: true
        }))
        .on('error', interceptErrors)
        .pipe(rename("app.templates.js"))
        .pipe(gulp.dest('./src/app/'));
});

gulp.task('clean:dist', function () {
    return del('./dist');
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


    var appFiles = "src/app/**/*.js";

    gulp.watch("src/index.html", ['html']);
    gulp.watch(viewFiles, ['views']);
    gulp.watch(appFiles, ['browserify']);
    gulp.watch(['src/css/custom.css', 'src/.htaccess'], ['copy']);
});
