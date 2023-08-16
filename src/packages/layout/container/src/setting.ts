import { createAttrSetting, createStyleSetting, createEventSetting } from "@/plugins/create";
import { getSchemaTpl } from "@/plugins/tpls";

const attrSetting = createAttrSetting([
    getSchemaTpl("collapse", [
        getSchemaTpl("basicGroup", {
            config: [
                getSchemaTpl("tag", "容器标签"),
                getSchemaTpl("showType"),
                getSchemaTpl("justifyLayout", { visibleOn: "data.showType==='flex'" }),
                getSchemaTpl("alignLayout", { visibleOn: "data.showType==='flex'" })
            ]
        })
    ])
]);

const styleSetting = createStyleSetting([]);

const eventSetting = createEventSetting([]);

export default attrSetting.concat(styleSetting).concat(eventSetting);