import { createAttrSetting, createStyleSetting, createEventSetting } from "@/plugins/create";
import { getSchemaTpl } from "@/plugins/tpls";
import { basicPositionOption } from "@/constant/position";

const attrSetting = createAttrSetting([
    getSchemaTpl("model"),
    getSchemaTpl("collapse", [
        getSchemaTpl("basicGroup", {
            config: [
                getSchemaTpl("formItemLabelWidth"),
                getSchemaTpl("formLabelPosition"),
                getSchemaTpl("formSuffix"),
                {
                    label: "行内表单",
                    name: "inline",
                    type: "switch"
                },
                {
                    label: "必填星号",
                    name: "hide-required-asterisk",
                    type: "switch"
                },
                {
                    label: "星号位置",
                    name: "require-asterisk-position",
                    type: "radio",
                    options: basicPositionOption,
                    visibleOn: "data['hide-required-asterisk']"
                },
                {
                    label: "显示错误",
                    name: "show-message",
                    type: "switch"
                },
                getSchemaTpl("size")
            ]
        }),
        getSchemaTpl("statusGroup", [getSchemaTpl("disabled")])
    ])
]);

const styleSetting = createStyleSetting([
    getSchemaTpl("class"),
    getSchemaTpl("collapse", [getSchemaTpl("layoutGroup"), getSchemaTpl("textGroup"), getSchemaTpl("positionGroup"), getSchemaTpl("borderGroup"), getSchemaTpl("sourceCodeGroup")])
]);

const eventSetting = createEventSetting([]);

export default attrSetting.concat(styleSetting).concat(eventSetting);
