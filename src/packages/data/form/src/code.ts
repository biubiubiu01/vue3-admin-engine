import { omit, transformObject } from "@/utils";

const renderCode = (config: any, renderCode: any) => {
    const { model, children, parentModel, onEvent, ...rest } = config;

    const childStr = children ? `${children?.map((item: any) => renderCode(item.type, item, model)).join("\n")}` : "";

    const params = transformObject(omit(rest, "label-suffix"));

    return `
      <el-form :model="${model}" :rules="formRules" ${config["label-suffix"] ? `label-suffix="："` : ""} ${params}>
        ${childStr}
      </el-form>
    `;
};

export default renderCode;
