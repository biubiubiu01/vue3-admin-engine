import { deepClone } from "@/utils";

export const createComponent = (option: ComponentConfig) => {
    const componentOption = deepClone(option);
    if (!componentOption.scaffold) {
        componentOption.scaffold = {};
    }
    Object.assign(componentOption.scaffold, {
        type: option.componentName,
        label: option.title,
        onEvent: option.onEvent || [],
        style: option.style || {}
    });

    return componentOption;
};

export const createAttrSetting = (setting: Tpl[]) => {
    return [
        {
            title: "常规",
            children: setting
        }
    ];
};

export const createStyleSetting = (setting: Tpl[]) => {
    return [
        {
            title: "样式",
            children: setting
        }
    ];
};

export const createEventSetting = (setting: Tpl[]) => {
    return [
        {
            title: "事件",
            children: setting
        }
    ];
};
