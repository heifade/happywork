import { WebConfig } from "happywork-config";
import { resolve } from "path";

export default async function() {
  let config: WebConfig = {
    entry: {
      index: resolve(__dirname, "./src/index"),
    },
    html: [
      {
        filename: "index.html",
        title: "标题",
        template: resolve(__dirname, "./public/index.html"),
        chunks: ["vendor-init", "common-init", "index"]
      }
    ],
    development: {
      port: 8081,
      proxy: {
        "/api": ""
      }
    },
    build: {
      dropConsole: true,
      optimization: {
        splitChunks: {
          cacheGroups: {
            // 把node_modules中 需要同步加载的内容打包进vendor-init.js文件
            vendor_init: {
              test: /[\\/]node_modules[\\/]/,
              chunks: "initial",
              name: "vendor-init",
              minChunks: 1,
              priority: 20 // 优先级
            }
          }
        }
      }
    }
  };

  return config;
}
