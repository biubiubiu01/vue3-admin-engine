import { transformObject, transformEvent } from "@/utils";

const renderCode = (config: Component) => {
    const { model, parentModel, dateType, onEvent, ...rest } = config;
    return `<el-date-picker v-model="${parentModel}['${model}']" type="${dateType || "date"}" ${transformObject(rest)} ${transformEvent(onEvent)}/>`;
};

export default renderCode;
