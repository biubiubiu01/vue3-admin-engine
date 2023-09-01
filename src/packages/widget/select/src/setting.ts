import { createAttrSetting, createStyleSetting, createEventSetting } from "@/plugins/create";
import { getSchemaTpl } from "@/plugins/tpls";

const attrSetting = createAttrSetting([
    getSchemaTpl("model"),
    getSchemaTpl("collapse", [
        getSchemaTpl("basicGroup", {
            config: [
                getSchemaTpl("placeholder"),
                getSchemaTpl("size"),
                getSchemaTpl("multiple"),
                {
                    label: "可清除",
                    name: "clearable",
                    type: "switch"
                },
                {
                    label: "折叠选项",
                    name: "collapse-tags",
                    type: "switch",
                    visibleOn: "data.multiple"
                },
                {
                    label: "最大选择",
                    name: "multiple-limit",
                    type: "number",
                    visibleOn: "data.multiple"
                },
                {
                    label: "可搜索",
                    name: "filterable",
                    type: "switch"
                }
            ],
            isFormItem: true
        }),
        getSchemaTpl("optionsGroup"),
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
