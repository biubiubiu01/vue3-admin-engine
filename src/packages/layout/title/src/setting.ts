import { createAttrSetting, createStyleSetting, createEventSetting } from "@/plugins/create";
import { getSchemaTpl } from "@/plugins/tpls";

const attrSetting = createAttrSetting([
    getSchemaTpl("collapse", [
        getSchemaTpl("basicGroup", {
            config: [
                {
                    label: "标题",
                    name: "title",
                    type: "input"
                }
            ]
        })
    ])
]);

const styleSetting = createStyleSetting([
    getSchemaTpl("class"),
    getSchemaTpl("collapse", [getSchemaTpl("layoutGroup"), getSchemaTpl("textGroup"), getSchemaTpl("positionGroup"), getSchemaTpl("borderGroup"), getSchemaTpl("sourceCodeGroup")])
]);

const eventSetting = createEventSetting([]);

export default attrSetting.concat(styleSetting).concat(eventSetting);
