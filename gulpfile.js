var gulp = require('gulp');
var browserSync= require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');
var babel = require('gulp-babel');
// var connect = require('gulp-connect');
var sass = require('gulp-sass');

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
    gulp.watch(files).on("change", gulp.series('reload'));
    gulp.watch("./public/javascripts", gulp.series('babel-js', 'reload'));
    gulp.watch("./public/stylesheets", gulp.series('sass', 'reload'));
    res();
  })
})

gulp.task('babel-js', function() {
  return gulp.src(['./public/javascripts/*.js'])
    .pipe(babel())
    .pipe(gulp.dest("dist/javascripts"));
})

gulp.task('sass', function(){
  return gulp.src('./public/stylesheets/*.scss')
    .pipe(sass())
    .pipe(gulp.dest("dist/stylesheets"));
})

gulp.task('reload', function(){
  // return new Promise((res,req)=>{
  //   gulp.src('')
  // })
  return reload;
})

gulp.task('default', gulp.series('babel-js','sass' ,'node', 'watch'));