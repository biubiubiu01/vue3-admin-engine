/*
 * @Author: lzy
 * @Date: 2023-05-29 14:14:16
 * @LastEditors: lzy
 * @LastEditTime: 2023-05-31 16:30:19
 * @FilePath: \vue3-form-drag\src\packages\widget\textarea\src\code.ts
 *
 */
import { transformObject } from "@/utils";

const renderCode = (config: any) => {
    const { model, ...rest } = config;
    return `<el-input type="textarea" v-model="formModel.${model}" ${transformObject(rest)}/>`;
};

export default renderCode;
