import { createAttrSetting, createStyleSetting, createEventSetting } from "@/plugins/create";
import { getSchemaTpl } from "@/plugins/tpls";

const attrSetting = createAttrSetting([
    getSchemaTpl("collapse", [
        getSchemaTpl("basicGroup", {
            config: [
                {
                    type: "input",
                    label: "折叠器key",
                    name: "model"
                },
                {
                    type: "input",
                    label: "折叠器名称",
                    name: "label"
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
