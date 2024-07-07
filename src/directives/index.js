// 定义图片懒加载插件
import { useIntersectionObserver } from "@vueuse/core";

// 创建对象
export const lazyPlugin = {
    // 使用install方法（插件自带的，即插件安装时调用。后续使用插件时，只需要调用app.use(lazyPlugin)）
    install(app) {
        // 图片懒加载指令逻辑
        // 注册全局自定义指令
        app.directive("img-lazy", {
            // 指令的定义
            mounted(el, binding) {
                // el: 指令所在元素
                // binding.value: 指令传入的值, 这里是图片的src
                console.log(el, binding.value);
                // 创建Intersection Observer实例
                const { stop } = useIntersectionObserver(
                    // 一旦指令进入，就开始监听
                    el,
                    // ([{ isIntersecting }]) ： 使用JavaScript解构赋值语法（IntersectionObserver返回数组对象），获取IntersectionObserver实例的isIntersecting属性
                    ([{ isIntersecting }]) => {
                        console.log(isIntersecting);
                        if (isIntersecting) {
                            // 进入视口区域

                            el.src = binding.value;
                            stop();
                        }
                    },)
            }
        })
    }
}