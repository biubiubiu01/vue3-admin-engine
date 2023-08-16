import { sizeOption } from "@/constant/size";
import { typeOption, layoutOptions } from "@/constant/type";
import { placementPosition, formPositionOption, horizontalOption, verticalOption } from "@/constant/position";
import { tagOptions } from "@/constant/tag";
import { triggerOption, ruleTriggerOption } from "@/constant/trigger";
import { useFormData } from "@/hooks/useFormData";

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
    type: "number"
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
    options: layoutOptions
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
        options: verticalOption,
        ...params
    };
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
            {
                name: "title",
                type: "input",
                label: "提示标题",
                placeholder: "请输入提示标题",
                span: 12,
                size: "default"
            },
            {
                name: "placement",
                type: "select",
                options: placementPosition,
                label: "弹出位置",
                className: "w100",
                span: 12,
                size: "default"
            },
            {
                name: "content",
                type: "textarea",
                label: "内容",
                span: 12,
                size: "default"
            },
            {
                name: "icon",
                type: "icon-select",
                label: "图标",
                span: 12,
                size: "default"
            },
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
