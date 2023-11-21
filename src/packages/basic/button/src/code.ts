import { transformObject, transformEvent } from "@/utils";

const renderCode = (config: any) => {
    const { model, parentModel, buttonLabel = "按钮", actionType, buttonType, onEvent, ...rest } = config;
    return `<el-button ${transformObject({ type: buttonType, ...rest })} ${transformEvent(onEvent)}>${buttonLabel}</el-button>`;
};

export default renderCode;
