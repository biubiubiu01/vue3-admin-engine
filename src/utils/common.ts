/*
 * @Author: lzy
 * @Date: 2023-05-19 15:28:11
 * @LastEditors: lzy
 * @LastEditTime: 2023-06-19 14:51:23
 * @FilePath: \vue3-form-drag\src\utils\common.ts
 *
 */
import { isArray, isBoolean, isObject, isString } from "./is";

/**
 * 排除掉obj里面的key值
 * @param {object} obj
 * @param {Array|string} args
 * @returns {object}
 */
export function omit<T extends Record<string, any>, P extends keyof T>(obj: T, args: string | string[]) {
    if (!args) return obj;
    const newObj = {} as Omit<T, P>;
    const isString = typeof args === "string";
    const keys = Object.keys(obj).filter((item) => {
        if (isString) {
            return item !== args;
        }
        return !(<P[]>args).includes(item as P);
    }) as Exclude<keyof T, P>[];

    keys.forEach((key) => {
        if (obj[key] !== undefined) newObj[key] = obj[key];
    });
    return newObj;
}

/**
 * 获取obj里面的key值
 * @param {object} obj
 * @param {Array|string} args
 * @returns {object}
 */
export function pick<T extends Record<string, any>, P extends keyof T>(obj: T, args: string | string[]) {
    if (!args) return obj;
    const newObj = {} as Omit<T, P>;
    const isString = typeof args === "string";
    const keys = Object.keys(obj).filter((item) => {
        if (isString) {
            return item === args;
        }
        return (<P[]>args).includes(item as P);
    }) as Exclude<keyof T, P>[];

    keys.forEach((key) => {
        if (obj[key] !== undefined) newObj[key] = obj[key];
    });
    return newObj;
}

/**
 * 深拷贝
 * @param {*} source
 * @returns {*}
 */
export function deepClone(source: any) {
    if (!source && typeof source !== "object") {
        return source;
    }
    const targetObj = source.constructor === Array ? [] : {};
    Object.keys(source).forEach((keys) => {
        if (source[keys] && typeof source[keys] === "object") {
            (targetObj as any)[keys] = deepClone(source[keys]);
        } else {
            (targetObj as any)[keys] = source[keys];
        }
    });
    return targetObj;
}

/**
 * 深度合并
 * @param {*} src
 * @param {*} target
 * @returns {*}
 */
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
    let key: string;
    for (key in target) {
        src[key] = isObject(target[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
    }
    return src;
}

export const transformObject = (obj: any, config: any = {}) => {
    const defineConfig = { quote: true, connect: "=", split: " " };
    const options = Object.assign({}, defineConfig, config);
    const quote = options.quote ? `"` : ``;
    const { connect, split } = options;

    let params = "";
    for (const key in obj) {
        if (isString(obj[key])) {
            params += `${key}${connect}${quote}${obj[key]}${quote}${split}`;
        } else if (isObject(obj[key])) {
            params += `${key}${connect}${quote}${transformObject(obj[key], { quote: false, connect: ":", split: ";" })}${quote}${split}`;
        } else if (obj[key] || isBoolean(obj[key]) || obj[key] === 0) {
            params += `:${key}${connect}${quote}${obj[key]}${quote}${split}`;
        }
    }
    return params;
};

export const transformStyle = (element: any): any => {
    const elementStyle: any = {};

    const mergeFields = ["margin", "padding"];
    const inlineStyle = element.sourceStyle?.replace(/[ ]|[\r\n]|#main|{|}/g, "") || "";

    const fields = Object.keys(element).filter((item: string) => item.includes("style:"));

    fields.forEach((item) => {
        const key = item.split(":")[1];
        const value = element[item];
        if (mergeFields.includes(key)) {
            elementStyle[key] = `${value.top || "0px"} ${value.right || "0px"} ${value.bottom || "0px"} ${value.left || "0px"}`;
        } else {
            elementStyle[key] = `${value}`;
        }
    });

    if (inlineStyle) {
        const styleList = inlineStyle.split(";").filter((item: string) => item);

        styleList.forEach((item: string) => {
            const key = item.split(":")[0];
            const value = item.split(":")[1];
            if (mergeFields.includes(key)) {
                elementStyle[key] = value.split("px").join("px ");
            } else {
                elementStyle[key] = value;
            }
        });
    }

    return elementStyle;
};

export const transformEvent = (events: any[]) => {
    return events.map((item) => `@${item.event}=${item.eventName}`).join(" ");
};

type Key = string | number;

export const getValue = (obj: Record<Key, any>, path: Array<Key> | string, defaultValue?: any): any => {
    const pathArr: Array<Key> = Array.isArray(path) ? path : path.toString().split(/[.[\]]/);
    let result: any = obj;

    for (const key of pathArr) {
        result = result?.[key];
        if (result === undefined) {
            return defaultValue;
        }
    }

    return result ?? defaultValue;
};

export const setValue = (obj: Record<Key, any>, path: Array<Key> | string, value: any): void => {
    const pathArr: Array<Key> = Array.isArray(path) ? path : path.toString().split(/[.[\]]/);
    const lastKey: Key = pathArr.pop()!; // 取出最后一个键

    let target: any = obj;
    for (const key of pathArr) {
        if (!target[key] || typeof target[key] !== "object") {
            target[key] = {};
        }
        target = target[key];
    }

    target[lastKey] = value;
};
