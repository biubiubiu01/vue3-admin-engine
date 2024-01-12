import { createAttrSetting, createStyleSetting, createEventSetting } from "@/plugins/create";
import { getSchemaTpl } from "@/plugins/tpls";
import { useFormData } from "@/hooks/useFormData";
import { addCollapseItem } from "../index";

const { getActiveInfo } = useFormData();

const attrSetting = createAttrSetting([
    getSchemaTpl("collapse", [
        getSchemaTpl("basicGroup", {
            config: [
                {
                    label: "手风琴模式",
                    name: "accordion",
                    type: "switch"
                },
                {
                    label: "折叠器数",
                    name: "collapseNumber",
                    type: "number",
                    min: 0,
                    pipeIn: () => {
                        return getActiveInfo.value.children.length;
                    },
                    onChange: (value: number) => {
                        const { children } = getActiveInfo.value;
                        if (value > children.length) {
                            children.push(addCollapseItem());
                        } else {
                            getActiveInfo.value.children = children.slice(0, value);
                        }
                    }
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
