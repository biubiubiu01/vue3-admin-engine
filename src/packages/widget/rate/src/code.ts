import { transformObject } from "@/utils";

const renderCode = (config: any) => {
    const { model, ...rest } = config;
    return `<el-rate v-model="formModel.${model}" ${transformObject(rest)}/>`;
};

export default renderCode;
