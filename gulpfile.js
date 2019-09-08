var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var globby = require('globby');
var sass = require('gulp-sass');
var base64 = require('gulp-base64');

gulp.task('node',function(){
  return new Promise((res, req)=>{
    nodemon({
      scripe:'./bin/www',
      ext: 'js html',
      env: {
        'NODE_ENV': 'development'
      }
    })
    res();
  })
})

gulp.task('watch', function() {
  return new Promise((res, req)=>{
    var files = ["/views/*.*", "/views/*", "public/stylesheet/*.","routes/*.*"];
    // gulp.watch(files).on("change", function(){});
    gulp.watch("./public/javascripts", gulp.series('build-js'));
    gulp.watch("./public/stylesheets", gulp.series('sass'));
    res();
  })
})

gulp.task('build-js', function(){
  return new Promise((res,req)=>{
    globby('./public/javascripts/*.js').then((files)=>{
      files.map((file)=>{
        let arr = file.split('/');
        let fileName = arr[arr.length-1];
        browserify({
          entries: file,
          transform: [[babelify, {presets: ["es2015"]}]]
        })
        .bundle()
        .pipe(source(fileName))
        .pipe(buffer())
        .pipe(gulp.dest('dist/javascripts'))
      })
    })
    res();
  })
})

gulp.task('sass', function(){
  return gulp.src('./public/stylesheets/*.scss')
    .pipe(sass())
    .pipe(base64({
      extensions:['svg','png'],
      maxImageSize:20*1024,
      debug:false
    }))
    .pipe(gulp.dest("dist/stylesheets"));
})
gulp.task('default', gulp.series('build-js','sass' ,'node', 'watch'));