/*
 * @Author: lzy
 * @Date: 2023-06-19 16:15:02
 * @LastEditors: lzy
 * @LastEditTime: 2023-06-19 16:17:32
 * @FilePath: \vue3-form-drag\src\packages\widget\slider\src\code.ts
 *
 */
import { transformObject } from "@/utils";

const renderCode = (config: any) => {
    const { model, ...rest } = config;
    return `<el-slider v-model="formModel.${model}" ${transformObject(rest)}/>`;
};

export default renderCode;
