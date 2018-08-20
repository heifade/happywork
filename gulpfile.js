const gulp = require("gulp");
const rimraf = require("rimraf");
const toToJs = require("./src/tools/tsToJs");
const minify = require("gulp-minify");

function clean() {
  rimraf.sync("./dist");
  rimraf.sync("./yarn-error.log");
}

async function build() {
  await toToJs("src/**/*.ts", "dist");

  await gulp
    .src("src/**/*.js")
    .pipe(
      minify({
        ext: {
          src: "-src.js",
          min: ".js"
        }
      })
    )
    .pipe(gulp.dest("dist"));
}

gulp.task("build", async () => {
  clean();
  await build();
});

gulp.task("start", ["build"], () => {
  gulp.watch(["src/**/*.ts", "src/**/*.js"], {interval: 1000},  async () => {
    clean();
    await build();
  });
});
