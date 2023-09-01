import { createAttrSetting, createStyleSetting, createEventSetting } from "@/plugins/create";
import { getSchemaTpl } from "@/plugins/tpls";
import { useFormData } from "@/hooks/useFormData";
import { addColItem } from "../index";

const { getActiveInfo } = useFormData();

const attrSetting = createAttrSetting([
    getSchemaTpl("collapse", [
        getSchemaTpl("basicGroup", {
            config: [
                {
                    label: "栅格间隔",
                    name: "gutter",
                    type: "number",
                    min: 0
                },
                getSchemaTpl("justifyLayout"),
                getSchemaTpl("verticalLayout")
            ]
        })
    ]),
    getSchemaTpl("collapse", [
        {
            label: "布局配置",
            name: "layout",
            children: [
                {
                    label: "列数",
                    name: "colNumber",
                    type: "number",
                    min: 0,
                    pipeIn: () => {
                        return getActiveInfo.value.children.length;
                    },
                    onChange: (value: number) => {
                        const { children } = getActiveInfo.value;
                        if (value > children.length) {
                            children.push(addColItem());
                        } else {
                            getActiveInfo.value.children = children.slice(0, value);
                        }
                    }
                },
                {
                    name: "children",
                    type: "row-control"
                }
            ]
        }
    ])
]);

const styleSetting = createStyleSetting([
    getSchemaTpl("class"),
    getSchemaTpl("collapse", [getSchemaTpl("layoutGroup"), getSchemaTpl("textGroup"), getSchemaTpl("positionGroup"), getSchemaTpl("borderGroup"), getSchemaTpl("sourceCodeGroup")])
]);

const eventSetting = createEventSetting([]);

export default attrSetting.concat(styleSetting).concat(eventSetting);
