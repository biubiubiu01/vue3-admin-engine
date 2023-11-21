import { createAttrSetting, createStyleSetting, createEventSetting } from "@/plugins/create";
import { getSchemaTpl } from "@/plugins/tpls";
import { dateRangeOption } from "@/constant/date";

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
                getSchemaTpl("dateType", dateRangeOption),
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

const styleSetting = createStyleSetting([
    getSchemaTpl("class"),
    getSchemaTpl("collapse", [getSchemaTpl("layoutGroup"), getSchemaTpl("textGroup"), getSchemaTpl("positionGroup"), getSchemaTpl("borderGroup"), getSchemaTpl("sourceCodeGroup")])
]);

const eventSetting = createEventSetting([getSchemaTpl("event")]);

export default attrSetting.concat(styleSetting).concat(eventSetting);
