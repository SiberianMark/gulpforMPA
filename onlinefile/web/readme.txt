### 此gulp任务是完成对指定目录的js进行change监控，同步更新引用对应js的版本号,以达到在部署阶段防止浏览器缓存的目的

### 缺点：无法对动态插入到html的js文件进行监控，只能监控静态部署的文件


### 部署步骤：
	#### 运行环境搭建
	1. 确保服务器安装nodejs 平台
	2. 确保服务器全局安装gulp  ---在控制台下运行 npm install gulp -g
	3. 确保服务器全局安装gulp  ---跳转到web目录下，在控制台运行 npm install gulp --save-dev
	4. 上传文件package.json以及gulpfile.js到线上
	5. 执行npm install 命令安装依赖插件
	6. 确保修改默认配置----http://www.w2bc.com/article/227949

	#### 程序运行搭建
	7. 控制台执行gulp test 测试程序是否正确部署以及产生正确结果
	8. 控制台执行gulp default 命令执行正式监控

###注意事项：
	
	因部署程序步骤多，为防止线上出现问题，建议先备份web目录下所有文件
