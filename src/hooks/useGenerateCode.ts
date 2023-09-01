import { saveAs } from "file-saver";
import { format } from "prettier";
import parserHtml from "prettier/parser-html";
import parserTypeScript from "prettier/parser-typescript";
import parserPostcss from "prettier/parser-postcss";
import { htmlTemplate, vue2Template, vue3Template } from "@/utils/template";
import { useCode } from "./useCode";
import { useFormRules } from "./useFormRules";

const { getRenderCode } = useCode();

export const useGenerateCode = () => {
    const generateCode = (schema: TSchemaList, type: TExportType) => {
        let code = "";

        const template = generateTemplate(schema);
        const script = generateScript(schema, type);
        const style = generateStyle();
        if (type === "vue2") {
            code = vue2Template(template, "", style);
        } else if (type === "vue3") {
            code = vue3Template(template, "", style);
        } else if (type === "html") {
            code = htmlTemplate(template, "", style);
        }
        return formatVueCode(code);
    };

    const formatVueCode = (code: string) => {
        return format(code, {
            semi: true,
            parser: "vue",
            plugins: [parserHtml, parserTypeScript, parserPostcss]
        });
    };

    const generateTemplate = (schema: TSchemaList) => {
        const formChild = `${schema.reduce((t: string, c: any) => {
            return t + `${getRenderCode(c.type, c)}`;
        }, "")}`;

        return `<el-form :model="formModel" :rules="formRules">
            ${formChild}
        </el-form>`;
    };

    const generateScript = (schema: TSchemaList, type: TExportType) => {
        // if (type === "vue3") {
        //     return `<script lang="ts" setup>
        //             import {reactive} from "vue"
        //             const formModel=reactive({})
        //         </script>`;
        // } else if (type === "vue2") {
        //     return `<script>export default{}</script>`;
        // }
    };

    const generateStyle = () => {
        return ``;
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
        generateStyle,
        outputFile
    };
};
