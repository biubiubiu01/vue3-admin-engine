import { createComponent } from "@/plugins/create";

export default createComponent({
    sort: 14,

    componentName: "half-year-picker",

    title: "半年度选择",

    icon: "svg-halfYear",

    events: [
        {
            event: "change",
            params: "value",
            description: "用户确认选定的值时触发"
        }
    ],

    description: "半年度选择器"
});
