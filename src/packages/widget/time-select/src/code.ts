/*
 * @Author: lzy
 * @Date: 2023-06-19 15:21:39
 * @LastEditors: lzy
 * @LastEditTime: 2023-06-19 15:40:48
 * @FilePath: \vue3-form-drag\src\packages\widget\time-select\src\code.ts
 *
 */
import { transformObject, transformEvent } from "@/utils";

const renderCode = (config: any) => {
    const { model, parentModel, onEvent, ...rest } = config;
    return `<el-time-select v-model="${parentModel}['${model}']" ${transformObject(rest)} ${transformEvent(onEvent)}/>`;
};

export default renderCode;
