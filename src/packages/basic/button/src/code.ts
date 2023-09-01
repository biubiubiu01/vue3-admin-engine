import { transformObject, omit } from "@/utils";

const renderCode = (config: any) => {
    const props = omit(config.props, "title");
    return `<el-button ${transformObject(props)}>${config.props.title}</el-button>`;
};

export default renderCode;
