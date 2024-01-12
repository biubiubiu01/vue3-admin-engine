import { createComponent } from "@/plugins/create";
import { useNanoid } from "@/hooks/useNanoid";

export const addColItem = (config: any = {}) => {
    const defaultConfig = {
        span: 12,
        children: []
    };

    return {
        type: "col",
        id: useNanoid(),
        label: "col容器",
        style: {},
        ...Object.assign(defaultConfig, config)
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

    allowClear: false,

    description: "row容器组件"
});
