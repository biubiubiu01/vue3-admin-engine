import { transformObject, transformEvent } from "@/utils";

const renderCode = (config: any) => {
    const { model, parentModel, textLabel = "按钮", icon, textType, onEvent, ...rest } = config;
    let child = "";
    if (icon) {
        child += `<base-icon :icon="icon" style="margin-right: 3px" />`;
    }
    child += `${textLabel}`;

    return `<el-text ${transformObject({ type: textType, ...rest })} ${transformEvent(onEvent)}>
        ${child}
    </el-text>`;
};

export default renderCode;
