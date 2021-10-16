## mini-router 
spa页面切换路由不刷新页面，视图发生改变 也就是替换router的组件
<br /><br />

### 需求分析
* spa ⻚⾯不能刷新
  - hash #/about
  - History api /about
* 根据url显示对应的内容
  - router-view
  - 数据响应式：current变量持有url地址，⼀旦变化，动态重新执⾏render

<br />

### 实现一个插件 
* 一个VueRouter类
* 一个install方法

<br />

### VueRouter
to do 
