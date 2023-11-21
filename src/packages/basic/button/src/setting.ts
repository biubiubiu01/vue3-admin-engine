import { createAttrSetting, createStyleSetting, createEventSetting } from "@/plugins/create";
import { getSchemaTpl } from "@/plugins/tpls";

const attrSetting = createAttrSetting([
    getSchemaTpl("collapse", [
        getSchemaTpl("basicGroup", {
            config: [
                {
                    label: "按钮内容",
                    name: "buttonLabel",
                    type: "input"
                },
                getSchemaTpl("icon", "图标"),
                getSchemaTpl("type", { title: "按钮类型", name: "buttonType" }),
                {
                    label: "朴素按钮",
                    name: "plain",
                    type: "switch"
                },
                {
                    label: "文字按钮",
                    name: "text",
                    type: "switch"
                },
                {
                    label: "链接按钮",
                    name: "link",
                    type: "switch"
                },
                {
                    label: "圆角按钮",
                    name: "round",
                    type: "switch"
                },
                {
                    label: "圆形按钮",
                    name: "circle",
                    type: "switch"
                },
                {
                    label: "加载中",
                    name: "loading",
                    type: "switch"
                },
                getSchemaTpl("size")
            ]
        }),
        getSchemaTpl("statusGroup", [getSchemaTpl("disabled")])
    ])
]);

const styleSetting = createStyleSetting([
    getSchemaTpl("class"),
    getSchemaTpl("collapse", [getSchemaTpl("layoutGroup"), getSchemaTpl("textGroup"), getSchemaTpl("positionGroup"), getSchemaTpl("borderGroup"), getSchemaTpl("sourceCodeGroup")])
]);

const eventSetting = createEventSetting([getSchemaTpl("event")]);

export default attrSetting.concat(styleSetting).concat(eventSetting);
