import { transformObject } from "@/utils";

const renderCode = (config: any) => {
    const { model, ...rest } = config;
    return `<el-color-picker v-model="formModel.${model}" ${transformObject(rest)}/>`;
};

export default renderCode;
