import { transformObject } from "@/utils";

const renderCode = (config: any) => {
    const { model, ...rest } = config;
    return `<el-time-picker v-model="formModel.${model}" ${transformObject(rest)}/>`;
};

export default renderCode;
