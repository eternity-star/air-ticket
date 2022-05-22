const path = require("path");

module.exports = {
  lintOnSave: undefined,
  outputDir: undefined,
  assetsDir: undefined,
  parallel: undefined,
  publicPath: "./",
  productionSourceMap: true,
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        }
      }
    }

  },
  // devServer: {
  //   host: "localhost",
  //   port: "8080",
  //   // open: false,
  //   proxy: {
  //     "/teamworkapi": {
  //       // target: "https://teamwork.cnhis.cc", // 正式环境
  //       // target: "https://teamwork.cnhis.cc:85", // 85环境
  //       // target: "https://teamwork.cnhis.cc:20001", // 预发布环境
  //       // target: "http://192.168.20.142", //世华开发电脑地址
  //       target: "http://192.168.1.134", // 134环境
  //       // target: "http://192.168.20.136", // 正建环境
  //       // target: "http://192.168.20.221:8025", // 志杰环境
  //       // target: "192.168.20.165:22200", // 曾程本地环境
  //       changeOrigin: true
  //     },
  //   }
  // }
}
