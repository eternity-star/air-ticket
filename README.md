# air-ticket

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### 前端需要启动本地服务；进入到 server 文件夹路径下，输入下面的命令

```
node index
```

### 启动后台 mysql 服务

```
net start mysql
```

### 关闭后台 mysql 服务

```
net stop mysql
```

### Compiles and minifies for production

```
npm run build
```

### 封装成 electron 思路

#### 第一步：把 electron 的官方例子扒下来，下面简称 A，留着待用：

`git clone https://github.com/electron/electron-quick-start `

#### 第二步：进入我们自己的项目（下面简称 B），修改公共路径为相对路径（很多同学都是这步出了问题，导致 npm run build 后出现白屏情况）：

在项目的根目录中创建 vue.config.js， 设置以下内容：

```
module.exports = {
lintOnSave: undefined,
publicPath: './',
outputDir: undefined,
assetsDir: undefined,
runtimeCompiler: undefined,
productionSourceMap: undefined,
parallel: undefined,
css: undefined
}
```

#### 第三步：打包你的项目，npm run build，将打包出来的 dist 文件夹复制到之前下载的 A 文件夹中

#### 第四步：进入刚才下载的 A 项目，删除项目根目录下的 index.html 文件。

#### 第五步：在 A 项目中找到入口文件 main.js ，修改打包的文件路径为我们的 index.html：

```
// main.js 原始内容
mainWindow.loadFile('index.html')
// 修改后的内容
mainWindow.loadFile('./dist/index.html')
```

#### 第六步：在 A 项目中检查 package.json 的命令，正常情况下，运行下列指令即可进行打包效果预览：

```
// 国内网络下载electron可能很慢，建议设置
// npm config set registry https://registry.npm.taobao.org/
// npm config set ELECTRON_MIRROR http://npm.taobao.org/mirrors/electron/

npm install
npm run start
```

#### 第七步：在 A 项目中，下载打包需要的依赖 electron-packager

```
npm install electron-packager --save-dev
```

#### 第八步：在 A 项目中，进入 package.json ，在 scripts 中添加 packager 指令，如下所示：

```
"scripts": {
"start": "electron .",
"packager": "electron-packager ./ App --platform=win32 --arch=x64 --overwrite"//此处为添加命令
}
```

如果你想修改最后打包出来的 exe 文件图标，类似于 favicon，或者 EXE 的名字，可以设置 packager 的指令内容为，icon 的路径自己调整下哦，更多配置内容请查阅文档哈：

```
"packager": "electron-packager ./ YOUR_APP_NAME --platform=win32 --arch=x64 --icon=./dist/favicon.ico --overwrite"
```

#### 第九步：运行命令打包，然后项目中会出现一个 App-win32-x64 的文件夹，这个文件就是打包好的桌面应用，文件夹里有一个 App.exe 文件，App.exe 就是这个项目的启动文件：

`npm run packager `

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

```

```

```

```

```

```
