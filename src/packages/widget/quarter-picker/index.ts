import { createComponent } from "@/plugins/create";

export default createComponent({
    sort: 13,

    componentName: "quarter-picker",

    title: "季度选择",

    icon: "svg-quarter",

    events: [
        {
            event: "change",
            params: "value",
            description: "用户确认选定的值时触发"
        }
    ],

    description: "季度选择器组件"
});
