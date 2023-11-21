import { createComponent } from "@/plugins/create";

export default createComponent({
    sort: 2,

    componentName: "number",

    title: "数字输入框",

    icon: "svg-number",

    events: [
        {
            event: "change",
            params: "value",
            description: "绑定值被改变时触发"
        },
        {
            event: "focus",
            params: "event",
            description: "在组件 Input 失去焦点时触发"
        },
        {
            event: "blur",
            params: "event",
            description: "当选择器的输入框失去焦点时触发"
        }
    ],

    scaffold: {
        controls: false
    },

    description: "数字输入框"
});
