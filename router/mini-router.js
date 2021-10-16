//VueRouter 

let Vue;
// 暴露出一个VueRouter实例 
class VueRouter {
    // 可以拿到options 中有router
    constructor(options) {
        this.$options = options;
        // 获取当前hash值 
        // console.log(window.location.hash);
        // 但是current 不是响应式，所以触发不了组件的render函数，页面不会发生变化。所以使用Vue.util.defineReactive
        // 让数据变成响应式 

        const initData = window.location.hash.slice(1) || '/';
        Vue.util.defineReactive(this, 'current', initData)
        // hash change的时候 修改当前url 
        window.addEventListener('hashchange', this.onHashChange.bind(this))
    }

    onHashChange() {
        this.current = window.location.hash.slice(1)
    }


}

// 要有一个install方法 用来实现两个标签的使用 在vue实例上使用$router 
VueRouter.install = function (_Vue) {
    // 保存传入的vue
    Vue = _Vue;

    // 怎么拿到vue的router实例，在use的使用，router还没有挂载到vue实例上，并且vue没有实例化，所以要延迟拿到。
    // 所以使用mixin方式混入  并且只有根组件才拥有router选项
    Vue.mixin({
        beforeCreate() {
            if (this.$options.router) {
                Vue.prototype.$router = this.$options.router;
            }
        }
    })

    // 注册两个组件 
    // 根据to 来切换url 
    // 在组件中内容可以用slots拿到
    Vue.component('router-link', {
        props: {
            to: String
        },
        render(h) {
            return h('a', {
                attrs: {
                    href: '#' + this.to
                }
            }, [
                this.$slots.default
            ])
        }
    })

    // 根据url渲染出不同的组件 
    Vue.component('router-view', {
        // 拿到url的值 怎么拿 可以在构造函数中获取 
        // this.current 
        render(h) {
            // 获取当前组件 
            let component = null;
            const route = this.$router.$options.routes.find(route => route.path === this.$router.current);
            if (route) {
                component = route.component
            }
            console.log(component);

            return h(component)
        }
    })

}

export default VueRouter;