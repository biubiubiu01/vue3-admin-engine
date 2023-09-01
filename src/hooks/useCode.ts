import { registerCode } from "@/packages";
import { useWidgetList } from "./useWidgetList";
import { transformObject, transformStyle, omit, deepClone } from "@/utils";

const codeList = registerCode();
const { isFormComp } = useWidgetList();

export const useCode = () => {
    const getRenderCode = (key: string, config: any) => {
        const deepConfig = deepClone(config);
        const styleConfig = getConfigStyle(config);

        if (Object.keys(styleConfig).length > 0) {
            deepConfig.style = styleConfig;
        }

        const codeFunc = codeList.get(key);
        const styleOmit = Object.keys(deepConfig).filter((item: string) => item.includes("style:"));
        const extraFields = [
            "pipeIn",
            "pipeOut",
            "span",
            "type",
            "label",
            "id",
            "data",
            "preview",
            "labelRemark",
            "sourceStyle",
            "validateRequired",
            "validateMessage",
            "validateTrigger",
            "label-width",
            ...styleOmit
        ];
        const isFromItem = isFormComp(key);

        const elementCode = codeFunc?.(omit(deepConfig, extraFields)) || "";

        if (isFromItem) {
            return renderFormItemCode(deepConfig, elementCode);
        }
        return elementCode;
    };

    const renderFormItemCode = (config: any, child: string) => {
        const { model, label, size } = config;
        const formItemProps: any = {
            label,
            "label-width": config["label-width"],
            prop: model,
            size
        };
        return `
            <el-form-item ${transformObject(formItemProps)}>
                ${child}
            </el-form-item>
        `;
    };

    const getConfigStyle = (config: any) => {
        return transformStyle(config);
    };

    return {
        getRenderCode
    };
};
