var appFiles = [
    'app/directives/*.js',
    'app/helpers/*.js',
    'app/auth/auth.module.js',
    'app/auth/auth.config.js',
    'app/auth/*.factory.js',
    'app/auth/*.component.js',
    'app/dashboard/dashboard.module.js',
    'app/dashboard/dashboard.config.js',
    'app/dashboard/*.factory.js',
    'app/dashboard/*.component.js',
    'app/dashboard/build/trees/*.js',
    'app/dashboard/build/*.js',
    'app/dashboard/broadcast/*.js',
    'app/dashboard/sequence/*.js',
    'app/dashboard/widgets/*.js',
    'app/dashboard/subscriber/*.js',
    'app/dashboard/partials/*.js',
    'app/dashboard/message-blocks/*.js',
    'app/app.js',
    'app/app.config.js',
    'app/app.controller.js'
];


module.exports = function (grunt) {

    grunt.initConfig({
        concat: {
            chrome: {
                src: ['css/windows.chrome.fix.css'],
                dest: 'public/css/windows.chrome.fix.css',
                nonull: true
            },
            ie9: {
                src: ['css/ie9.css'],
                dest: 'public/css/ie9.css',
                nonull: true
            },
            css: {
                src: [
                    'plugins/bootstrapv3/css/bootstrap.min.css',
                    'plugins/font-awesome/css/font-awesome.min.css',

                    // dashboard
                    'plugins/pace/pace-theme-flash.css',
                    'plugins/jquery-scrollbar/jquery.scrollbar.css',
                    'plugins/angular-wizard/angular-wizard.css',
                    'plugins/nvd3/nv.d3.min.css',
                    'plugins/switchery/css/switchery.min.css',
                    'plugins/angular-bootstrap-nav-tree/abn_tree.css',
                    'plugins/jquery-nestable/jquery.nestable.css',
                    'plugins/bootstrap-select2/select2.css',
                    'plugins/angular-ui-select/select.min.css',
                    'plugins/bootstrap-datepicker/css/datepicker3.css',
                    'plugins/bootstrap-timepicker/bootstrap-timepicker.min.css',
                    'plugins/ng-table/ng-table.min.css',
                    'css/pages.css',
                    'css/custom.css',
                    'plugins/angular-ui-tree/angular-ui-tree.min.css',

                    'plugins/angular-animate/animate.min.css',
                    'plugins/angular-toaster/toastr.min.css'

                ],
                dest: 'public/css/app.css',
                nonull: true
            },
            js: {
                src: [
                    'plugins/jquery/jquery-1.11.1.min.js',

                    // dashboard
                    'plugins/pace/pace.min.js',
                    'plugins/modernizr.custom.js',
                    'plugins/bootstrapv3/js/bootstrap.min.js',
                    'plugins/jquery/jquery-easy.js',
                    'plugins/jquery-unveil/jquery.unveil.min.js',
                    'plugins/jquery-bez/jquery.bez.min.js',
                    'plugins/jquery-actual/jquery.actual.min.js',
                    'plugins/jquery-scrollbar/jquery.scrollbar.min.js',
                    'plugins/classie/classie.js',
                    'plugins/angular/angular.js',
                    'plugins/angular-ui-router/angular-ui-router.min.js',
                    'plugins/angular-ui-util/ui-utils.min.js',
                    'plugins/angular-sanitize/angular-sanitize.min.js',
                    'plugins/angular-flash/angular-flash.min.js',
                    'plugins/lodash/lodash.min.js',
                    'plugins/angular-wizard/angular-wizard.min.js',
                    'plugins/ng-file-upload/ng-file-upload-all.min.js',
                    'plugins/angular-jwt/angular-jwt.min.js',
                    'plugins/ng-storage/ng-storage.min.js',
                    'js/pages.js',


                    // nvd3
                    'plugins/nvd3/lib/d3.v3.js',
                    'plugins/nvd3/nv.d3.min.js',
                    'plugins/angular-nvd3/angular-nvd3.js',

                    // switchery
                    'plugins/switchery/js/switchery.min.js',
                    'plugins/ng-switchery/ng-switchery.js',

                    // moment
                    'plugins/moment/moment.min.js',
                    'plugins/moment/moment-with-locales.min.js',
                    'plugins/moment/moment-timezone-with-data.min.js',

                    // navTree
                    'plugins/angular-bootstrap-nav-tree/abn_tree_directive.js',

                    // Nestable
                    'plugins/jquery-nestable/jquery.nestable.js',
                    'plugins/angular-nestable/angular-nestable.js',

                    // angular-relative-date
                    'plugins/angular-relative-date/angular-relative-date.min.js',

                    // select
                    'plugins/angular-ui-select/select.min.js',

                    // date picker
                    'plugins/bootstrap-datepicker/js/bootstrap-datepicker.js',

                    // time picker
                    'plugins/bootstrap-timepicker/bootstrap-timepicker.js',

                    // input mask
                    'plugins/jquery-inputmask/jquery.inputmask.min.js',

                    // auto numeric
                    'plugins/jquery-autonumeric/autoNumeric.js',

                    // ng-table
                    'plugins/ng-table/ng-table.min.js',

                    // Restangular
                    'plugins/restangular/restangular.min.js',

                    // ngFacebook
                    'plugins/ng-facebook/ng-facebook.js',

                    // angular ui-tree
                    'plugins/angular-ui-tree/angular-ui-tree.min.js',

                    'plugins/angular-animate/animate.min.js',
                    'plugins/angular-toaster/toastr.min.js'

                ].concat(appFiles),

                dest: 'public/js/app.js',
                nonull: true
            },
            env: {
                src: ['.env.js'],
                dest: 'public/js/env.js'
            }
        },
        watch: {
            scripts: {
                files: appFiles.concat(['.env.js']),
                tasks: ['concat']
            }
        },
        connect: {
            server: {
                options: {
                    port: 9000,
                    hostname: '0.0.0.0',
                    base: 'public',
                    keepalive: true,
                    middleware: function (connect, options, middlewares) {
                        var modRewrite = require('connect-modrewrite');
                        // enable Angular's HTML5 mode
                        middlewares.unshift(modRewrite(['!\\.html|\\.js|\\.svg|\\.css|\\.woff2|\\.tff|\\.jpg|\\.png$ /index.html [L]']));

                        return middlewares;
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.registerTask('default', ['concat']);
};