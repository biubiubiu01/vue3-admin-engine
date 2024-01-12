import { createComponent } from "@/plugins/create";

export default createComponent({
    sort: 5,

    componentName: "collapse-item",

    title: "collapse-item容器",

    scaffold: {
        title: "collapse",
        children: []
    },

    isWrapper: true,

    icon: "svg-collapse",

    description: "collapse容器组件",

    hidden: true,

    allowDrag: ["collapse"]
});
