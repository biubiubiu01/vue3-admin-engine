import { transformObject, transformEvent, omit, isString } from "@/utils";

const renderCode = (config: any) => {
    const { model, options, parentModel, source, onEvent, ...rest } = config;
    const params: any = omit(rest, ["option-source"]);
    if (config["option-source"] === 2) {
        Object.assign(params, {
            api: source.url,
            method: source.method,
            resultField: source.resultField
        });
    }

    if (config.labelAndValue && config.modelLabel) {
        params["v-model:modelLabel"] = `${parentModel}['${config.modelLabel}']`;
    }

    const extraStr = config["option-source"] === 2 ? `:params="${getSourceParams(source.params)}"` : `:options="[${options.map((item: any) => getSourceParams(JSON.stringify(item))).join(",")}]"`;

    return `<base-select v-model="${parentModel}['${model}']" ${extraStr}  ${transformObject(params)} ${transformEvent(onEvent)}>
       
    </base-select>`;
};

const getSourceParams = (value: any) => {
    const sourceParams: any = value ? JSON.parse(value) : {};

    let str = "{";

    Object.keys(sourceParams).forEach((item) => {
        const value = sourceParams[item];

        str += item + ":" + (isString(value) ? `'${value}'` : value) + ",";
    });
    str += "}";

    return str;
};

export default renderCode;
