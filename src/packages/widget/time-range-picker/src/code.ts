import { transformObject, transformEvent } from "@/utils";

const renderCode = (config: any) => {
    const { model, parentModel, onEvent, ...rest } = config;
    return `<el-time-picker v-model="${parentModel}['${model}']" is-range ${transformObject(rest)} ${transformEvent(onEvent)}/>`;
};

export default renderCode;
