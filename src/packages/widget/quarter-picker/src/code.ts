import { transformObject, transformEvent } from "@/utils";

const renderCode = (config: Component) => {
    const { model, parentModel, onEvent, ...rest } = config;
    return `<quarter-picker v-model="${parentModel}['${model}']" ${transformObject(rest)} ${transformEvent(onEvent)}/>`;
};

export default renderCode;
