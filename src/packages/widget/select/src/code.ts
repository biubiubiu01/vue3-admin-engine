import { transformObject } from "@/utils";

const renderCode = (config: any) => {
    const { model, options, ...rest } = config;

    return `<el-select v-model="formModel.${model}" ${transformObject(rest)}>
        ${renderOption(options)}
    </el-select>`;
};

const renderOption = (options: any[]) => {
    return options.reduce((t: string, c: any) => {
        return (t += `<el-option label=${c.label} value=${c.value}></el-option>\n`);
    }, "");
};

export default renderCode;
