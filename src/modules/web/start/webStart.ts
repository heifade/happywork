import * as WebpackDevServer from "webpack-dev-server";
const { chalk, address, openBrowser } = require("../../../../dist-core");
import * as webpack from "webpack";
import { getConfig } from "./getConfig";

export async function start() {
  let host = address();

  let { webConfig, webpackConfig } = await getConfig(host);
  let { port, proxy } = webConfig.development;

  let serverConfig: WebpackDevServer.Configuration = {
    proxy,
    port,
    disableHostCheck: true, // 远程可通过ip访问
    https: false, // 是否启用https
    clientLogLevel: "info", // 客户端日志级别
    compress: true, // gzip 压缩
    watchOptions: {
      poll: 2000 // 监听文件变化频率单位毫秒
    }
    // stats: {
    //   colors: true
    // }
  };

  let compiler = webpack(webpackConfig);

  let server = new WebpackDevServer(compiler, serverConfig);

  server.listen(port, "0.0.0.0", function() {
    console.log(chalk.green(`Starting server on http://${host}:${port}`));
    openBrowser(`http://${host}:${port}`);
  });
}
