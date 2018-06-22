const gulp = require("gulp");
const gulpts = require("gulp-typescript");
const minify = require("gulp-minify");

module.exports = function(source, target) {
  return new Promise((resolve, reject) => {
    gulp
      .src(source)
      .pipe(
        gulpts({
          sourceMap: true,
          noImplicitAny: true,
          target: "es6",
          module: "commonjs"
        })
      )
      .js.pipe(
        minify({
          ext: {
            src: "-src.js",
            min: ".js"
          }
        })
      )
      .pipe(gulp.dest(target))
      .on("end", () => {
        resolve();
      });
  });
};
