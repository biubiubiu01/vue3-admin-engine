import { transformObject, transformEvent } from "@/utils";

const renderCode = (config: any) => {
    const { model, parentModel, onEvent, ...rest } = config;
    return `<el-color-picker v-model="${parentModel}['${model}']" ${transformObject(rest)}  ${transformEvent(onEvent)}/>`;
};

export default renderCode;
