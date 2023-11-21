import { createAttrSetting, createStyleSetting, createEventSetting } from "@/plugins/create";
import { getSchemaTpl } from "@/plugins/tpls";

const attrSetting = createAttrSetting([
    getSchemaTpl("model"),
    getSchemaTpl("collapse", [
        getSchemaTpl("basicGroup", {
            config: [
                getSchemaTpl("placeholder"),
                {
                    label: "绑定对象",
                    name: "valueObject",
                    type: "switch"
                },
                {
                    label: "change对象",
                    name: "labelInValue",
                    type: "switch"
                },
                {
                    label: "同时绑定",
                    name: "labelAndValue",
                    type: "switch"
                },
                {
                    label: "label字段",
                    name: "modelLabel",
                    type: "input",
                    visibleOn: "data.labelAndValue"
                },
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
                },
                {
                    label: "可远程搜索",
                    name: "remote",
                    type: "switch"
                },
                {
                    label: "搜索关键字",
                    name: "searchKey",
                    type: "input",
                    visibleOn: "data.remote"
                }
            ],
            isFormItem: true
        }),
        getSchemaTpl("dynamicOptionGroup"),
        getSchemaTpl("statusGroup", [getSchemaTpl("disabled")]),
        getSchemaTpl("validateGroup", [])
    ])
]);

const styleSetting = createStyleSetting([
    getSchemaTpl("class"),
    getSchemaTpl("collapse", [getSchemaTpl("layoutGroup"), getSchemaTpl("textGroup"), getSchemaTpl("positionGroup"), getSchemaTpl("borderGroup"), getSchemaTpl("sourceCodeGroup")])
]);

const eventSetting = createEventSetting([getSchemaTpl("event")]);

export default attrSetting.concat(styleSetting).concat(eventSetting);
