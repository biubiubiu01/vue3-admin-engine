import { transformObject } from "@/utils";

const renderCode = (config: any) => {
    const { model, parentModel, onEvent, ...rest } = config;
    return `<base-icon ${transformObject(rest)}/>`;
};

export default renderCode;
