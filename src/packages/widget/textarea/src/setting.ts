import { createAttrSetting, createStyleSetting, createEventSetting } from "@/plugins/create";
import { getSchemaTpl } from "@/plugins/tpls";

const attrSetting = createAttrSetting([
    getSchemaTpl("model"),
    getSchemaTpl("collapse", [
        getSchemaTpl("basicGroup", {
            config: [
                getSchemaTpl("placeholder"),
                getSchemaTpl("maxlength"),
                getSchemaTpl("showWordLimit"),
                {
                    label: "自动高度",
                    name: "autosize",
                    type: "switch"
                }
            ],
            isFormItem: true
        }),
        getSchemaTpl("statusGroup", [getSchemaTpl("disabled"), getSchemaTpl("readonly"), getSchemaTpl("autofocus")]),
        getSchemaTpl("validateGroup", [])
    ])
]);

const styleSetting = createStyleSetting([]);

const eventSetting = createEventSetting([]);

export default attrSetting.concat(styleSetting).concat(eventSetting);
