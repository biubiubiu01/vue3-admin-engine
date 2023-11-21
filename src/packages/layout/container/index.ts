import { createComponent } from "@/plugins/create";

export default createComponent({
    sort: 3,

    componentName: "container",

    title: "容器",

    scaffold: {
        children: [],
        tag: "div"
    },

    events: [
        {
            event: "click",
            params: "event",
            description: "点击事件"
        }
    ],

    icon: "svg-container",

    description: "容器组件"
});
