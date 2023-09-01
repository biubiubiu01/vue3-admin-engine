import { transformObject } from "@/utils";

const renderCode = (config: any) => {
    const { model, ...rest } = config;
    return `<quarter-picker v-model="formModel.${model}" ${transformObject(rest)}/>`;
};

export default renderCode;
