import { codeList } from "@/packages";
import { useWidgetList } from "./useWidgetList";
import { transformObject, omit, deepClone, isObject } from "@/utils";
import { useFormRules } from "./useFormRules";
import { getComponent, getPlugin } from "@/plugins/plugin";

const { getComponentProps, isFormItem } = useWidgetList();

export const useCode = () => {
    const hasValue = (value: any) => {
        if (Array.isArray(value) && value.length === 0) return false;

        if (isObject(value) && Object.keys(value).length === 0) return false;
        if (value === undefined || value === null || value === "") return false;
        return true;
    };

    const renderTemplateCode = (key: string, config: any, parentModel?: string) => {
        const deepConfig = Object.assign({}, deepClone(config));
        if (parentModel) {
            deepConfig.parentModel = parentModel;
        }

        const codeFunc = codeList.get(key);
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
            "validateRequired",
            "validateMessage",
            "validateTrigger",
            "validateMax",
            "validateMin"
        ];

        Object.keys(config).forEach((key) => {
            if (!hasValue(config[key])) {
                extraFields.push(key);
            }
        });

        const elementCode = codeFunc?.(omit(deepConfig, extraFields), renderTemplateCode) || "";

        if (isFormItem(key)) {
            return renderFormItemCode(config, elementCode);
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

    const getObjectKeys = (list: Component[]) => {
        const arr: any = {};
        list.forEach((item: any) => {
            if (item.type === "form") {
                arr[item.model] = getObjectKeys(item.children || []);
            }
            if (item.type === "table") {
                arr.data = [];
            }
            if (item.type === "container") {
                Object.assign(arr, getObjectKeys(item.children));
            }
            if (isFormItem(item.type)) {
                const isArray = item.type === "checkbox" || (item.type === "select" && item?.multiple);
                if (isArray) {
                    arr[item.model] = [];
                } else {
                    arr[item.model] = "";
                }
            }
        });
        return arr;
    };

    const renderScriptCode = (schema: Component[], type: LanguageType) => {
        const data = renderDataCode(schema, type);

        const methods = renderMethodCode(schema, type);

        // const plugin = renderPluginCode(schema, type);
        // const customComp = renderCustomComp(schema, type);

        return {
            data,
            methods
            // plugin,
            // customComp
        };
    };

    const renderDataCode = (schema: Component[], type: LanguageType) => {
        const getBasicData = () => {
            const value = getObjectKeys(schema);
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

    const renderMethodCode = (schema: Component[], type: LanguageType) => {
        let eventCode: string = "";
        schema.forEach((item) => {
            const onEvent = item.onEvent;
            if (onEvent && onEvent.length > 0) {
                if (type === "vue3") {
                    eventCode += onEvent.map((val: any) => `${getExplanatory(item, val)}\n const ${val.eventName}=(${val.params || ""})=>{${val.eventCode || ""}};`).join("\n");
                } else {
                    eventCode += onEvent.map((val: any) => `${getExplanatory(item, val)} \n${val.eventName}(${val.params || ""}){${val.eventCode || ""}},`).join("\n");
                }
            }
            if (item.children) {
                eventCode += "\n" + renderMethodCode(item.children, type);
            }
        });

        return eventCode;
    };

    const getExplanatory = (item: Component, eventItem: ComponentEvent) => {
        return `

        /**
         * ${item.label || ""}${eventItem.event}事件
         * @param ${eventItem.params} 
         * @returns {*}
         */`;
    };

    const renderPluginCode = (schema: Component[], type: LanguageType) => {
        // const getSchemaPlugins = (list: Component[], plugins: string[]) => {
        //     list.forEach((item) => {
        //         const { plugin = [] } = getComponentConfig(item.type);
        //         plugin?.forEach((val: string) => {
        //             if (!plugins.includes(val)) {
        //                 plugins.push(val);
        //             }
        //         });
        //         if (item.children?.length > 0) {
        //             plugins.push(...getSchemaPlugins(item.children, plugins));
        //         }
        //     });
        //     return plugins;
        // };
        // const plugins = getSchemaPlugins(schema, []);
        // return plugins
        //     .map((item: string) => {
        //         const plugin = getPlugin(item);
        //         if (type === "html") {
        //             return `<script src="${plugin.url}"></script>`;
        //         } else {
        //             return `${plugin.import}`;
        //         }
        //     })
        //     .join("\n");
    };

    const renderCustomComp = (schema: Component[], type: LanguageType) => {
        // const getSchemaComp = (list: Component[], comps: string[]) => {
        //     list.forEach((item) => {
        //         if (isCustomComp(item.type)) {
        //             if (!comps.includes(item.type)) {
        //                 comps.push(item.type);
        //             }
        //             if (item.children?.length > 0) {
        //                 comps.push(...getSchemaComp(item.children, comps));
        //             }
        //         }
        //     });
        //     return comps;
        // };
        // const comps = getSchemaComp(schema, []);
        // const componentCode: string[] = [];
        // const scriptCode: string[] = [];
        // comps.forEach((item: string) => {
        //     const com = getComponent(item);
        //     componentCode.push(com.component);
        //     if (type === "html") {
        //         scriptCode.push(`<script src="${com.url}"></script>`);
        //     } else {
        //         scriptCode.push(`${com.import}`);
        //     }
        // });
        // return {
        //     componentList: componentCode.join(","),
        //     script: scriptCode.join("\n")
        // };
    };

    return {
        renderTemplateCode,
        renderScriptCode
    };
};
