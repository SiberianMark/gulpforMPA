/*
*author:JM
*time:2017-06-03
*version:1.0.2
*
*功能： 监控指定文件夹内文件js变化，
*       自动修改更新引用对应更新js的版本号
*       防止用户客户端旧版js残留造成bug
* 
 */

/*note：引用插件前请先安装
        npm install gulp gulp-asset-rev gulp-rev gulp-rev-collector --save-dev
*/

//引入gulp和gulp插件:
var gulp = require('gulp'),
    assetRev = require('gulp-asset-rev'),
    runSequence = require('run-sequence'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector');

//定义css、js源文件路径，可在这里修改监控js路径

var jsSrc = './**/*.js'; //监控web下所有js变化
// var jsSrc = './assets/js/**/*.js'; //监控assets/js/下所有js



//定义ht l文件

var htmlSrc='./**/*.html';//修改web下所有html
// var htmlSrc='./smdg/*.html';//修改smdg下所有html




//js生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revJs', function(){
    return gulp.src(jsSrc)
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest('./rev/js'));
});

//js生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revJs_TEST', function(){
    return gulp.src(jsSrc)
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest('./rev/test/js'));
});


//Html替换css、js文件版本--替换
 gulp.task('revHtml', function () {
     return gulp.src(['./rev/js/*.json', htmlSrc])
         .pipe(revCollector())
         .pipe(gulp.dest('./'),{base:'.'});
 });


//Html替换css、js文件版本--新建文件夹
 gulp.task('revHtml_TEST', function () {
     return gulp.src(['./rev/test/js/*.json', htmlSrc])
         .pipe(revCollector())
         .pipe(gulp.dest('./newhtml'),{base:'.'});
 });

//开发构建
gulp.task('default', function (done) {
    condition = false;
    runSequence(       //需要说明的是，用gulp.run也可以实现以上所有任务的执行，只是gulp.run是最大限度的并行执行这些任务，而在添加版本号时需要串行执行（顺序执行）这些任务，故使用了runSequence.
        ['revJs'],
        ['revHtml'],
        done);
});



//测试开发构建
gulp.task('test', function (done) {
    condition = false;
    runSequence(       //需要说明的是，用gulp.run也可以实现以上所有任务的执行，只是gulp.run是最大限度的并行执行这些任务，而在添加版本号时需要串行执行（顺序执行）这些任务，故使用了runSequence.
        ['revJs_TEST'],
        ['revHtml_TEST'],
        done);
});

//原理：监控某个js文件夹，如有更新变动，自动更新引用对应js的html上的js版本号

//缺点: 对于动态写入的js无法进行监控替换
