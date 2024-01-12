import { createComponent } from "@/plugins/create";
import { ItemTypeEnum } from "@/enums/itemTypeEnum";

export default createComponent({
    sort: 1,

    componentName: ItemTypeEnum.Input,

    title: "单行文本",

    icon: "svg-input",

    events: [
        {
            event: "change",
            params: "value",
            description: "当modelValue 改变时，当输入框失去焦点或用户按Enter时触发"
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
        },
        {
            event: "input",
            params: "value",
            description: "在 Input 值改变时触发"
        },
        {
            event: "clear",
            params: "",
            description: "在点击由 clearable 属性生成的清空按钮时触发"
        }
    ],

    description: "单行文本输入框",

    isFormItem: true
});
