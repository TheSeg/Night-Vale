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
      production: {
        options: {
          stripBanners: true,
          compress: true,
          cleancss: true,
          sourceMap: true,
          yuicompress: true,
          paths: [
            "<%= dirs.bs.less %>",
            "<%= dirs.less %>",
          ],
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
        dest:"<%= dirs.js_dist %>/nvgoy.js",
        nonull: true,
      }
    },
    copy: {
      options: {
        stripBanners:true,
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
        dest: '<%= dirs.js_dist %>/nvgoy.min.js',
        nonull: true,
      }
    },
  });
  
  // Load the plugins for tasks.
  grunt.loadNpmTasks('grunt-contrib');
  
  // Inital Setup Task
  grunt.registerTask( 'init', [ 'init' , 'build' ] );
  
  // Build Task
  grunt.registerTask( 'build' , [ 'concat' , 'copy' , 'less' , 'uglify' ] );

  // Default task(s).
  grunt.registerTask( 'default' , ['build'] );
  
};