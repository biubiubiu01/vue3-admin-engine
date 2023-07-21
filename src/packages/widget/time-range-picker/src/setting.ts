import { createAttrSetting, createStyleSetting, createEventSetting } from "@/plugins/create";
import { getSchemaTpl } from "@/plugins/tpls";

const attrSetting = createAttrSetting([
    getSchemaTpl("model"),
    getSchemaTpl("collapse", [
        getSchemaTpl("basicGroup", {
            config: [
                {
                    label: "前占位文本",
                    name: "start-placeholder",
                    type: "input"
                },
                {
                    label: "结束占位文本",
                    name: "end-placeholder",
                    type: "input"
                },
                {
                    label: "分割符",
                    name: "range-separator",
                    type: "input"
                },
                getSchemaTpl("dateFormat"),
                getSchemaTpl("clearable"),
                getSchemaTpl("size"),
                getSchemaTpl("prefixIcon")
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
