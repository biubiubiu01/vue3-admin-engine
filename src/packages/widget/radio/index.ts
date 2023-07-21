import { createComponent } from "@/plugins/create";

export default createComponent({
    sort: 4,

    componentName: "radio",

    title: "单选框",

    icon: "svg-radio",

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

    description: "radio单选组件"
});
