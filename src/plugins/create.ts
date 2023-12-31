import { deepClone } from "@/utils";

export const createComponent = (option: any) => {
    const componentOption = deepClone(option);
    if (!componentOption.scaffold) {
        componentOption.scaffold = {};
    }
    Object.assign(componentOption.scaffold, {
        type: option.componentName,
        label: option.title,
        onEvent: option.onEvent || []
    });
    return componentOption;
};

export const createAttrSetting = (setting: any[]) => {
    return [
        {
            title: "常规",
            children: setting
        }
    ];
};

export const createStyleSetting = (setting: any[]) => {
    return [
        {
            title: "样式",
            children: setting
        }
    ];
};

export const createEventSetting = (setting: any[]) => {
    return [
        {
            title: "事件",
            children: setting
        }
    ];
};
