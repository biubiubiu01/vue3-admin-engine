import { createAttrSetting, createStyleSetting, createEventSetting } from "@/plugins/create";
import { getSchemaTpl } from "@/plugins/tpls";

const attrSetting = createAttrSetting([
    getSchemaTpl("model"),
    getSchemaTpl("collapse", [
        getSchemaTpl("basicGroup", {
            config: [
                getSchemaTpl("placeholder"),
                getSchemaTpl("dateFormat"),
                {
                    label: "开始时间",
                    name: "start",
                    type: "time-picker",
                    format: "HH:mm",
                    "value-format": "HH:mm"
                },
                {
                    label: "结束时间",
                    name: "end",
                    type: "time-picker",
                    format: "HH:mm",
                    "value-format": "HH:mm"
                },
                {
                    label: "间隔时间",
                    name: "step",
                    type: "time-picker",
                    format: "HH:mm",
                    "value-format": "HH:mm"
                },
                {
                    label: "最小时间",
                    name: "min-time",
                    type: "time-picker",
                    format: "HH:mm",
                    "value-format": "HH:mm"
                },
                {
                    label: "最大时间",
                    name: "max-time",
                    type: "time-picker",
                    format: "HH:mm",
                    "value-format": "HH:mm"
                },

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
