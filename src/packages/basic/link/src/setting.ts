import { createAttrSetting, createStyleSetting, createEventSetting } from "@/plugins/create";
import { getSchemaTpl } from "@/plugins/tpls";

const attrSetting = createAttrSetting([
    getSchemaTpl("collapse", [
        getSchemaTpl("basicGroup", {
            config: [
                {
                    label: "链接内容",
                    name: "label",
                    type: "input"
                },
                getSchemaTpl("icon", "链接图标"),
                {
                    label: "下划线",
                    name: "underline",
                    type: "switch"
                },
                getSchemaTpl("type", { title: "链接类型", name: "linkType" }),
                {
                    label: "跳转地址",
                    name: "href",
                    type: "input"
                }
            ]
        }),
        getSchemaTpl("statusGroup", [getSchemaTpl("disabled")])
    ])
]);

const styleSetting = createStyleSetting([
    getSchemaTpl("class"),
    getSchemaTpl("collapse", [getSchemaTpl("layoutGroup"), getSchemaTpl("textGroup"), getSchemaTpl("positionGroup"), getSchemaTpl("borderGroup"), getSchemaTpl("sourceCodeGroup")])
]);

const eventSetting = createEventSetting([]);

export default attrSetting.concat(styleSetting).concat(eventSetting);
