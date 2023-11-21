import { createComponent } from "@/plugins/create";

export default createComponent({
    sort: 7,

    componentName: "select",

    title: "下拉框",

    icon: "svg-select",

    events: [
        {
            event: "change",
            params: "value",
            description: "绑定值变化时触发的事件"
        },
        {
            event: "visible-change",
            params: "visible",
            description: "下拉框出现/隐藏时触发"
        },
        {
            event: "remove-tag",
            params: "value",
            description: "多选模式下移除tag时触发"
        },
        {
            event: "clear",
            params: "",
            description: "可清空的单选模式下用户点击清空按钮时触发"
        },
        {
            event: "focus",
            params: "event",
            description: "当选择器的输入框获得焦点时触发"
        },
        {
            event: "blur",
            params: "event",
            description: "当选择器的输入框失去焦点时触发"
        }
    ],

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
