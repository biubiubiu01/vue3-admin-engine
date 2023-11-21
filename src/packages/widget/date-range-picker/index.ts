import { createComponent } from "@/plugins/create";

export default createComponent({
    sort: 9,

    componentName: "date-range-picker",

    title: "日期区间",

    icon: "svg-dateRange",

    scaffold: {
        dateType: "daterange"
    },

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
            event: "calendar-change",
            params: "value",
            description: "在日历所选日期更改时触发"
        },
        {
            event: "panel-change",
            params: "date, mode, view",
            description: "当日期面板改变时触发"
        },
        {
            event: "visible-change",
            params: "visibility",
            description: "当 DatePicker 的下拉列表出现/消失时触发"
        }
    ],

    description: "日期区间组件"
});
