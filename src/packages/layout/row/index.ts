import { createComponent } from "@/plugins/create";
import { useNanoid } from "@/hooks/useNanoid";

export const addColItem = () => {
    return {
        id: useNanoid(),
        span: 12,
        label: "col容器",
        children: []
    };
};

export default createComponent({
    sort: 2,

    componentName: "row",

    title: "row容器",

    scaffold: {
        children: [addColItem(), addColItem()]
    },

    icon: "svg-row",

    description: "row容器组件"
});
