import { createAttrSetting, createStyleSetting, createEventSetting } from "@/plugins/create";
import { getSchemaTpl } from "@/plugins/tpls";

const attrSetting = createAttrSetting([
    getSchemaTpl("model"),
    getSchemaTpl("collapse", [
        getSchemaTpl("basicGroup", {
            config: [
                getSchemaTpl("loading"),
                {
                    label: "点内显示",
                    name: "inline-prompt",
                    type: "switch"
                },
                getSchemaTpl("size"),
                {
                    label: "打开值",
                    name: "active-value",
                    type: "input"
                },
                {
                    label: "关闭值",
                    name: "inactive-value",
                    type: "input"
                },
                {
                    label: "打开图标",
                    name: "active-icon",
                    type: "icon-select"
                },
                {
                    label: "关闭图标",
                    name: "inactive-icon",
                    type: "icon-select"
                },
                {
                    label: "打开文字",
                    name: "active-text",
                    type: "input"
                },
                {
                    label: "关闭文字",
                    name: "inactive-text",
                    type: "input"
                }
            ],
            isFormItem: true
        }),
        getSchemaTpl("statusGroup", [getSchemaTpl("disabled")]),
        getSchemaTpl("validateGroup", [])
    ])
]);

const styleSetting = createStyleSetting([
    getSchemaTpl("class"),
    getSchemaTpl("collapse", [getSchemaTpl("layoutGroup"), getSchemaTpl("textGroup"), getSchemaTpl("positionGroup"), getSchemaTpl("borderGroup"), getSchemaTpl("sourceCodeGroup")])
]);

const eventSetting = createEventSetting([]);

export default attrSetting.concat(styleSetting).concat(eventSetting);
