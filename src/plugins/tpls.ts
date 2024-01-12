import { sizeOption } from "@/constant/size";
import { typeOption, layoutOptions, borderTypeOptions } from "@/constant/type";
import { placementPosition, formPositionOption, horizontalOption, verticalOption, alignOption, cssPosition } from "@/constant/position";
import { tagOptions } from "@/constant/tag";
import { triggerOption, ruleTriggerOption } from "@/constant/trigger";
import { useFormData } from "@/hooks/useFormData";

const { getActiveInfo } = useFormData();

const tpls: AnyObject = {};

export const getSchemaTpl = (name: string, options?: object) => {
    const tpl = tpls[name];

    return typeof tpl === "function" ? tpl(options) : tpl ?? {};
};

export const setSchemaTpl = (name: string, value: any) => {
    tpls[name] = value;
};

setSchemaTpl("model", {
    label: "绑定字段",
    name: "model",
    type: "input"
});

setSchemaTpl("formItemLabel", {
    label: "标题",
    name: "label",
    type: "input"
});

setSchemaTpl("placeholder", {
    label: "占位文本",
    name: "placeholder",
    type: "input"
});

setSchemaTpl("formItemLabelWidth", {
    label: "标题宽度",
    name: "label-width",
    type: "input"
});

setSchemaTpl("formLabelPosition", {
    label: "标题位置",
    name: "label-position",
    type: "radio",
    options: formPositionOption
});

setSchemaTpl("formSuffix", {
    label: "显示冒号",
    name: "label-suffix",
    type: "switch"
});

setSchemaTpl("height", {
    label: "高度",
    name: "height",
    type: "input"
});

setSchemaTpl("maxHeight", {
    label: "最大高度",
    name: "max-height",
    type: "input"
});

setSchemaTpl("stripe", {
    label: "斑马纹",
    name: "stripe",
    type: "switch"
});

setSchemaTpl("fit", {
    label: "自适应宽度",
    name: "fit",
    type: "switch"
});

setSchemaTpl("showHeader", {
    label: "显示表头",
    name: "show-header",
    type: "switch"
});

setSchemaTpl("tableLayout", {
    label: "表格布局",
    name: "table-layout",
    type: "radio",
    options: [
        { label: "自适应", value: "fixed" },
        { label: "紧凑", value: "auto" }
    ]
});

setSchemaTpl("summaryGroup", {
    label: "显示合计",
    name: "summary-group",
    type: "switch-more",
    formType: "extend",
    pipeIn: (value: AnyObject) => value?.["show-summary"],
    pipeOut: (value: boolean) => {
        if (value) {
            return {
                "show-summary": true,
                "sum-text": "合计"
            };
        }
        return {
            "show-summary": false
        };
    },
    form: {
        "label-width": "80px",
        children: [
            {
                name: "sum-text",
                type: "input",
                label: "首行文本",
                size: "small"
            }
        ]
    }
});

setSchemaTpl("highCurrentRow", {
    label: "高亮当前行",
    name: "highlight-current-row",
    type: "switch"
});

setSchemaTpl("emptyText", {
    label: "空文本",
    name: "empty-text",
    type: "input"
});

setSchemaTpl("scrollbarOn", {
    label: "滚动条长显",
    name: "scrollbar-always-on",
    type: "switch"
});

setSchemaTpl("showOverflowTooltip", {
    label: "文字悬浮",
    name: "show-overflow-tooltip",
    type: "switch"
});

setSchemaTpl("tableIndex", {
    label: "显示序号",
    name: "show-index",
    type: "switch"
});

setSchemaTpl("tableCheck", {
    label: "显示勾选",
    name: "show-selection",
    type: "switch"
});

setSchemaTpl("border", {
    label: "边框",
    name: "border",
    type: "switch"
});

setSchemaTpl("maxlength", {
    label: "最大长度",
    name: "maxlength",
    type: "number"
});

setSchemaTpl("min", (title: string) => {
    return {
        label: title,
        name: "min",
        type: "number"
    };
});

setSchemaTpl("max", (title: string) => {
    return {
        label: title,
        name: "max",
        type: "number"
    };
});

setSchemaTpl("precision", {
    label: "小数位数",
    name: "precision",
    type: "number"
});

setSchemaTpl("step", {
    label: "步进",
    name: "step",
    type: "number",
    defaultValue: 1
});

setSchemaTpl("stepStrictly", {
    label: "严格步进",
    name: "step-strictly",
    type: "switch"
});

setSchemaTpl("showWordLimit", {
    label: "计数器",
    name: "show-word-limit",
    type: "switch"
});

setSchemaTpl("shape", {
    label: "形状",
    name: "shape",
    type: "radio",
    options: [
        {
            label: "默认",
            value: ""
        },
        {
            label: "按钮",
            value: "button"
        }
    ]
});

setSchemaTpl("size", {
    label: "大小",
    name: "size",
    type: "radio",
    options: sizeOption
});

setSchemaTpl("type", ({ title, name }: { title: string; name: string }) => {
    return {
        label: title,
        name,
        type: "select",
        options: typeOption
    };
});

setSchemaTpl("showType", {
    label: "显示类型",
    name: "showType",
    type: "select",
    clearable: true,
    options: layoutOptions,
    onChange: () => {
        getActiveInfo.value.justify = "";
        getActiveInfo.value.align = "";
    }
});

setSchemaTpl("justifyLayout", (params: AnyObject) => {
    return {
        label: "水平布局",
        name: "justify",
        type: "select",
        options: horizontalOption,
        ...params
    };
});

setSchemaTpl("alignLayout", (params: AnyObject) => {
    return {
        label: "垂直布局",
        name: "align",
        type: "select",
        options: alignOption,
        ...params
    };
});

setSchemaTpl("verticalLayout", {
    label: "垂直布局",
    name: "align",
    type: "select",
    options: verticalOption
});

setSchemaTpl("color", (title: string) => {
    return {
        label: title,
        name: "color",
        type: "color-picker"
    };
});

setSchemaTpl("prefixIcon", {
    label: "前缀图标",
    name: "prefix-icon",
    type: "icon-select"
});

setSchemaTpl("suffixIcon", {
    label: "后缀图标",
    name: "suffix-icon",
    type: "icon-select"
});

setSchemaTpl("icon", (title: string) => {
    return {
        label: title,
        name: "icon",
        type: "icon-select"
    };
});

setSchemaTpl("tag", (title: string) => {
    return {
        label: title,
        name: "tag",
        type: "select",
        options: tagOptions
    };
});

setSchemaTpl("width", (title: string) => {
    return {
        label: title,
        name: "width",
        type: "input"
    };
});

setSchemaTpl("clearable", {
    label: "可清除",
    name: "clearable",
    type: "switch"
});

// setSchemaTpl("visibleOn", {
//     label: "显示",
//     name: "visibleOn",
//     type: "switch"
// });

// setSchemaTpl("hiddenOn", {
//     label: "隐藏",
//     name: "hiddenOn",
//     type: "switch"
// });

setSchemaTpl("disabled", {
    label: "禁用",
    name: "disabled",
    type: "switch"
});

setSchemaTpl("readonly", {
    label: "只读",
    name: "readonly",
    type: "switch"
});

setSchemaTpl("autofocus", {
    label: "自动聚焦",
    name: "autofocus",
    type: "switch"
});

setSchemaTpl("loading", {
    label: "加载中",
    name: "loading",
    type: "switch"
});

setSchemaTpl("multiple", {
    label: "可多选",
    name: "multiple",
    type: "switch"
});

setSchemaTpl("dateType", (option: DateOption[]) => {
    return {
        label: "日期类型",
        name: "dateType",
        type: "select",
        options: option,
        onChange: (val: string) => {
            const findItem = option.find((item) => item.value === val);
            getActiveInfo.value.format = findItem?.format;
            getActiveInfo.value["value-format"] = findItem?.valueFormat;
        }
    };
});

setSchemaTpl("dateFormat", {
    label: "显示格式",
    name: "format",
    type: "input"
});

setSchemaTpl("dateValueFormat", {
    label: "值格式",
    name: "value-format",
    type: "input"
});

setSchemaTpl("labelRemark", {
    label: "标题提示",
    name: "labelRemark",
    type: "switch-more",
    formType: "dialog",
    pipeIn: (value: LabelRemark | undefined) => !!value,
    pipeOut: (value: boolean) => {
        if (value) {
            return {
                icon: "QuestionFilled",
                trigger: "hover",
                placement: "top",
                title: "提示",
                content: "这是一段标题提示"
            };
        }
        return undefined;
    },
    form: {
        size: "default",
        children: [
            {
                type: "row",
                children: [
                    {
                        type: "col",
                        span: 12,
                        children: [
                            { name: "title", type: "input", label: "提示标题", placeholder: "请输入提示标题", span: 12, size: "default" },
                            {
                                name: "content",
                                type: "textarea",
                                label: "内容",
                                span: 12,
                                size: "default"
                            }
                        ]
                    },
                    {
                        type: "col",
                        span: 12,
                        children: [
                            {
                                name: "placement",
                                type: "select",
                                options: placementPosition,
                                label: "弹出位置",
                                span: 12,
                                class: "w100",
                                size: "default"
                            },
                            {
                                name: "icon",
                                type: "icon-select",
                                label: "图标",
                                span: 12,
                                size: "default"
                            }
                        ]
                    },
                    {
                        type: "col",
                        span: 24,
                        children: [
                            {
                                name: "trigger",
                                type: "radio",
                                options: triggerOption,
                                label: "触发方式",
                                span: 24,
                                size: "default"
                            }
                        ]
                    }
                ]
            }
        ]
    }
});

setSchemaTpl("validateMax", {
    label: "最大长度",
    name: "validateMax",
    type: "switch-more",
    formType: "extend",
    size: "small",
    pipeIn: (value: { number: number; message: string | undefined } | undefined) => !!value,
    pipeOut: (value: boolean) => {
        if (value) {
            return {
                number: undefined,
                message: ""
            };
        }
        return undefined;
    },
    form: {
        "label-width": "80px",
        children: [
            {
                name: "number",
                type: "number",
                label: "字符数",
                size: "small"
            },
            {
                name: "message",
                type: "input",
                label: "错误提示",
                size: "small"
            }
        ]
    }
});

setSchemaTpl("validateMin", {
    label: "最小长度",
    name: "validateMin",
    type: "switch-more",
    formType: "extend",
    pipeIn: (value: { number: number; message: string | undefined } | undefined) => !!value,
    pipeOut: (value: boolean) => {
        if (value) {
            return {
                number: undefined,
                message: ""
            };
        }
        return undefined;
    },
    form: {
        "label-width": "80px",
        children: [
            {
                name: "number",
                type: "number",
                label: "字符数",
                size: "small"
            },
            {
                name: "message",
                type: "input",
                label: "错误提示",
                size: "small"
            }
        ]
    }
});

setSchemaTpl("validateGroup", (config: Tpl[]) => {
    return {
        label: "校验配置",
        model: "validate",
        type: "collapse-item",
        children: [
            {
                label: "必填",
                name: "validateRequired",
                type: "switch"
            },
            {
                label: "错误提示",
                name: "validateMessage",
                type: "input"
            },
            ...config,
            {
                label: "触发方式",
                name: "validateTrigger",
                type: "checkbox",
                options: ruleTriggerOption
            }
        ]
    };
});

setSchemaTpl(
    "collapse",
    (
        config: Array<{
            label: string;
            children: Component[];
        }>
    ) => {
        return {
            label: "",
            model: "collapse",
            type: "collapse",
            children: config
        };
    }
);

setSchemaTpl("class", {
    label: "类名",
    name: "class",
    type: "input"
});

setSchemaTpl("styleWidth", {
    label: "宽度",
    name: "style.width",
    type: "input"
});

setSchemaTpl("styleHeight", {
    label: "高度",
    name: "style.height",
    type: "input"
});

const position = ["top", "right", "bottom", "left"];

setSchemaTpl("styleMargin", {
    label: "外边距",
    type: "switch-more",
    formType: "extend",
    virtualBind: true,
    pipeIn: (value: any, item: Component, data: AnyObject) => {
        return Object.keys(data.style).some((val) => val.includes("margin"));
    },
    pipeOut: (value: boolean, item: Component, data: AnyObject) => {
        if (!value) {
            position.forEach((val) => {
                delete data.style[`margin-${val}`];
            });
        }
    },
    form: {
        "label-width": "80px",
        children: position.map((positionItem) => {
            return {
                name: `style.margin-${positionItem}`,
                type: "input",
                label: positionItem,
                size: "small",
                pipeIn: (value: string, item: Component, data: AnyObject) => {
                    const margin = data.style?.margin;
                    if (margin) {
                        const marginList = margin.split(" ");
                        if (marginList.length > 0) {
                            const marginMap: AnyObject = {};
                            marginMap.top = marginList[0];
                            marginMap.right = marginList[1] || marginMap.top;
                            marginMap.bottom = marginList[2] || marginMap.top;
                            marginMap.left = marginList[3] || marginMap.right;
                            return marginMap[positionItem];
                        }
                    }
                    return value;
                }
            };
        })
    }
});

setSchemaTpl("stylePadding", {
    label: "内边距",
    type: "switch-more",
    formType: "extend",
    virtualBind: true,
    pipeIn: (value: any, item: Component, data: AnyObject) => {
        return Object.keys(data.style).some((val) => val.includes("padding"));
    },
    pipeOut: (value: boolean, item: Component, data: AnyObject) => {
        if (!value) {
            position.forEach((val) => {
                delete data.style[`padding-${val}`];
            });
        }
    },
    form: {
        "label-width": "80px",
        children: position.map((positionItem) => {
            return {
                name: `style.padding-${positionItem}`,
                type: "input",
                label: positionItem,
                pipeIn: (value: string, item: Component, data: AnyObject) => {
                    const padding = data.style?.padding;
                    if (padding) {
                        const paddingList = padding.split(" ");
                        if (paddingList.length > 0) {
                            const paddingMap: AnyObject = {};
                            paddingMap.top = paddingList[0];
                            paddingMap.right = paddingList[1] || paddingMap.top;
                            paddingMap.bottom = paddingList[2] || paddingMap.top;
                            paddingMap.left = paddingList[3] || paddingMap.right;
                            return paddingMap[positionItem];
                        }
                    }
                    return value;
                },
                size: "small"
            };
        })
    }
});

setSchemaTpl("styleColor", {
    label: "文字颜色",
    name: "style.color",
    type: "color-picker"
});

setSchemaTpl("styleBgColor", {
    label: "背景颜色",
    name: "style.background-color",
    type: "color-picker"
});

setSchemaTpl("styleFontSize", {
    label: "字号",
    name: "style.font-size",
    type: "input"
});

setSchemaTpl("styleLineHeight", {
    label: "行高",
    name: "style.line-height",
    type: "input"
});

setSchemaTpl("stylePosition", {
    label: "使用定位",
    type: "switch-more",
    formType: "extend",
    virtualBind: true,
    pipeIn: (value: any, item: Component, data: AnyObject) => {
        return Object.keys(data.style).some((val) => val.includes("position"));
    },
    pipeOut: (value: boolean, item: Component, data: AnyObject) => {
        if (!value) {
            position.forEach((val) => {
                delete data.style[val];
            });
            delete data.style.position;
        }
    },
    form: {
        "label-width": "80px",
        children: [
            {
                label: "定位",
                name: "style.position",
                type: "select",
                clearable: true,
                options: cssPosition,
                size: "small",
                onChange: (value: string) => {
                    if (!value) {
                        position.forEach((val) => {
                            delete getActiveInfo.value.style[val];
                        });
                    }
                }
            },
            ...position.map((item) => {
                return {
                    name: `style.${item}`,
                    type: "input",
                    label: item,
                    size: "small"
                };
            })
        ]
    }
});

setSchemaTpl("styleZIndex", {
    label: "层级",
    name: "style.z-index",
    type: "number"
});

setSchemaTpl("styleFontWeight", {
    label: "字重",
    name: "style.font-weight",
    type: "number",
    min: 100,
    step: 100,
    max: 900
});

setSchemaTpl("styleBorderWidth", {
    label: "边框",
    name: "style.border-width",
    type: "input"
});

setSchemaTpl("styleBorderStyle", {
    label: "边框类型",
    name: "style.border-style",
    type: "radio",
    options: borderTypeOptions
});

setSchemaTpl("styleBorderColor", {
    label: "边框颜色",
    name: "style.border-color",
    type: "color-picker"
});

setSchemaTpl("styleBorderRadius", {
    label: "边框圆角",
    name: "style.border-radius",
    type: "input"
});

setSchemaTpl("basicGroup", ({ config = [], isFormItem = false }) => {
    const formItemConfig = [];
    if (isFormItem) {
        formItemConfig.push(getSchemaTpl("formItemLabel"), getSchemaTpl("labelRemark"), getSchemaTpl("formItemLabelWidth"));
    }
    return {
        label: "基础配置",
        model: "basic",
        type: "collapse-item",
        children: [...formItemConfig, ...config]
    };
});

setSchemaTpl("statusGroup", (config: Tpl[]) => {
    return {
        label: "状态配置",
        model: "status",
        type: "collapse-item",
        children: [
            // getSchemaTpl("visibleOn"), getSchemaTpl("hiddenOn"),
            ...config
        ]
    };
});

setSchemaTpl("optionsGroup", (config: Tpl[] = []) => {
    return {
        label: "选项",
        model: "options",
        type: "collapse-item",
        children: [
            // {
            //     label: "数据来源",
            //     name: "radio",
            //     type: "radio",
            //     defaultValue: "1",
            //     options: [
            //         {
            //             label: "自定义数据",
            //             value: "1"
            //         },
            //         {
            //             label: "外部接口",
            //             value: "2"
            //         }
            //     ]
            // },
            {
                label: "",
                name: "options",
                type: "option-control"
                // visibleOn: "data.radio"
            },
            ...config
        ]
    };
});

setSchemaTpl("dynamicOptionGroup", (config: Tpl[] = []) => {
    return {
        label: "选项",
        model: "dynamicOptionGroup",
        type: "collapse-item",
        children: [
            {
                label: "显示字段",
                name: "labelKey",
                type: "input"
            },
            {
                label: "值字段",
                name: "valueKey",
                type: "input"
            },
            {
                label: "数据来源",
                name: "option-source",
                type: "radio",
                defaultValue: 1,
                options: [
                    {
                        label: "静态数据",
                        value: 1
                    },
                    {
                        label: "外部接口",
                        value: 2
                    }
                ]
            },
            {
                label: "",
                name: "options",
                type: "option-control",
                visibleOn: "data['option-source']===1"
            },
            {
                label: "接口",
                name: "source",
                type: "http-control",
                visibleOn: "data['option-source']===2"
            },
            {
                label: "初始化请求",
                name: "immediate",
                type: "switch",
                visibleOn: "data['option-source']===2"
            },
            {
                label: "总是请求",
                name: "alwaysLoad",
                type: "switch",
                visibleOn: "data['option-source']===2"
            },

            ...config
        ]
    };
});

setSchemaTpl("layoutGroup", (config: Tpl[] = []) => {
    return {
        label: "布局配置",
        model: "layout",
        type: "collapse-item",
        children: [getSchemaTpl("styleWidth"), getSchemaTpl("styleHeight"), getSchemaTpl("styleMargin"), getSchemaTpl("stylePadding"), ...config]
    };
});

setSchemaTpl("textGroup", (config: Tpl[] = []) => {
    return {
        label: "基础配置",
        type: "collapse-item",
        model: "text",
        children: [getSchemaTpl("styleFontSize"), getSchemaTpl("styleLineHeight"), getSchemaTpl("styleFontWeight"), getSchemaTpl("styleColor"), getSchemaTpl("styleBgColor"), ...config]
    };
});

setSchemaTpl("positionGroup", (config: Tpl[] = []) => {
    return {
        label: "位置配置",
        model: "position",
        type: "collapse-item",
        children: [getSchemaTpl("stylePosition"), getSchemaTpl("styleZIndex"), ...config]
    };
});

setSchemaTpl("borderGroup", (config: Tpl[] = []) => {
    return {
        label: "边框配置",
        type: "collapse-item",
        model: "border",
        children: [getSchemaTpl("styleBorderWidth"), getSchemaTpl("styleBorderStyle"), getSchemaTpl("styleBorderColor"), getSchemaTpl("styleBorderRadius"), ...config]
    };
});

setSchemaTpl("sourceCodeGroup", {
    label: "源码配置",
    model: "sourceCode",
    type: "collapse-item",
    children: [
        {
            type: "source-control"
        }
    ]
});

setSchemaTpl("columnGroup", (config: Tpl[] = []) => {
    return {
        label: "列配置",
        type: "collapse-item",
        model: "tableColumn",
        children: [
            {
                label: "",
                name: "columns",
                type: "column-control"
            }
        ]
    };
});

setSchemaTpl("event", {
    name: "onEvent",
    type: "event-config"
});
