import { createComponent } from "@/plugins/create";

export default createComponent({
    sort: 9,

    componentName: "date-range-picker",

    title: "日期区间",

    icon: "svg-dateRange",

    scaffold: {
        dateType: "daterange"
    },

    description: "日期区间组件"
});
