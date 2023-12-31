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
        getSchemaTpl("validateGroup", [getSchemaTpl("validateMax"), getSchemaTpl("validateMin")])
    ])
]);

const styleSetting = createStyleSetting([
    getSchemaTpl("class"),
    getSchemaTpl("collapse", [getSchemaTpl("layoutGroup"), getSchemaTpl("textGroup"), getSchemaTpl("positionGroup"), getSchemaTpl("borderGroup"), getSchemaTpl("sourceCodeGroup")])
]);

const eventSetting = createEventSetting([getSchemaTpl("event")]);

export default attrSetting.concat(styleSetting).concat(eventSetting);
