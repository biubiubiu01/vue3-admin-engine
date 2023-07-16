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

setSchemaTpl("minlength", {
    label: "最小长度",
    name: "minlength",
    type: "number"
});

setSchemaTpl("maxlength", {
    label: "最大长度",
    name: "maxlength",
    type: "number"
});

setSchemaTpl("showWordLimit", {
    label: "显示字数",
    name: "show-word-limit",
    type: "switch"
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

setSchemaTpl("labelRemark", {
    label: "标题提示",
    name: "labelRemark",
    type: "switch"
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

setSchemaTpl("basic", (config: any[]) => {
    return {
        label: "基础配置",
        name: "basic",
        type: "collapse-item",
        children: config
    };
});

setSchemaTpl("status", (config: any[]) => {
    return {
        label: "状态配置",
        name: "status",
        type: "collapse-item",
        children: config
    };
});

setSchemaTpl("validate", (config: any[]) => {
    return {
        label: "校验配置",
        name: "validate",
        type: "collapse-item",
        children: config
    };
});
