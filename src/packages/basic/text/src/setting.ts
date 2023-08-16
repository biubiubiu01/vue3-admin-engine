import { createAttrSetting, createStyleSetting, createEventSetting } from "@/plugins/create";
import { getSchemaTpl } from "@/plugins/tpls";

const attrSetting = createAttrSetting([
    getSchemaTpl("collapse", [
        getSchemaTpl("basicGroup", {
            config: [
                {
                    label: "文本内容",
                    name: "label",
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

const styleSetting = createStyleSetting([]);

const eventSetting = createEventSetting([]);

export default attrSetting.concat(styleSetting).concat(eventSetting);
