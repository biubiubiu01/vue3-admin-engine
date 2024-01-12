import { transformObject } from "@/utils";

const renderCode = (config: any) => {
    const { model, children, title, onEvent, parentModel, ...rest } = config;

    return `
      <div ${transformObject(rest)}>${title}</div>
    `;
};

export default renderCode;
