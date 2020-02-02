// 01 打包 HTML
const Gulp = require("gulp");
const FileInclude = require("gulp-file-include");
const Config = require("./config.js");
//
const babel = require('gulp-babel');

const Dist = "build/";
Gulp.task("copy-html", () => {
  return Gulp.src("src/*.html")
    .pipe(
      FileInclude({
        // HTML模板替换，具体用法见下文
        prefix: "##",
        basepath: "@file"
      })
    )
    .on("error", function(err) {
      console.error("Task:copy-html,", err.message);
      this.end();
      // 拷贝
    })
    .pipe(Gulp.dest(Dist));
});

// 02 打包 JS文件
const Uglify = require("gulp-uglify");
Gulp.task("copy-js", () => {
  Gulp.src("src/js/**")
    // es5 检查
    .pipe(babel({
      presets: ['es2015']
    }))
    // 压缩js
    .pipe(Uglify())
    .on('error', function(err) {
      // 输出详细错误日志
      gutil.log(gutil.colors.red('[Error]'), err.toString());
  })
    // 拷贝
    .pipe(Gulp.dest(Dist + "/js"));
});

// 05 开启本地 HTTP 服务器 -> 监听 build 目录变化实现浏览器自动刷新
const WebServer = require("gulp-webserver");
Gulp.task("web-server", () => {
  // 监听build目录
  Gulp.src(Dist).pipe(
    WebServer({
      // 端口
      port: Config.PORT,
      // 地址
      host: Config.HOST,
      // 配置热刷新
      livereload: true,
      // 配置启动成功自动打开指定页面
      open: Config.Open
    })
  );
});

// 06 自动构建监听文件变化 gulp watch
const Watch = require("gulp-watch");
Gulp.task("watch", () => {
  // 监听HTML变化
  Gulp.watch("src/**/**.html", ["copy-html"]);
  // 监听js变化
  Gulp.watch("src/js/**", ["copy-js"]);
});

// 07 自动清理
const Clean = require("gulp-clean");
Gulp.task("clean", () => {
  return Gulp.src(Dist).pipe(Clean());
});

// 配置任务
Gulp.task("copy-sources", [
  "copy-js",
  "copy-html",
]);

// RunSequence是用来设置任务串行执行, 因为有些任务是有先后顺序依赖，[]内的并行执行，()内的串行执行
const RunSequence = require("gulp-run-sequence");
Gulp.task("start", () => {
  RunSequence("clean", ["copy-sources", "watch"], "web-server");
});

// 默认启动任务
Gulp.task("default", ["start"]);
