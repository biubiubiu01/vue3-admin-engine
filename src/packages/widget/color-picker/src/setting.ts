import { createAttrSetting, createStyleSetting, createEventSetting } from "@/plugins/create";
import { getSchemaTpl } from "@/plugins/tpls";

const attrSetting = createAttrSetting([
    getSchemaTpl("model"),
    getSchemaTpl("collapse", [
        getSchemaTpl("basicGroup", {
            config: [
                {
                    label: "可透明",
                    name: "show-alpha",
                    type: "switch"
                },
                getSchemaTpl("size")
            ],
            isFormItem: true
        }),
        getSchemaTpl("statusGroup", [getSchemaTpl("disabled")])
    ])
]);

const styleSetting = createStyleSetting([
    getSchemaTpl("class"),
    getSchemaTpl("collapse", [getSchemaTpl("layoutGroup"), getSchemaTpl("textGroup"), getSchemaTpl("positionGroup"), getSchemaTpl("borderGroup"), getSchemaTpl("sourceCodeGroup")])
]);

const eventSetting = createEventSetting([getSchemaTpl("event")]);

export default attrSetting.concat(styleSetting).concat(eventSetting);
