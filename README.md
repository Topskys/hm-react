# HM-React

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


## react-geek

### Create Project
```bash
# npx
npx create-vite
# cd
cd project-name
# 
npm install
# run
npm run dev
```


### Git克隆指定分支
```bash
# 克隆指定分支
git clone -b dev http://gitslab.yiqing.com/declare/about.git
# 查看当前分支
git branch [-vv]
# 查看分支上的递交情况
git show-branch
```

### Git修改分支名称
```bash
git branch -m <旧分支名> <新分支名>
```

### React富文本编辑器
react-quill
```bash
# 安装（兼容react18的版本）
npm install react-quill@2.0.0-beta.2
```

## 打包优化

### 打包体积分析工具
```bash
# 安装
npm install webpack-bundle-analyzer -D
# or
npm i source-map-explorer -D
# or (vite)
npm i rollup-plugin-visualizer -D
```
修改package.json：
```json
"scripts": {
    "analyze": "source-map-explorer 'build/static/js/*.js'"
}
```

### CDN
CDN是一种内容分发网络服务，当用户请求网站内容时，由离用户最近的服务器将缓存的资源内容传递给用户。

哪些资源可以放到CDN服务器?  
体积较大的非业务JS文件,比如react、react-dom  
1. 体积较大，需要利用CDN文件在浏览器的缓存特性，加快加载时间
2. 非业务JS文件，不需要经常做变动，CDN不用频繁更新缓存

项目中怎么做?  
1. 把需要做CDN缓存的文件排除在打包之外（react、react-dom）
2. 以CDN的方式重新引入资源（react、react-dom）

实践：
```js
// webpack项目中
// craco.config.js
import path from 'path';
const {whenProd,getPlugin,pluginByName}=require("@craco/craco");

module.exports = {
    webpack:{
        alias:{
            '@':path.resolve(__dirname,'src'),
        },
        // 配置CDN
        configure: (webpackConfig) =>{
            let sdn;
            whenProd(()=>{
                // key:不参与打包的包(由dependencies依赖项中的key决定)
                // value: cdn文件中 挂载于全局的变量名称为了替换之前在开发环境下
                webpackConfig.externals={
                    react: 'React',
                    'react-dom': 'ReactDOM',
                }
            })
            // 配置CDN资源地址
            // 实际开发要公司自己花钱买cdn服务器，这里简单使用开源的地址演示。
            cdn={
                js:[
                    'https://cdnjs.cloudflare.com',
                    ''
                ]
            }
            //通过 htmlWebpackPlugin插件在public/index.html注入cdn资源url
            const { isFound,match } = getPlugin(
                webpackConfig,
                pluginByName("HtmlWebpackPlugin")
            )
            if(isFound){
                // 找到了HtmlWebpackPlugin的插件
                match.userOptions.cdn=cdn
            }
            return webpackConfig;
        }
    }
}
```

public/index.html动态引入js：
```html
<body>
<noscript>You need to enable JavaScript to run this app.</noscript>
<div id="root"></div>
<!--动态插入cdn资源url -->
<% htmlWebpackPlugin.options.cdn.js.forEach(cdnURL=> {‰><script src="<%= cdnURL %>"></script>
<%})%>
</body>
```


## react-basic React性能优化

### useReducer


### useMemo和React.memo
useMemo()  
作用：在组件每次重新渲染时缓存计算的结果。

React.memo()  
作用:允许组件在Props没有改变的情况下跳过渲染。  
React组件默认的渲染机制:只要父组件重新渲染子组件就会重新渲染。  

React.memo - props的比较机制  
机制:在使用memo缓存组件之后，React会对每一个prop使用Object.is 比较新值和老值，返回true，表示没有变化  
prop是简单类型  
Object.is(3,3) => true 没有变化  
prop是引用类型(对象/数组)  
Object([],[]) => false有变化，React只关心引用是否变化  



### useCallback
作用：在组件多次重新渲染的时**候缓存函数**。  
useMemo() 缓存的是**结果**，useCallback缓存的是**函数**。


### forwardRef
作用：将父组件ref转发给子组件的ref，使父组件能够拿到子组件ref。


### useImperativeHandle
作用：将父组件的ref转发给子组件的ref，使父组件能够调用子组件ref的方法。



### 类组件生命周期

![类组件的生命周期](https://cdn.nlark.com/yuque/0/2023/png/40488891/1701661790651-1ec5424a-6263-460b-81db-aee8a9c33cdd.png)

<img src="https://cdn.nlark.com/yuque/0/2023/png/40488891/1701661790651-1ec5424a-6263-460b-81db-aee8a9c33cdd.png" style="display:none"/>

