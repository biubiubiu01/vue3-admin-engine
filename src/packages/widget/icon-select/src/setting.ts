import { createAttrSetting, createStyleSetting, createEventSetting } from "@/plugins/create";
import { getSchemaTpl } from "@/plugins/tpls";

const attrSetting = createAttrSetting([
    getSchemaTpl("model"),
    getSchemaTpl("collapse", [
        getSchemaTpl("basicGroup", { config: [getSchemaTpl("placeholder"), getSchemaTpl("clearable"), getSchemaTpl("width", "悬浮宽度"), getSchemaTpl("size")], isFormItem: true }),
        getSchemaTpl("statusGroup", [getSchemaTpl("disabled")]),
        getSchemaTpl("validateGroup", [])
    ])
]);

const styleSetting = createStyleSetting([]);

const eventSetting = createEventSetting([]);

export default attrSetting.concat(styleSetting).concat(eventSetting);
