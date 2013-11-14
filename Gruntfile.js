module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %>\n',
    meta: {
      version: '0.0.1'
    },
    dirs: {
      js_dist: "js",
      js_src: "_js_src",
      img_dist: "img",
      img_src: "_img_src",
      less: "_less",
      css: "css",
      bower_components: "_bower_components",
      bs: {
        root: "<%= dirs.bower_components %>/bootstrap",
        js: "<%= dirs.bower_components %>/bootstrap/js",
        less: "<%= dirs.bower_components %>/bootstrap/less",
      },
      fa: "<%= dirs.bower_components %>/font-awesome",
      holderjs: "<%= dirs.bower_components %>/holderjs",
      html5shiv: "<%= dirs.bower_components %>/html5shiv/dist",
      jquery: "<%= dirs.bower_components %>/jquery",
      respond: "<%= dirs.brower_components %>/respond",
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
            "<%= dirs.bs.less %>",
            "<%= dirs.less %>",
          ],
        },
        files: {
          "<%= dirs.css %>/nvgay.min.css": "<%= dirs.less %>/nvgay-core.less",
        },
      },
      logo: {
        options: {
          stripBanners: true,
          compress: true,
          cleancss: true,
          sourceMap: false,
          yuicompress: true,
          paths: [
            "<%= dirs.less %>",
          ],
        },
        files: {
          "<%= dirs.css %>/nvgay-logo.min.css": "<%= dirs.less %>/nvgay-logo.less",
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
            "<%= dirs.less %>",
          ],
        },
        files: {
          "<%= dirs.css %>/font-bignoodletitling.min.css": "<%= dirs.less %>/font-bignoodletitling.less",
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
          '<%= dirs.bs.root %>/js/affix.js'
        ],
        dest:"<%= dirs.js_dist %>/bootstrap.js",
        nonull: true,
      },
      custom: {
        src: [
          '<%= dirs.js_src %>/*.js',
        ],
        dest:"<%= dirs.js_dist %>/nvgay.js",
        nonull: true,
      }
    },
    copy: {
      options: {
        stripBanners:true,
      },
      jquery: {
        files: [
          {
            expand: true,
            src: "<%= dirs.jquery %>/jquery.*",
            dest: "<%= dirs.js_dist %>/",
            flatten: true,
            filter: 'isFile',
          },
        ],
      },
      html5shiv: {
        src: "<%= dirs.html5shiv %>/src/html5shiv.js",
        dest: "<%= dirs.js_dist %>/html5shiv.js",
      },
      respond: {
        src:"<%= dirs.respond %>/respond.min.js",
        dest: "<%= dirs.js_dist %>/respond.min.js",
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
          optimizationLevel:3,
        },
        files: [{
          expand:true,
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
    watch: {
      js: {
        files: [
          "<%= dirs.js_src %>/*.js"
        ],
        tasks: [ "concat:custom", "uglify:custom" ],
      },
      less_bs: {
        files: [
          "<%= dirs.less %>/nvgay-core.less",
          "<%= dirs.less %>/nvgay-variables.less",
          "<%= dirs.less %>/bootstrap-core.less",
        ],
        tasks: [ "less:bootstrap" ],
      },
      less_logo: {
        files: "<%= dirs.less %>/nvgay-logo.less",
        tasks: [ "less:logo" ],
      },
      less_fonts: {
        files: "<%= dirs.less %>/font-*.less",
        tasks: [ "less:fonts" ],
      },
      img: {
        files: ["<%= dirs.img_src %>**/*.{png,jpg,gif}"],
        tasks: [ "imagemin:dynamic" ],
      },
      svg: {
        files: [ "<%= dirs.img_src %>**/*.svg" ],
        tasks: [ "svgmin:dist" ],
      },
    },
    jekyll: {
      options: {
        safe:true,
        bundleExec:true,
      },
      server: {
        serve: true,
        auto: true,
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
  grunt.loadNpmTasks('grunt-jekyll');
  
  // Inital Setup Task
  grunt.registerTask( 'init', [ 'init' , 'build' ] );
  
  // Build Task
  grunt.registerTask( 'build' , [ 'copy' , 'concat' , 'svgmin' , 'less' , 'uglify' ] );

  // Default task(s).
  grunt.registerTask( 'default' , ['build'] );
  
};