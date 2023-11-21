import { createComponent } from "@/plugins/create";

export default createComponent({
    sort: 16,

    componentName: "rate",

    title: "评分",

    icon: "svg-rate",

    events: [
        {
            event: "change",
            params: "value",
            description: "用户确认选定的值时触发"
        }
    ],

    description: "评分组件"
});
