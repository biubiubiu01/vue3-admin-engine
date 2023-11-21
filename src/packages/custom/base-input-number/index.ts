import { createComponent } from "@/plugins/create";

export default createComponent({
    sort: 1,

    componentName: "base-input-number",

    title: "数字输入",

    icon: "svg-number",

    events: [
        {
            event: "change",
            params: "value",
            description: "绑定值变化时触发的事件"
        }
    ],

    description: "自定义input-number组件"
});
