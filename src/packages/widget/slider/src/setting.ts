import { createAttrSetting, createStyleSetting, createEventSetting } from "@/plugins/create";
import { getSchemaTpl } from "@/plugins/tpls";

const attrSetting = createAttrSetting([
    getSchemaTpl("model"),
    getSchemaTpl("collapse", [
        getSchemaTpl("basicGroup", {
            config: [
                getSchemaTpl("min", "最小值"),
                getSchemaTpl("max", "最大值"),
                getSchemaTpl("step"),
                {
                    name: "range",
                    label: "范围选择",
                    type: "switch"
                },
                {
                    name: "show-input",
                    label: "显示输入框",
                    type: "switch",
                    hiddenOn: "data.range"
                },
                {
                    name: "show-input-controls",
                    label: "输入框控制",
                    type: "switch",
                    visibleOn: "data['show-input']"
                },
                {
                    name: "debounce",
                    label: "输入框防抖",
                    type: "number",
                    visibleOn: "data['show-input']"
                },
                {
                    name: "show-stops",
                    label: "显示间断点",
                    type: "switch"
                },
                getSchemaTpl("size")
            ],
            isFormItem: true
        }),
        getSchemaTpl("statusGroup", [getSchemaTpl("disabled")]),
        getSchemaTpl("validateGroup", [])
    ])
]);

const styleSetting = createStyleSetting([]);

const eventSetting = createEventSetting([]);

export default attrSetting.concat(styleSetting).concat(eventSetting);
