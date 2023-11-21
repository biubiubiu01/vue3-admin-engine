import { createComponent } from "@/plugins/create";

export default createComponent({
    sort: 12,

    componentName: "time-select",

    title: "时间选择",

    icon: "svg-timeSelect",

    events: [
        {
            event: "change",
            params: "value",
            description: "用户确认选定的值时触发"
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

    description: "时间选择组件"
});
