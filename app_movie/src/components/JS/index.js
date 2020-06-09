import Vue from 'vue';
import MessageBox from './MessageBox';
export let messageBox = (function () {
    return function (opts) {
        // 默认参数defaults
        let defaults = {
            title: '',
            content: '',
            cancel: '',
            ok: '',
            handleCancel: null,
            handleOk: null
        }
        //         使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。

        // data 选项是特例，需要注意 - 在 Vue.extend() 中它必须是函数
        let MyComponent = Vue.extend(MessageBox);
        // 配置参数opts
        for (let attr in opts) {
            defaults[attr] = opts[attr];
        }
        let vm = new MyComponent({
            el: document.createElement('div'),
            data: {
                title: defaults.title,
                content: defaults.content,
                cancel: defaults.cancel,
                ok: defaults.ok
            },
            methods: {
                handleCancel() {
                    // 获取vm对象:defaults.handleCancel.call(this);
                    // call()调用立即执行
                    defaults.handleCancel && defaults.handleCancel.call(this);
                    // 移除弹窗
                    document.body.removeChild(vm.$el);
                },
                handleOk() {
                    defaults.handleOk && defaults.handleOk.call(this);
                    document.body.removeChild(vm.$el);
                }

            }
        });
        document.body.appendChild(vm.$el);


    }
})();