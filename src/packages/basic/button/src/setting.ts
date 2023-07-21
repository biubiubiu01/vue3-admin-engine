import { typeOption } from "@/constant/type";
import { createAttrSetting, createStyleSetting, createEventSetting } from "@/plugins/create";
import { getSchemaTpl } from "@/plugins/tpls";

const attrSetting = createAttrSetting([
    getSchemaTpl("model"),
    getSchemaTpl("collapse", [
        getSchemaTpl("basicGroup", {
            config: [
                {
                    label: "按钮内容",
                    name: "label",
                    type: "input"
                },
                {
                    label: "图标按钮",
                    name: "icon",
                    type: "icon-select"
                },
                {
                    label: "按钮类型",
                    name: "buttonType",
                    type: "select",
                    options: typeOption
                },
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
        getSchemaTpl("statusGroup", [getSchemaTpl("disabled")]),
        getSchemaTpl("validateGroup", [])
    ])
]);

const styleSetting = createStyleSetting([]);

const eventSetting = createEventSetting([]);

export default attrSetting.concat(styleSetting).concat(eventSetting);
