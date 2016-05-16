module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today(\'yyyy-mm-dd\') %>\n',
    meta: {
      version: '0.0.1',
    },
    dirs: {
      js_dist: 'js',
      js_src: '_js_src',
      img_dist: 'img',
      img_src: '_img_src',
      less: '_less',
      css: 'css',
      bower_components: '_bower_components',
      bs: {
        root: '<%= dirs.bower_components %>/bootstrap',
        js: '<%= dirs.bower_components %>/bootstrap/js',
        less: '<%= dirs.bower_components %>/bootstrap/less',
        fonts: '<%= dirs.bower_components %>/bootstrap/fonts',
        font: '<%= dirs.bower_components %>/bootstrap/fonts',
      },
      fa: '<%= dirs.bower_components %>/font-awesome',
      holderjs: '<%= dirs.bower_components %>/holderjs',
      html5shiv: '<%= dirs.bower_components %>/html5shiv/dist',
      jquery: '<%= dirs.bower_components %>/jquery',
      colorbox: '<%= dirs.bower_components %>/jquery-colorbox',
      respond: '<%= dirs.brower_components %>/respond',
    },

    // Config Tasks
    init: {
      options: {
        stripBanners: true,
      },
    },
    less: {
      bootstrap: {
        options: {
          stripBanners: true,
          compress: true,
          cleancss: true,
          sourceMap: false,
          yuicompress: true,
          paths: [
            '<%= dirs.bs.less %>',
            '<%= dirs.less %>',
          ],
        },
        files: {
          '<%= dirs.css %>/nvgay.min.css': '<%= dirs.less %>/nvgay-core.less',
        },
      },
      fonts: {
        options: {
          stripBanners: true,
          compress: true,
          cleancss: true,
          sourceMap: false,
          yuicompress: true,
          paths: [
            '<%= dirs.less %>',
          ],
        },
        files: {
          '<%= dirs.css %>/font-bignoodletitling.min.css': '<%= dirs.less %>/font-bignoodletitling.less',
        },
      },
      font_awesome: {
        options: {
          stripBanners: true,
          compress: true,
          cleancss: true,
          sourceMap: false,
          yuicompress: true,
          paths: [
            '<%= dirs.fa %>/less',
          ],
        },
        files: {
          '<%= dirs.css %>/font-awesome.min.css': '<%= dirs.less %>/font-awesome.less',
        },
      },
    },
    concat: {
      options: {
        stripBanners: true,
      },
      bootstrap: {
        src: [
          '<%= dirs.bs.root %>/js/transition.js',
          '<%= dirs.bs.root %>/js/alert.js',
          '<%= dirs.bs.root %>/js/button.js',
          '<%= dirs.bs.root %>/js/carousel.js',
          '<%= dirs.bs.root %>/js/collapse.js',
          '<%= dirs.bs.root %>/js/dropdown.js',
          '<%= dirs.bs.root %>/js/modal.js',
          '<%= dirs.bs.root %>/js/tooltip.js',
          '<%= dirs.bs.root %>/js/popover.js',
          '<%= dirs.bs.root %>/js/scrollspy.js',
          '<%= dirs.bs.root %>/js/tab.js',
          '<%= dirs.bs.root %>/js/affix.js',
        ],
        dest: '<%= dirs.js_dist %>/bootstrap.js',
        nonull: true,
      },

      custom: {
        src: [
          '<%= dirs.js_src %>/*.js',
        ],
        dest: '<%= dirs.js_dist %>/nvgay.js',
        nonull: true,
      },

    },
    copy: {
      options: {
        stripBanners: true,
      },
      bootstrap: {
        files: [
          {
            expand: true,
            src: '<%= dirs.bs.fonts %>/*.*',
            dest: 'font/',
            flatten: true,
            filter: 'isFile',
          },
        ],
      },
      jquery: {
        files: [
          {
            expand: true,
            src: '<%= dirs.jquery %>/jquery.*',
            dest: '<%= dirs.js_dist %>/',
            flatten: true,
            filter: 'isFile',
          },
        ],
      },
      colorbox: {
        files: [
          {
            src: '<%= dirs.colorbox %>/jquery.colorbox-min.js',
            dest: '<%= dirs.js_dist %>/jquery.colorbox-min.js',
          },
          {
            expand: true,
            src: '<%= dirs.colorbox %>/example3/images/*.{png,gif}',
            dest: '<%= dirs.img_src %>/',
            flatten: true,
            filter: 'isFile',
          },
        ],
      },
      html5shiv: {
        src: '<%= dirs.html5shiv %>/src/html5shiv.js',
        dest: '<%= dirs.js_dist %>/html5shiv.js',
      },
      respond: {
        src: '<%= dirs.respond %>/respond.min.js',
        dest: '<%= dirs.js_dist %>/respond.min.js',
      },
      font_awesome: {
        files: [
          {
            expand: true,
            src: '<%= dirs.fa %>/fonts/*',
            dest: 'font/',
            flatten: true,
            filter: 'isFile',
          },
          {
            expand: true,
            src: '<%= dirs.fa %>/css/*.min.css',
            flatten: true,
            dest: '<%= dirs.css %>',
            filter: 'isFile'
          },
        ],
      },
    },
    jshint: {
      options: {
        browser: true,
        globals: {
          jQuery: true,
        }
      },
      all: [
        '<%= dirs.js_src %>/*.js'
      ],
      gruntfile: [
        'gruntfile.js'
      ],
    },
    uglify: {
      options: {
        stripBanners: true,
      },
      bootstrap: {
        src: '<%= concat.bootstrap.dest %>',
        dest: '<%= dirs.js_dist %>/bootstrap.min.js',
        nonull: true,
      },
      holderjs: {
        src: '<%= dirs.holderjs %>/holder.js',
        dest: '<%= dirs.js_dist %>/holder.min.js',
        nonull: true,
      },
      custom: {
        src: '<%= concat.custom.dest %>',
        dest: '<%= dirs.js_dist %>/nvgay.min.js',
        nonull: true,
      }
    },

    imagemin: {
      dynamic: {
        options: {
          optimizationLevel: 3,
        },
        files: [{
          expand: true,
          cwd: '<%= dirs.img_src %>',
          src: ['**/*.{png,jpg,gif}'],
          dest: '<%= dirs.img_dist %>',
        }],
      },
    },

    svgmin: {
      options: {

      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= dirs.img_src %>',
          src: ['**/*.svg'],
          dest: '<%= dirs.img_dist %>',
          ext: '.min.svg',
        }],
      },
    },
    favicons: {
      options: {
        html: '_includes/head-icons.html',
        HTMLPrefix: '{{site.baseurl}}/img/icons/',
        precomposed: false,
        trueColor: true,
        appleTouchBackgroundColor: '#692161',
        coast: true,
        tileBlackWhite: false,
        tileColor: '#692161',
      },
      icons: {
        src: '<%= dirs.img_src %>/source.favicon.png',
        dest: '<%= dirs.img_dist %>/icons',
      },
    },

    watch: {
      options: {
        spawn: false,
      },
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: 'jshint:gruntfile',
      },
      js: {
        files: [
          '<%= dirs.js_src %>/*.js'
        ],
        tasks: [ 'jshint:all', 'concat:custom', 'uglify:custom' ],
      },
      less_bs: {
        files: [
          '<%= dirs.less %>/nvgay-*.less',
          '<%= dirs.less %>/bootstrap-*.less',
        ],
        tasks: [ 'less:bootstrap' ],
      },
      less_fonts: {
        files: '<%= dirs.less %>/font-*.less',
        tasks: [ 'less:fonts', 'less:font_awesome' ],
      },
      img: {
        options: {
          cwd: '<%= dirs.img_src %>',
        },
        files: ['**/*.{png,jpg,gif}'],
        tasks: [ 'imagemin:dynamic' ],
      },
      svg_process: {
        options: {
          cwd: '<%= dirs.img_src %>',
        },
        files: [ '**/*.svg' ],
        tasks: [ 'svgmin' ],
      },
    },
  });

  // Load the plugins for tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-favicons');

  // Inital Setup Task
  grunt.registerTask('init', [ 'init', 'build', 'favicons']);

  // SVG Alias
  grunt.registerTask('svg', ['svgmin']);

  // Build Task
  grunt.registerTask('build', ['copy', 'jshint', 'concat', 'svgmin', 'imagemin', 'less', 'uglify']);

  // favicons Alias
  grunt.registerTask('icon', ['favicons']);
  grunt.registerTask('icons', [ 'favicons']);

  // Default task(s).
  grunt.registerTask('default', ['build']);

};
