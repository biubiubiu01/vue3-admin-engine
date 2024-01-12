import { createComponent } from "@/plugins/create";

export default createComponent({
    sort: 5,

    componentName: "checkbox",

    title: "多选框",

    icon: "svg-checkbox",

    scaffold: {
        options: [
            {
                label: "选项一",
                value: "1"
            },
            {
                label: "选项二",
                value: "2"
            }
        ]
    },

    events: [
        {
            event: "change",
            params: "value",
            description: "绑定值变化时触发的事件"
        }
    ],

    description: "checkbox多选组件"
} as ComponentConfig);
