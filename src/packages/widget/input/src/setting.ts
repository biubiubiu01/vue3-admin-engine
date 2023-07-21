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
                getSchemaTpl("clearable"),
                {
                    label: "密码框",
                    name: "show-password",
                    type: "switch"
                },
                getSchemaTpl("size"),
                getSchemaTpl("prefixIcon"),
                getSchemaTpl("suffixIcon")
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
