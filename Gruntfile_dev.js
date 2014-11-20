'use strict';

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var pathConfig = {
        app : 'app',
        dist : 'dist',
        tmp : '.tmp',
        test : 'test'
    };

    grunt.initConfig({
        paths : pathConfig,
        watch : {
            test : {
                files : [
                    '**/*.js',
                    '!node_modules/**/*.*',
                ],
                tasks : ['jshint:test', 'mochaTest'],
                options : {
                    spawn : false
                }
            }
        },
        open: {
            server : {
                path : 'http://127.0.0.1:8889/debug?port=5859',
                app : 'Google Chrome Canary'
            }
        },
        clean : {
            dist : ['<%= paths.tmp %>', '<%= paths.dist %>'],
            server : '<%= paths.tmp %>'
        },
        bump : {
            options : {
                files : ['package.json', 'bower.json'],
                updateConfigs : [],
                commit : true,
                commitMessage : 'Release v%VERSION%',
                commitFiles : ['-a'],
                createTag : true,
                tagName : 'v%VERSION%',
                tagMessage : 'Version %VERSION%',
                push : false
            }
        },
        nodemon : {
            dev : {
                script : 'app.js',
                options : {
                    nodeArgs : ['--debug=5859'],
                    env : {
                        PORT : '1337'
                    }
                }
            }
        },
        concurrent : {
            server : {
                tasks : ['nodemon:dev', 'node-inspector', 'watch', 'open'],
                options : {
                    logConcurrentOutput: true
                }
            }
        },
        'node-inspector' : {
            custom : {
                options : {
                    'web-port' : 8889,
                    'web-host' : 'localhost',
                    'debug-port' : 5859,
                    'save-live-edit' : true,
                    'stack-trace-limit' : 4
                }
            }
        },
        jshint : {
            options : {
                jshintrc : '.jshintrc',
                ignores : ['**/node_modules/**/*.js']
            },
            test : ['**/*.js']
        },
        copy : {
            production : {
                files : [{
                    expand : true,
                    dest : '<%= paths.dist %>',
                    src : [
                        '**/*',
                        '!.git/*',
                        '!.editorconfig',
                        '!.git*',
                        '!.travis.yml',
                        '!.jshintrc',
                        '!Gruntfile.js',
                        '!*.sublime*'
                    ]
                }]
            }
        }
    });

    grunt.registerTask('serve', [
        'concurrent:server'
    ]);

    grunt.registerTask('serve:test', [
        'watch'
    ]);

    grunt.registerTask('test:travis', [
        'jshint:test',
        'mochaTest:test'
    ]);

    grunt.registerTask(['update'], [
        'bump-only:patch',
        'changelog',
        'bump-commit'
    ]);

    grunt.registerTask(['update:minor'], [
        'bump-only:minor',
        'changelog',
        'bump-commit'
    ]);

    grunt.registerTask(['update:major'], [
        'bump-only:major',
        'changelog',
        'bump-commit'
    ]);

    grunt.registerTask('build:production', [
        'clean:dist',
        'copy:production'
    ]);

    grunt.registerTask('build:staging', [
        'clean:dist',
        'copy:production'
    ]);

    grunt.registerTask('default', []);
};
