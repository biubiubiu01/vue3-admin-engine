import { transformObject } from "@/utils";

const renderCode = (config: any) => {
    const { model, parentModel, linkLabel = "文字链接", linkType, onEvent, ...rest } = config;
    return `<el-link ${transformObject({ type: linkType, ...rest })}>${linkLabel}</el-link>`;
};

export default renderCode;
