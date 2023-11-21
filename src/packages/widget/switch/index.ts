import { createComponent } from "@/plugins/create";

export default createComponent({
    sort: 6,

    componentName: "switch",

    title: "switch开关",

    icon: "svg-switch",

    events: [
        {
            event: "change",
            params: "value",
            description: "绑定值变化时触发的事件"
        }
    ],

    description: "switch开关"
});
