# videoPublish

视频分发平台

## 目录结构
```
├─public
└─src
    ├─api             # api目录
    ├─assets          # 资源
    ├─components      # 组件
    │  ├─Pagination
    │  └─SvgIcon
    ├─filters         # 过滤器
    ├─icons           # svg图标
    │  └─svg
    ├─layout          # 页面布局
    │  └─component
    │      └─Header
    ├─plugins         # 插件
    ├─router          # 路由(分模块)
    │  └─modules
    ├─store           # 仓储(模块)
    │  └─modules
    ├─styles          # 全局样式及变量mixin
    ├─utils           # 工具库
    └─views           # 页面
└─.env.*              # 环境变量
└─.editorconfig       # 编辑器配置
└─.eslint
└─.eslintignore
└─babel.config.js
└─package.json
└─package-lock.json
└─README.md
└─vue.config.js
```

## 配置
* .env.* 在文件中以键值对方式增加。会增加到process.env中

## 别名
css中别名: ~@ 
```
 alias: {
  '@': resolve('src')
}
```

## git提交
```
type(scope):subject

    type：用于说明commit的类别，规定为如下几种
        feat：新增功能；
        fix：修复bug；
        docs：修改文档；
        refactor：代码重构，未新增任何功能和修复任何bug；
        build：改变构建流程，新增依赖库、工具等（例如webpack修改）；
        style：仅仅修改了空格、缩进等，不改变代码逻辑；
        perf：改善性能和体现的修改；
        chore：非src和test的修改；
        test：测试用例的修改；
        ci：自动化流程配置修改；
        revert：回滚到上一个版本；
    scope：【可选】用于说明commit的影响范围
    subject：commit的简要说明，尽量简短

Body

     对本次commit的详细描述，可分多行

Footer

    不兼容变动：需要描述相关信息
    关闭指定Issue：输入Issue信息
```

## 一、 CSS/SASS规则
1. 如果使用SCSS，注意在任意组件/页面中的内置样式style标签中写 `<style lang="scss" scoped>`
   
   
## 二、axios 使用
1. request.js是对axios二次封装
2. 方法包含拦截响应，拦截请求 将来token 可以加入
3. 封装入了 请求头的信息 包含base地址/timeout/状态码（后台暂未设置）
4. ajax方法在api目录中增加并且以函数的方式返回
```js
import request from '@/utils/request'
export function getInfo() {
  return request.get('/api/getUser')
}
```
## 四、字体图标

本站的SVG矢量图标采用阿里的字体库 http://iconfont.cn/

好处是矢量文件 可任意更改大小，颜色等
首先你要注册一个账号 然后在搜索栏搜索自己需要的图标。然后添加到icon/svg文件夹中。代码会以Symbol的方式添加到DOM树中。
```
<svg-icon icon-class={icon}/>
```
