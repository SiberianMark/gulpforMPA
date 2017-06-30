var gulp = require('gulp'),
	runSequence = require('run-sequence'),
	assetRev = require('gulp-asset-rev'),
	rev = require('gulp-rev'),
	revCollector = require('gulp-rev-collector');

var jsSrc = './assets/js/**/*.js';



//js生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revJs',function(){
	return gulp.src(jsSrc)
			   .pipe(rev())
			   .pipe(rev.manifest())
			   .pipe(gulp.dest('rev/js'));
});

//Html替换css、js文件版本
gulp.task('revHtml',function(){
	return gulp.src(['./rev/**/*.json','./smdg/*.html'])
			   .pipe(revCollector())
			   .pipe(gulp.dest('./'))
});


//开发构建
gulp.task('dev',function(done){
	codition=false;
	runSequence(
		['revJs'],
		['revHtml'],
		done);

});


gulp.task('default',['dev']);