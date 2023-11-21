import { createComponent } from "@/plugins/create";

export default createComponent({
    sort: 1,

    componentName: "button",

    scaffold: {
        buttonLabel: "按钮"
    },

    events: [
        {
            event: "click",
            params: "event",
            description: "点击事件"
        }
    ],

    title: "按钮",

    icon: "svg-button",

    description: "按钮组件"
});
