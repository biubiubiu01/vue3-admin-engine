import { createAttrSetting, createStyleSetting, createEventSetting } from "@/plugins/create";
import { getSchemaTpl } from "@/plugins/tpls";
import { dateOption } from "@/constant/date";

const attrSetting = createAttrSetting([
    getSchemaTpl("model"),
    getSchemaTpl("collapse", [
        getSchemaTpl("basicGroup", {
            config: [
                getSchemaTpl("placeholder"),
                getSchemaTpl("dateType", dateOption),
                getSchemaTpl("dateFormat"),
                getSchemaTpl("dateValueFormat"),
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
