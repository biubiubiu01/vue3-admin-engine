import { createAttrSetting, createStyleSetting, createEventSetting } from "@/plugins/create";
import { getSchemaTpl } from "@/plugins/tpls";
import { positionOption } from "@/constant/position";

const attrSetting = createAttrSetting([
    getSchemaTpl("model"),
    getSchemaTpl("collapse", [
        getSchemaTpl("basicGroup", {
            config: [
                getSchemaTpl("placeholder"),
                getSchemaTpl("min", "最小值"),
                getSchemaTpl("max", "最大值"),
                getSchemaTpl("precision"),
                getSchemaTpl("step"),
                getSchemaTpl("stepStrictly"),
                {
                    label: "是否控制",
                    name: "controls",
                    type: "switch",
                    defaultValue: false
                },
                {
                    label: "按钮位置",
                    name: "controls-position",
                    type: "radio",
                    options: positionOption,
                    visibleOn: "data.controls"
                },
                getSchemaTpl("size")
            ],
            isFormItem: true
        }),
        getSchemaTpl("statusGroup", [getSchemaTpl("disabled"), getSchemaTpl("readonly")]),
        getSchemaTpl("validateGroup", [])
    ])
]);

const styleSetting = createStyleSetting([]);

const eventSetting = createEventSetting([]);

export default attrSetting.concat(styleSetting).concat(eventSetting);
