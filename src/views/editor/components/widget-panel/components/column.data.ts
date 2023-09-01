/*
 * @Author: lzy
 * @Date: 2023-05-22 11:11:47
 * @LastEditors: lzy
 * @LastEditTime: 2023-06-20 11:31:24
 * @FilePath: \vue3-form-drag\src\views\editor\components\widget-panel\components\column.data.ts
 */

import { useWidgetList } from "@/hooks/useWidgetList";

const { getFormWidgetList, getCustomWidgetList, getLayoutWidgetList, getDataWidgetList, getBasicWidgetList } = useWidgetList();

export const basicComponents = [
    {
        title: "表单组件",
        type: "form",
        icon: "svg-form",
        children: getFormWidgetList
    },
    {
        title: "自定义组件",
        type: "custom",
        icon: "svg-custom",
        children: getCustomWidgetList
    },
    {
        title: "布局容器",
        type: "layout",
        icon: "svg-layout",
        children: getLayoutWidgetList
    },
    {
        title: "数据容器",
        type: "data",
        icon: "svg-data",
        children: getDataWidgetList
    },
    {
        title: "基础组件",
        type: "basic",
        icon: "svg-basic",
        children: getBasicWidgetList
    }
];
