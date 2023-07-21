import { sizeOption } from "@/constant/size";

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
        change: (val: string, data: any) => {
            const findItem = option.find((item) => item.value === val);
            data.format = findItem?.format;
            data["value-format"] = findItem?.valueFormat;
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
    type: "switch",
    // formType: "dialog",
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
    }
    // form: {}
});

setSchemaTpl(
    "collapse",
    (
        config: Array<{
            label: string;
            children: any[];
        }>
    ) => {
        return {
            label: "",
            name: "collapse",
            type: "collapse",
            defaultExpandAll: true,
            children: config
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
        type: "collapse-item",
        children: [...formItemConfig, ...config]
    };
});

setSchemaTpl("statusGroup", (config: any[]) => {
    return {
        label: "状态配置",
        name: "status",
        type: "collapse-item",
        children: config
    };
});

setSchemaTpl("validateGroup", (config: any[]) => {
    return {
        label: "校验配置",
        name: "validate",
        type: "collapse-item",
        children: config
    };
});

setSchemaTpl("optionsGroup", (config: any[] = []) => {
    return {
        label: "选项",
        name: "options",
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
