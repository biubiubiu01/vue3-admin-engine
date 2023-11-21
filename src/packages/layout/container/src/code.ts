import { transformObject, transformEvent } from "@/utils";

const renderCode = (config: any, renderCode: any) => {
    const { model, children, parentModel, showType, onEvent, justify, align, tag, style } = config;

    const styleObj: any = {};

    const childStr = `${children.map((item: any) => renderCode(item.type, item, parentModel)).join("\n")}`;

    if (showType) {
        styleObj.display = showType;
        if (justify) {
            styleObj["justify-content"] = justify;
        }
        if (align) {
            styleObj["align-items"] = align;
        }
    }

    if (style) {
        Object.assign(styleObj, style);
    }

    const styleStr = Object.keys(styleObj).length > 0 ? transformObject({ style: styleObj }) : "";

    return `<${tag} ${styleStr} ${transformEvent(onEvent)}>${childStr}</${tag}>`;
};

export default renderCode;
