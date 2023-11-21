import { registerCode } from "@/packages";
import { useWidgetList } from "./useWidgetList";
import { transformObject, transformStyle, omit, deepClone } from "@/utils";
import { useFormRules } from "./useFormRules";
import { getComponent, getPlugin } from "@/plugins/plugin";

const codeList = registerCode();
const { isFormComp, getComponentConfig, isCustomComp } = useWidgetList();

export const useCode = () => {
    const renderTemplateCode = (key: string, config: any, parentModel = "formModel") => {
        const deepConfig = Object.assign({}, deepClone(config), { parentModel });
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
            "validateMax",
            "validateMin",
            ...styleOmit
        ];

        if (key !== "form") {
            extraFields.push("label-width");
        }

        const isFormItem = isFormComp(key);

        const elementCode = codeFunc?.(omit(deepConfig, extraFields), renderTemplateCode) || "";

        if (isFormItem) {
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

    const getObjectKeys = (list: TSchemaList) => {
        const arr: any = {};
        list.forEach((item) => {
            if (item.type === "form") {
                arr[item.model] = getObjectKeys(item.children || []);
            }
            if (item.type === "table") {
                arr.data = [];
            }
            if (item.type === "container") {
                Object.assign(arr, getObjectKeys(item.children));
            }
            if (isFormComp(item.type)) {
                if (["checkbox"].includes(item.type)) {
                    arr[item.model] = [];
                } else {
                    arr[item.model] = "";
                }
            }
        });
        return arr;
    };

    const hasFormItem = (list: TSchemaList): boolean => {
        return list.some((item) => {
            if (item.type === "container") {
                return hasFormItem(item.children || []);
            }
            return isFormComp(item.type);
        });
    };

    const renderScriptCode = (schema: TSchemaList, type: TExportType) => {
        const data = renderDataCode(schema, type);
        const methods = renderMethodCode(schema, type);
        const plugin = renderPluginCode(schema, type);
        const customComp = renderCustomComp(schema, type);

        return {
            data,
            methods,
            plugin,
            customComp
        };
    };

    const renderDataCode = (schema: TSchemaList, type: TExportType) => {
        const getBasicData = () => {
            const value = hasFormItem(schema) ? { formModel: getObjectKeys(schema) } : getObjectKeys(schema);

            const dataValue: any = {};

            Object.keys(value).forEach((key) => {
                const item = value[key];
                dataValue[key] = JSON.stringify(item);
            });

            return dataValue;
        };

        const getFormRulesData = () => {
            const { getRules } = useFormRules(schema);
            const rules: any = {};
            Object.keys(getRules.value).forEach((key) => {
                const isRequired = getRules.value[key].some((item: any) => item.required);
                if (isRequired) {
                    rules[key] = getRules.value[key];
                }
            });
            return JSON.stringify(rules);
        };

        const data = {
            ...getBasicData(),
            formRules: getFormRulesData()
        };

        if (type === "vue3") {
            return Object.keys(data)
                .map((key: string) => `const ${key}=reactive(${data[key]})`)
                .join("\n");
        } else {
            return transformObject(data, { quote: false, connect: ":", split: ",\n" });
        }
    };

    const renderMethodCode = (schema: TSchemaList, type: TExportType) => {
        let eventCode: string = "";
        schema.forEach((item) => {
            const onEvent = item.onEvent;
            if (onEvent && onEvent.length > 0) {
                if (type === "vue3") {
                    eventCode += onEvent.map((val: any) => `\nconst ${val.eventName}=(${val.params || ""})=>{${val.eventCode || ""}};`).join("\n");
                } else {
                    eventCode += onEvent.map((val: any) => `\n${val.eventName}(${val.params || ""}){${val.eventCode || ""}},`).join("\n");
                }
            }
        });

        return eventCode;
    };

    const renderPluginCode = (schema: TSchemaList, type: TExportType) => {
        const getSchemaPlugins = (list: TSchemaList, plugins: string[]) => {
            list.forEach((item) => {
                const { plugin = [] } = getComponentConfig(item.type);
                plugin?.forEach((val: string) => {
                    if (!plugins.includes(val)) {
                        plugins.push(val);
                    }
                });
                if (item.children?.length > 0) {
                    plugins.push(...getSchemaPlugins(item.children, plugins));
                }
            });
            return plugins;
        };

        const plugins = getSchemaPlugins(schema, []);

        return plugins
            .map((item: string) => {
                const plugin = getPlugin(item);
                if (type === "html") {
                    return `<script src="${plugin.url}"></script>`;
                } else {
                    return `${plugin.import}`;
                }
            })
            .join("\n");
    };

    const renderCustomComp = (schema: TSchemaList, type: TExportType) => {
        const getSchemaComp = (list: TSchemaList, comps: string[]) => {
            list.forEach((item) => {
                if (isCustomComp(item.type)) {
                    if (!comps.includes(item.type)) {
                        comps.push(item.type);
                    }
                    if (item.children?.length > 0) {
                        comps.push(...getSchemaComp(item.children, comps));
                    }
                }
            });
            return comps;
        };

        const comps = getSchemaComp(schema, []);

        const componentCode: string[] = [];
        const scriptCode: string[] = [];
        comps.forEach((item: string) => {
            const com = getComponent(item);
            componentCode.push(com.component);
            if (type === "html") {
                scriptCode.push(`<script src="${com.url}"></script>`);
            } else {
                scriptCode.push(`${com.import}`);
            }
        });

        return {
            componentList: componentCode.join(","),
            script: scriptCode.join("\n")
        };
    };

    return {
        renderTemplateCode,
        renderScriptCode,
        hasFormItem
    };
};
