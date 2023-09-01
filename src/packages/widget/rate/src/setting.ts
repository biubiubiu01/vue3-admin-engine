import { createAttrSetting, createStyleSetting, createEventSetting } from "@/plugins/create";
import { getSchemaTpl } from "@/plugins/tpls";

const attrSetting = createAttrSetting([
    getSchemaTpl("model"),
    getSchemaTpl("collapse", [
        getSchemaTpl("basicGroup", {
            config: [
                getSchemaTpl("max", "最大分值"),
                {
                    label: "低到中阈值",
                    name: "low-threshold",
                    type: "number"
                },
                {
                    label: "中到高阈值",
                    name: "high-threshold",
                    type: "number"
                },
                {
                    label: "允许半选",
                    name: "allow-half",
                    type: "switch"
                },
                {
                    label: "显示分数",
                    name: "show-score",
                    type: "switch"
                },
                getSchemaTpl("size")
            ],
            isFormItem: true
        }),
        getSchemaTpl("statusGroup", [getSchemaTpl("disabled")]),
        getSchemaTpl("validateGroup", [])
    ])
]);

const styleSetting = createStyleSetting([
    getSchemaTpl("class"),
    getSchemaTpl("collapse", [getSchemaTpl("layoutGroup"), getSchemaTpl("textGroup"), getSchemaTpl("positionGroup"), getSchemaTpl("borderGroup"), getSchemaTpl("sourceCodeGroup")])
]);

const eventSetting = createEventSetting([]);

export default attrSetting.concat(styleSetting).concat(eventSetting);
