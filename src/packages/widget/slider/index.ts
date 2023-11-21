import { createComponent } from "@/plugins/create";

export default createComponent({
    sort: 17,

    componentName: "slider",

    title: "滑块",

    icon: "svg-slider",

    events: [
        {
            event: "change",
            params: "value",
            description: "值改变时触发（使用鼠标拖曳时，只在松开鼠标后触发）"
        },
        {
            event: "input",
            params: "value",
            description: "数据改变时触发（使用鼠标拖曳时，活动过程实时触发）"
        }
    ],

    description: "滑块组件"
});
