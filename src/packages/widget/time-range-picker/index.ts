import { createComponent } from "@/plugins/create";

export default createComponent({
    sort: 11,

    componentName: "time-range-picker",

    title: "时间区间",

    icon: "svg-timeRange",

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
        },
        {
            event: "visible-change",
            params: "visibility",
            description: "当 DatePicker 的下拉列表出现/消失时触发"
        }
    ],

    description: "时间区间组件"
});
