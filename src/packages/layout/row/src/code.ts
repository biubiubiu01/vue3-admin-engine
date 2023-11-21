import { transformObject } from "@/utils";

const renderCode = (config: any, renderCode: any) => {
    const { model, parentModel, children, colNumber, onEvent, ...rest } = config;
    const childStr = `${children.map((item: any) => `<el-col :span="${item.span}">${item.children.map((child: any) => renderCode(child.type, child, parentModel)).join("\n")}</el-col>`).join("\n")}`;

    return `
      <el-row ${transformObject(rest)}>
        ${childStr}
      </el-row>
    `;
};

export default renderCode;
