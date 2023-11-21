/*
 * @Author: lzy
 * @Date: 2023-05-29 14:13:40
 * @LastEditors: lzy
 * @LastEditTime: 2023-06-01 10:10:55
 * @FilePath: \vue3-form-drag\src\packages\widget\number\src\code.ts
 *
 */
import { transformObject, transformEvent } from "@/utils";

const renderCode = (config: any) => {
    const { model, parentModel, onEvent, ...rest } = config;
    return `<el-input-number v-model="${parentModel}.${model}" ${transformObject(rest)} ${transformEvent(onEvent)}/>`;
};

export default renderCode;
