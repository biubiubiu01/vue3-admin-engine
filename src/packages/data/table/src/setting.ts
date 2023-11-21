import { createAttrSetting, createStyleSetting, createEventSetting } from "@/plugins/create";
import { getSchemaTpl } from "@/plugins/tpls";

const attrSetting = createAttrSetting([
    getSchemaTpl("model"),
    getSchemaTpl("collapse", [
        getSchemaTpl("basicGroup", {
            config: [
                getSchemaTpl("height"),
                getSchemaTpl("maxHeight"),
                getSchemaTpl("emptyText"),
                getSchemaTpl("size"),
                getSchemaTpl("tableLayout"),
                getSchemaTpl("tableIndex"),
                getSchemaTpl("tableCheck"),
                getSchemaTpl("stripe"),
                getSchemaTpl("border"),
                getSchemaTpl("fit"),
                getSchemaTpl("showHeader"),
                getSchemaTpl("highCurrentRow"),
                getSchemaTpl("summaryGroup"),
                getSchemaTpl("scrollbarOn"),
                getSchemaTpl("showOverflowTooltip")
            ]
        }),
        getSchemaTpl("columnGroup")
    ])
]);

const styleSetting = createStyleSetting([
    getSchemaTpl("class"),
    getSchemaTpl("collapse", [getSchemaTpl("layoutGroup"), getSchemaTpl("textGroup"), getSchemaTpl("positionGroup"), getSchemaTpl("borderGroup"), getSchemaTpl("sourceCodeGroup")])
]);

const eventSetting = createEventSetting([getSchemaTpl("event")]);

export default attrSetting.concat(styleSetting).concat(eventSetting);
