import { transformObject, transformEvent, omit } from "@/utils";

const renderCode = (config: any) => {
    const { model, parentModel, onEvent, ...rest } = config;
    return `<el-checkbox-group v-model="${parentModel}.${model}" ${transformEvent(onEvent)}>
         ${renderCheckbox(rest)}
    </el-checkbox-group>`;
};

const renderCheckbox = (props: any) => {
    const tag = props.shape === "button" ? "el-checkbox-button" : "el-checkbox";
    const config = transformObject(omit(props, ["shape", "options"]));
    return props.options.reduce((t: string, c: any) => {
        return (t += `<${tag} label=${c.value} ${config}>${c.label}</${tag}>\n`);
    }, "");
};

export default renderCode;
