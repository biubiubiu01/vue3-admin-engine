import { createComponent } from "@/plugins/create";

export default createComponent({
    sort: 3,

    componentName: "col",

    title: "col容器",

    scaffold: {
        span: 12,
        children: []
    },

    isWrapper: true,

    icon: "svg-row",

    description: "col容器组件",

    hidden: true,

    allowDrag: ["row"]
});
