import { sizeOption } from "@/constant/size";
import { typeOption, layoutOptions, borderTypeOptions } from "@/constant/type";
import { placementPosition, formPositionOption, horizontalOption, verticalOption, alignOption, cssPosition } from "@/constant/position";
import { tagOptions } from "@/constant/tag";
import { triggerOption, ruleTriggerOption } from "@/constant/trigger";
import { useFormData } from "@/hooks/useFormData";
import { addColItem } from "@/packages/layout/row/index";

const { getActiveInfo } = useFormData();

const tpls: {
    [propName: string]: any;
} = {};

export const getSchemaTpl = (name: string, options?: any) => {
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
    pipeIn: (value: any) => value?.["show-summary"],
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

setSchemaTpl("justifyLayout", (params: any) => {
    return {
        label: "水平布局",
        name: "justify",
        type: "select",
        options: horizontalOption,
        ...params
    };
});

setSchemaTpl("alignLayout", (params: any) => {
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

setSchemaTpl("dateType", (option: any[]) => {
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
    pipeIn: (value: any) => !!value,
    pipeOut: (value: boolean) => {
        if (value) {
            return {
                icon: "QuestionFilled",
                trigger: "hover",
                placement: "top",
                title: "",
                content: ""
            };
        }
        return undefined;
    },
    form: {
        size: "default",
        layoutType: "row",
        gutter: 16,
        children: [
            addColItem({
                children: [
                    {
                        name: "title",
                        type: "input",
                        label: "提示标题",
                        placeholder: "请输入提示标题",
                        span: 12,
                        size: "default"
                    },
                    {
                        name: "content",
                        type: "textarea",
                        label: "内容",
                        span: 12,
                        size: "default"
                    }
                ]
            }),
            addColItem({
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
            }),
            addColItem({
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
            })
        ]
    }
});

setSchemaTpl("validateMax", {
    label: "最大长度",
    name: "validateMax",
    type: "switch-more",
    formType: "extend",
    size: "small",
    pipeIn: (value: any) => !!value,
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
    pipeIn: (value: any) => !!value,
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

setSchemaTpl("validateGroup", (config: any[]) => {
    return {
        label: "校验配置",
        name: "validate",
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
            columns: any[];
        }>
    ) => {
        return {
            label: "",
            name: "collapse",
            type: "collapse",
            defaultExpandAll: true,
            columns: config
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
    name: "style:width",
    type: "input"
});

setSchemaTpl("styleHeight", {
    label: "高度",
    name: "style:height",
    type: "input"
});

setSchemaTpl("styleCommonPosition", [
    {
        name: "top",
        type: "input",
        label: "top",
        size: "small"
    },
    {
        name: "right",
        type: "input",
        label: "right",
        size: "small"
    },
    {
        name: "bottom",
        type: "input",
        label: "bottom",
        size: "small"
    },
    {
        name: "left",
        type: "input",
        label: "left",
        size: "small"
    }
]);

setSchemaTpl("styleMargin", {
    label: "外边距",
    name: "style:margin",
    type: "switch-more",
    formType: "extend",
    pipeIn: (value: any) => !!value,
    pipeOut: (value: boolean) => {
        if (value) {
            return {};
        }
        return undefined;
    },
    form: {
        "label-width": "80px",
        children: getSchemaTpl("styleCommonPosition")
    }
});

setSchemaTpl("stylePadding", {
    label: "内边距",
    name: "style:padding",
    type: "switch-more",
    formType: "extend",
    pipeIn: (value: any) => !!value,
    pipeOut: (value: boolean) => {
        if (value) {
            return {};
        }
        return undefined;
    },
    form: {
        "label-width": "80px",
        children: getSchemaTpl("styleCommonPosition")
    }
});

setSchemaTpl("styleColor", {
    label: "文字颜色",
    name: "style:color",
    type: "color-picker"
});

setSchemaTpl("styleBgColor", {
    label: "背景颜色",
    name: "style:background-color",
    type: "color-picker"
});

setSchemaTpl("styleFontSize", {
    label: "字号",
    name: "style:font-size",
    type: "input"
});

setSchemaTpl("styleLineHeight", {
    label: "行高",
    name: "style:line-height",
    type: "input"
});

setSchemaTpl("stylePosition", {
    label: "定位",
    name: "style:position",
    type: "select",
    options: cssPosition
});

setSchemaTpl("styleZIndex", {
    label: "层级",
    name: "style:z-index",
    type: "number"
});

setSchemaTpl("styleFontWeight", {
    label: "字重",
    name: "style:font-weight",
    type: "number",
    min: 100,
    step: 100,
    max: 900
});

setSchemaTpl("styleBorderWidth", {
    label: "边框",
    name: "style:border-width",
    type: "input"
});

setSchemaTpl("styleBorderStyle", {
    label: "边框类型",
    name: "style:border-style",
    type: "radio",
    options: borderTypeOptions
});

setSchemaTpl("styleBorderColor", {
    label: "边框颜色",
    name: "style:border-color",
    type: "color-picker"
});

setSchemaTpl("styleBorderRadius", {
    label: "边框圆角",
    name: "style:border-radius",
    type: "input"
});

setSchemaTpl("basicGroup", ({ config = [], isFormItem = false }) => {
    const formItemConfig = [];
    if (isFormItem) {
        formItemConfig.push(getSchemaTpl("formItemLabel"), getSchemaTpl("labelRemark"), getSchemaTpl("formItemLabelWidth"));
    }
    return {
        label: "基础配置",
        name: "basic",
        children: [...formItemConfig, ...config]
    };
});

setSchemaTpl("statusGroup", (config: any[]) => {
    return {
        label: "状态配置",
        name: "status",
        children: config
    };
});

setSchemaTpl("optionsGroup", (config: any[] = []) => {
    return {
        label: "选项",
        name: "options",
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

setSchemaTpl("dynamicOptionGroup", (config: any[] = []) => {
    return {
        label: "选项",
        name: "dynamicOptionGroup",
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

setSchemaTpl("layoutGroup", (config: any[] = []) => {
    return {
        label: "布局配置",
        name: "layout",
        children: [getSchemaTpl("styleWidth"), getSchemaTpl("styleHeight"), getSchemaTpl("styleMargin"), getSchemaTpl("stylePadding"), ...config]
    };
});

setSchemaTpl("textGroup", (config: any[] = []) => {
    return {
        label: "基础配置",
        name: "text",
        children: [getSchemaTpl("styleFontSize"), getSchemaTpl("styleLineHeight"), getSchemaTpl("styleFontWeight"), getSchemaTpl("styleColor"), getSchemaTpl("styleBgColor"), ...config]
    };
});

setSchemaTpl("positionGroup", (config: any[] = []) => {
    return {
        label: "位置配置",
        name: "position",
        children: [
            getSchemaTpl("stylePosition"),
            {
                label: "top",
                name: "style:top",
                type: "input"
            },
            {
                label: "right",
                name: "style:right",
                type: "input"
            },
            {
                label: "bottom",
                name: "style:bottom",
                type: "input"
            },
            {
                label: "left",
                name: "style:left",
                type: "input"
            },
            getSchemaTpl("styleZIndex"),
            ...config
        ]
    };
});

setSchemaTpl("borderGroup", (config: any[] = []) => {
    return {
        label: "边框配置",
        name: "border",
        children: [getSchemaTpl("styleBorderWidth"), getSchemaTpl("styleBorderStyle"), getSchemaTpl("styleBorderColor"), getSchemaTpl("styleBorderRadius"), ...config]
    };
});

setSchemaTpl("sourceCodeGroup", {
    label: "源码配置",
    name: "sourceCode",
    children: [
        {
            label: "",
            name: "sourceStyle",
            type: "source-control"
        }
    ]
});

setSchemaTpl("columnGroup", (config: any[] = []) => {
    return {
        label: "列配置",
        name: "tableColumn",
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
