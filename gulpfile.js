var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var concat      = require('gulp-concat');
var rename      = require('gulp-rename');

var reload      = browserSync.reload;


/** ======== PATHS ======== **/

var src = {
      scss: './src/scss/**',
      js:   './src/js/*.js',
      jade: './src/*.html'
};
var dest = {
      css:  './build/css',
      js:   './build/js',
      html: './build'
}; 

/** ======== PLAYGROUND ======== **/

// Browsersync server
gulp.task('serve', ['sass', 'scripts', 'html-watch'], function() {
    browserSync({
        server: {baseDir: 'build'},
        notify: false 
    });
});

// Sass from src folder to build folder
gulp.task('sass', function () {
  return gulp
    .src(src.scss)
    .pipe(sass())
    .pipe(prefix(['last 2 versions', '> 1%', 'ie >= 10'], { cascade: true }))
    .pipe(gulp.dest(dest.css))
    .pipe(browserSync.reload({stream:true}))
});

// Concat JS files from src folder to build folder
gulp.task('scripts', function(){
  return gulp
    .src(['./src/js/jquery-3.2.0.min.js', './src/js/functions.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest(dest.js))
});

// html
gulp.task('html', function() {
  return gulp
  .src(src.jade)
  .pipe(rename("index.html"))
  .pipe(gulp.dest(dest.html));
});

// para o browserSync.reload funcionar no html
gulp.task('html-watch', ['html'], reload);

/* ====== WATCH & SERVE ====== */

// Watch sass, jade files for changes & recompile
gulp.task('watch', function() {
  gulp.watch(src.scss, ['sass']);
  gulp.watch(src.js, ['scripts']);
  gulp.watch(src.jade, ['html-watch']);
});

// Gulp default task
gulp.task('default', ['serve', 'watch']);