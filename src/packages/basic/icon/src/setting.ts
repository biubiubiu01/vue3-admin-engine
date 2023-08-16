import { createAttrSetting, createStyleSetting, createEventSetting } from "@/plugins/create";
import { getSchemaTpl } from "@/plugins/tpls";

const attrSetting = createAttrSetting([
    getSchemaTpl("collapse", [
        getSchemaTpl("basicGroup", {
            config: [
                getSchemaTpl("icon", "图标"),
                {
                    label: "图标大小",
                    name: "size",
                    type: "number",
                    step: 2
                },
                getSchemaTpl("color", "图标颜色"),
                {
                    label: "悬浮高亮",
                    name: "hover",
                    type: "switch"
                }
            ]
        })
    ])
]);

const styleSetting = createStyleSetting([]);

const eventSetting = createEventSetting([]);

export default attrSetting.concat(styleSetting).concat(eventSetting);
