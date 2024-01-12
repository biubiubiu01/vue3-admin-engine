import { createComponent } from "@/plugins/create";
import { useNanoid } from "@/hooks/useNanoid";

export const addCollapseItem = () => {
    return {
        type: "collapse-item",
        label: "折叠器",
        children: [],
        id: useNanoid(),
        model: useNanoid(),
        style: {}
    };
};

export default createComponent({
    sort: 5,

    componentName: "collapse",

    title: "折叠面板",

    scaffold: {
        children: [addCollapseItem(), addCollapseItem()]
    },

    icon: "svg-collapse",

    pipeIn: ({ data, item, preview }) => {
        return item.children?.map((child) => child.model);
    },

    allowClear: false,

    description: "collapse容器组件"
});
