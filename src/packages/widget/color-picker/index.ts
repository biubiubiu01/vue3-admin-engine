import { createComponent } from "@/plugins/create";

export default createComponent({
    sort: 15,

    componentName: "color-picker",

    title: "颜色选择器",

    icon: "svg-colorPicker",

    events: [
        {
            event: "change",
            params: "value",
            description: "用户确认选定的值时触发"
        },
        {
            event: "active-change",
            params: "value",
            description: "面板中当前显示的颜色发生改变时触发"
        },
        {
            event: "focus",
            params: "event",
            description: "当选择器的输入框获得焦点时触发"
        },
        {
            event: "blur",
            params: "event",
            description: "当选择器的输入框失去焦点时触发"
        }
    ],

    description: "颜色选择器组件"
});
