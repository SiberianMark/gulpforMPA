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
/*
*author:JM
*time:2017-06-30
*version:1.0.3
*
*功能： 增加监控指定文件夹内文件css/img变化，
*       自动修改更新引用对应更新css/img的版本号
*       防止用户客户端缓存未及时更新造成bug
* 
 */

/*note：引用插件前请先安装
        npm install gulp gulp-asset-rev gulp-rev gulp-rev-collector --save-dev
        npm install gulp-if --save-dev
        npm install gulp-uglify gulp-minify-css gulp-minify-html --save-dev     //压缩相关
        npm install gulp-postcss gulp-autoprefixer gulp-precss --save-dev --css浏览器兼容性补全,从左到右，补全控制插件，浏览器私有前缀补全，css未来语法，像Sass的函数
*/

/*
*author:JM
*time:2017-06-30
*version:1.0.4
*
*功能： 
*      代码重构分成三个环境进行运行
*      测试环境，开发环境，生产环境
*      测试增加压缩处理--……注意文件输出流的顺序以及在gulpif内运行，先压缩后处理或先处理后压缩
*      测试增加css代码补全处理
* 
 */



//引入gulp和gulp插件:
var gulp = require('gulp'),
    assetRev = require('gulp-asset-rev'),
    runSequence = require('run-sequence'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    minifyHtml = require('gulp-minify-html');



var condition = true;

//测试版本
    //定义css、js源文件路径，可在这里修改监控js路径
    var jsSrcTest='./ddshop/**/*.js';
    var cssSrcTest='./ddshop/**/*.css';

    //定义font,img等资源的监控路径
    var fontSrcTest='./ddshop/**/fonts/*';
    var imgSrcTest=['./ddshop/img/*','./ddshop/assets/images/*'];
   
    //定义html文件
    var htmlSrcTest='./ddshop/**/*.html';

    //Fonts & Images 根据MD5获取版本号并生成 rev-manifest.json文件名对照映射
    gulp.task('revFont_TEST',function(){
        return gulp.src(fontSrcTest)
            .pipe(rev())
            .pipe(rev.manifest())
            .pipe(gulp.dest('./rev/test/fonts'));
    });
    gulp.task('revImg_TEST',function(){
        return gulp.src(imgSrcTest)
            .pipe(rev())
            .pipe(rev.manifest())
            .pipe(gulp.dest('./rev/test/img'))
    });
    //js生成文件hash编码并生成 rev-manifest.json文件名对照映射
    gulp.task('revJs_TEST', function(){
        console.log('revJs_TEST');
        return gulp.src(jsSrcTest)
            .pipe(gulpif(
                condition, uglify()
            ))
            .pipe(rev())
            .pipe(gulp.dest('./ddshop/test',{base:'.'}))
            .pipe(rev.manifest())
            .pipe(gulp.dest('./rev/test/js'));
    });
    gulp.task('revCss_TEST',function(){
        console.log('revCss_TEST');
        return gulp.src(cssSrcTest)
                   .pipe(gulpif(condition,minifyCss({compatibility:'ie7'})))
                   .pipe(rev())
                   .pipe(gulp.dest('./ddshop/test',{base:'.'}))
                   .pipe(rev.manifest())
                   .pipe(gulp.dest('./rev/test/css'));
    });
    //Html替换css、js文件版本--新建文件夹
     gulp.task('revHtml_TEST', function () {
         return gulp.src(['./rev/test/**/*.json', htmlSrcTest])
             .pipe(revCollector())
             .pipe(gulpif(
                    condition, minifyHtml({
                        empty: true,
                        spare: true,
                        quotes: true
                    })
                ))//压缩html
             .pipe(gulp.dest('./ddshop/test'),{base:'.'});
     });
   //更新CSS里引入文件版本号
     gulp.task('revColCSS_TEST', function () {
         return gulp.src(['./rev/test/**/*.json', cssSrcTest])            
             .pipe(revCollector())
             .pipe(gulp.dest('./ddshop/test'),{base:'.'});
     });

     //添加postCss
     
     //压缩css/js/html

     //测试开发构建
    gulp.task('test', function (done) {
        condition = false;
        runSequence(       //需要说明的是，用gulp.run也可以实现以上所有任务的执行，只是gulp.run是最大限度的并行执行这些任务，而在添加版本号时需要串行执行（顺序执行）这些任务，故使用了runSequence.
            ['revFont_TEST', 'revImg_TEST'],
            ['revCss_TEST'],
            ['revJs_TEST'],
            ['revColCSS_TEST'],
            ['revHtml_TEST'],
            done);
    });

// 开发版本
    //定义css、js源文件路径，可在这里修改监控js路径
    // var jsSrc = './assets/js/**/*.js'; //监控assets/js/下所有js
    var jsSrcDEV = './**/*.js'; //监控web下所有js变化
    var cssSrcDEV='./**/*.css';

    //定义font,img等资源的监控路径
    var fontSrcDEV='./**/fonts/*';
    var imgSrcDEV=['./**/*.png','./**/*.jpg','./**/*.jpeg','./**/*.gif','./**/*.svg','./**/*.TGA','./**/*.TIFF'];

    //定义html文件
    var htmlSrcDEV='./**/*.html';//修改web下所有html
    // var htmlSrc='./smdg/*.html';//修改smdg下所有html

    //Fonts & Images 根据MD5获取版本号并生成 rev-manifest.json文件名对照映射
    gulp.task('revFont_DEV',function(){
        return gulp.src(fontSrcDEV)
            .pipe(rev())
            .pipe(rev.manifest())
            .pipe(gulp.dest('./rev/dev/fonts'));
    });
    gulp.task('revImg_DEV',function(){
        return gulp.src(imgSrcDEV)
            .pipe(rev())
            .pipe(rev.manifest())
            .pipe(gulp.dest('./rev/dev/img'))
    });

    //js生成文件hash编码并生成 rev-manifest.json文件名对照映射
    gulp.task('revJs_DEV', function(){
        return gulp.src(jsSrcDEV)
            .pipe(rev())
            .pipe(rev.manifest())
            .pipe(gulp.dest('./rev/dev/js'));
    });
    gulp.task('revCss_DEV',function(){
        console.log('revCss_DEV');
        return gulp.src(cssSrcDEV)
                   .pipe(rev())
                   .pipe(rev.manifest())
                   .pipe(gulp.dest('./rev/dev/css'));
    });

    //Html替换css、js文件版本--替换
     gulp.task('revHtml_DEV', function () {
         return gulp.src(['./rev/dev/**/*.json', htmlSrcDEV])
             .pipe(revCollector())
             .pipe(gulp.dest('./ddshop/devhtml'),{base:'.'});
     });
     //更新CSS里引入文件版本号
     gulp.task('revColCSS_DEV', function () {
         return gulp.src(['./rev/dev/**/*.json', cssSrcDEV])
             .pipe(revCollector())
             .pipe(gulp.dest('./ddshop/devcss'),{base:'.'});
     });
    //开发构建
    gulp.task('dev', function (done) {
        condition = false;
        runSequence(       //需要说明的是，用gulp.run也可以实现以上所有任务的执行，只是gulp.run是最大限度的并行执行这些任务，而在添加版本号时需要串行执行（顺序执行）这些任务，故使用了runSequence.
            ['revFont_DEV', 'revImg_DEV'],
            ['revCss_DEV'],
            ['revJs_DEV'],
            ['revColCSS_DEV'],
            ['revHtml_DEV'],
            done);
    });

//生产版本
        //定义css、js源文件路径，可在这里修改监控js路径
    // var jsSrc = './assets/js/**/*.js'; //监控assets/js/下所有js
    var jsSrcProd = './**/*.js'; //监控web下所有js变化
    var cssSrcProd='./**/*.css';

    //定义font,img等资源的监控路径
    var fontSrcProd='./**/fonts/*';
    var imgSrcProd=['./**/*.png','./**/*.jpg','./**/*.jpeg','./**/*.gif','./**/*.svg','./**/*.TGA','./**/*.TIFF'];

    //定义html文件
    var htmlSrcProd='./**/*.html';//修改web下所有html
    // var htmlSrc='./smdg/*.html';//修改smdg下所有html
    

    //Fonts & Images 根据MD5获取版本号并生成 rev-manifest.json文件名对照映射
    gulp.task('revFont_PROD',function(){
        return gulp.src(fontSrcProd)
            .pipe(rev())
            .pipe(rev.manifest())
            .pipe(gulp.dest('./rev/prod/fonts'));
    });
    gulp.task('revImg_PROD',function(){
        return gulp.src(imgSrcProd)
            .pipe(rev())
            .pipe(rev.manifest())
            .pipe(gulp.dest('./rev/prod/img'))
    });
    gulp.task('revCss_PROD',function(){
        console.log('revCss');
        return gulp.src(cssSrcProd)
                   .pipe(rev())
                   .pipe(rev.manifest())
                   .pipe(gulp.dest('./rev/prod/css'));
    });
    //js生成文件hash编码并生成 rev-manifest.json文件名对照映射
    gulp.task('revJs_PROD', function(){
        return gulp.src(jsSrcProd)
            .pipe(rev())
            .pipe(rev.manifest())
            .pipe(gulp.dest('./rev/prod/js'));
    });

    //Html替换css、js文件版本--替换
     gulp.task('revHtml_PROD', function () {
         return gulp.src(['./rev/prod/**/*.json', htmlSrcProd])
             .pipe(revCollector())
             .pipe(gulp.dest('./'),{base:'.'});
     });

     //更新CSS里引入文件版本号
     gulp.task('revColCSS_PROD', function () {
         return gulp.src(['./rev/prod/**/*.json', cssSrcProd])
             .pipe(revCollector())
             .pipe(gulp.dest('./'),{base:'.'});
     });

    //开发构建
    gulp.task('default', function (done) {
        condition = false;
        runSequence(       //需要说明的是，用gulp.run也可以实现以上所有任务的执行，只是gulp.run是最大限度的并行执行这些任务，而在添加版本号时需要串行执行（顺序执行）这些任务，故使用了runSequence.
            ['revFont_PROD', 'revImg_PROD'],
            ['revCss_PROD'],
            ['revJs_PROD'],
            ['revColCSS_PROD'],
            ['revHtml_PROD'],
            done);
    });


//原理：监控某个js文件夹，如有更新变动，自动更新引用对应js的html上的js版本号

//缺点: 对于动态写入的js无法进行监控替换
