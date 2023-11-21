import { createAttrSetting, createStyleSetting, createEventSetting } from "@/plugins/create";
import { getSchemaTpl } from "@/plugins/tpls";

const attrSetting = createAttrSetting([
    getSchemaTpl("collapse", [
        getSchemaTpl("basicGroup", {
            config: [
                {
                    label: "文本内容",
                    name: "textLabel",
                    type: "input"
                },
                getSchemaTpl("icon", "文本图标"),
                getSchemaTpl("type", { title: "文本类型", name: "textType" }),
                {
                    label: "超出省略",
                    name: "truncated",
                    type: "switch"
                },
                getSchemaTpl("size")
            ]
        })
    ])
]);

const styleSetting = createStyleSetting([
    getSchemaTpl("class"),
    getSchemaTpl("collapse", [getSchemaTpl("layoutGroup"), getSchemaTpl("textGroup"), getSchemaTpl("positionGroup"), getSchemaTpl("borderGroup"), getSchemaTpl("sourceCodeGroup")])
]);

const eventSetting = createEventSetting([getSchemaTpl("event")]);

export default attrSetting.concat(styleSetting).concat(eventSetting);
