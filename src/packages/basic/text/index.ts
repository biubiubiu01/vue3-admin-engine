import { createComponent } from "@/plugins/create";

export default createComponent({
    sort: 4,

    componentName: "text",

    scaffold: {
        textLabel: "文本"
    },

    events: [
        {
            event: "click",
            params: "event",
            description: "点击事件"
        }
    ],

    title: "文本",

    icon: "svg-text",

    description: "text文本组件"
});
