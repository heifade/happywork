import * as ip from "ip";
import * as Server from "webpack-dev-server";
import chalk from "chalk";
import * as webpack from "webpack";
import getConfig from "./getConfig";
const openBrowser = require("open");

export async function start() {
  let host = ip.address();
  let port = 8080;
  let config = await getConfig({port: port});

  let serverConfig: Server.Configuration = {
    ...config.devServer,

    disableHostCheck: true, // 远程可通过ip访问
    https: false, // 是否启用https
    clientLogLevel: "info", // 客户端日志级别
    compress: true, // gzip 压缩
    watchOptions: {
      poll: 1000 // 监听文件变化频率单位毫秒
    },
    ...{
      stats: {
        colors: true
      }
    }
  };

  let compiler = webpack(config);

  let server = new Server(compiler, serverConfig);

  server.listen(port, "0.0.0.0", function() {
    console.log(chalk.green(`Starting server on http://${host}:${port}`));
    openBrowser(`http://${host}:${port}`);
  });
}
