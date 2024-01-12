import { transformObject, transformEvent } from "@/utils";

const renderCode = (config: Component) => {
    const { model, options, parentModel, onEvent, ...rest } = config;

    return `<el-select v-model="${parentModel}.${model}" ${transformObject(rest)} ${transformEvent(onEvent)}>
        ${renderOption(options)}
    </el-select>`;
};

const renderOption = (options: AnyObject[]) => {
    return options.reduce((t: string, c: AnyObject) => {
        return (t += `<el-option label=${c.label} value=${c.value}></el-option>\n`);
    }, "");
};

export default renderCode;
