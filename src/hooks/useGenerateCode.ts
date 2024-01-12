import { saveAs } from "file-saver";
import { format } from "prettier";
import parserHtml from "prettier/parser-html";
import parserTypeScript from "prettier/parser-typescript";
import parserBabel from "prettier/parser-babel";
import parserPostcss from "prettier/parser-postcss";
import { htmlTemplate, vue2Template, vue3Template } from "@/utils/template";
import { useCode } from "./useCode";
import { useGlobalStyle } from "./useGlobalStyle";
import { deepClone } from "@/utils";

const { renderTemplateCode, renderScriptCode } = useCode();
const { getStyle, getCompileStyle } = useGlobalStyle();

export const useGenerateCode = () => {
    const generateCode = (schema: Component[], type: LanguageType) => {
        let code = "";

        const template = generateTemplate(schema);
        const script = generateScript(schema, type);

        const style = type === "html" ? unref(getCompileStyle) : unref(getStyle);
        if (type === "vue2") {
            code = vue2Template(template, script, style);
        } else if (type === "vue3") {
            code = vue3Template(template, script, style);
        } else if (type === "html") {
            code = htmlTemplate(template, script, style);
        }

        return formatVueCode(code);
    };

    const formatVueCode = (code: string) => {
        return format(code, {
            semi: true,
            parser: "vue",
            plugins: [parserHtml, parserTypeScript, parserBabel, parserPostcss]
        });
    };

    const generateTemplate = (schema: Component[]) => {
        const deepSchema: Component[] = deepClone(schema);
        deepSchema.forEach((item) => {
            if (item.type === "form") {
                item.class = item.class.replace("h100", "");
            }
        });

        return `${deepSchema.reduce((t: string, c: any) => {
            return t + `${renderTemplateCode(c.type, c)}`;
        }, "")}`;
    };

    const generateScript = (schema: Component[], type: LanguageType): any => {
        const script: any = renderScriptCode(schema, type);

        const { data, methods, plugin, customComp } = script;

        return { data, methods, plugin, customComp };
    };

    const outputFile = (code: string, name: string) => {
        if (!code) return;
        const fileBlob = new Blob([code], { type: "text/plain;charset=utf-8" });
        saveAs(fileBlob, name);
    };

    return {
        generateCode,
        generateTemplate,
        generateScript,
        outputFile
    };
};
