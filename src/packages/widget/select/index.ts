import { createComponent } from "@/plugins/create";

export default createComponent({
    sort: 7,

    componentName: "select",

    title: "下拉框",

    icon: "svg-select",

    scaffold: {
        options: [
            {
                label: "下拉一",
                value: "1"
            },
            {
                label: "下拉二",
                value: "2"
            }
        ]
    },

    description: "select下拉组件"
});
