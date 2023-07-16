import { createAttrSetting, createStyleSetting, createEventSetting } from "@/plugins/create";
import { getSchemaTpl } from "@/plugins/tpls";

const attrSetting = createAttrSetting([
    getSchemaTpl("model"),
    getSchemaTpl("collapse", [
        getSchemaTpl("basic", [
            getSchemaTpl("formItemLabel"),
            getSchemaTpl("labelRemark"),
            getSchemaTpl("formItemLabelWidth"),
            getSchemaTpl("placeholder"),
            getSchemaTpl("minlength"),
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
        ]),
        getSchemaTpl("status", [getSchemaTpl("disabled"), getSchemaTpl("readonly"), getSchemaTpl("autofocus")]),
        getSchemaTpl("validate", [])
    ])
]);

const styleSetting = createStyleSetting([]);

const eventSetting = createEventSetting([]);

export default attrSetting.concat(styleSetting).concat(eventSetting);
