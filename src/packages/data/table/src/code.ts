import { omit, transformObject, transformEvent } from "@/utils";

const renderColumnCode = (column: any) => {
    const params = {
        label: column.fieldDesc,
        prop: column.fieldName,
        width: column.columnWidth,
        align: column.align,
        sortable: column.sortable,
        fixed: column.fixed
    };
    return `<el-table-column ${transformObject(params)}>
        ${renderColumnTypeCode(column)}
    </el-table-column>`;
};

const renderColumnTypeCode = (column: any) => {
    const { fieldType } = column;
    const isText = fieldType === "text";
    const isDate = fieldType === "date";
    const isMoney = fieldType === "money";
    const isPercent = fieldType === "percent";
    const isTag = fieldType === "tag";
    const isLink = fieldType === "link";
    const isOperate = fieldType === "operate";

    let componentCode = "";

    if (isText) return "";

    if (isDate) {
        componentCode = `{{formatterDate(scope.row.${column.fieldName})}}`;
    }

    if (isMoney) {
        componentCode = `{{formatterMoney(scope.row.${column.fieldName})}}`;
    }

    if (isPercent) {
        componentCode = `{{formatterPercent(scope.row.${column.fieldName})}}`;
    }

    if (isTag) {
        componentCode = `<el-tag>{{scope.row.${column.fieldName}}}</el-tag>`;
    }
    if (isLink) {
        componentCode = `<el-link type="primary" :underline="false">{{scope.row.${column.fieldName}}}</el-link>`;
    }

    if (isOperate) {
        componentCode = column.columns.map((item: any) => `<el-link :type="${item.type}" :underline="false" style="margin-right:5px">${item.label}</el-link>`).join("\n");
    }

    return `<template #default="scope">
        ${componentCode}
    </template>`;
};

const renderCode = (config: any, renderCode: any) => {
    const { model, children, parentModel, onEvent, columns, ...rest } = config;
    const params: any = omit(rest, ["show-index", "show-selection", "summary-group"]);

    if (config?.["summary-group"]?.["show-summary"]) {
        params["show-summary"] = true;
        params["sum-text"] = config?.["summary-group"]?.["sum-text"];
    }

    const selectionColumn = config["show-selection"] ? `<el-table-column fixed="left" type="selection" width="60"></el-table-column>` : "";
    const indexColumn = config["show-index"] ? `<el-table-column label="序号" fixed="left" type="index" width="60" align="center"></el-table-column>` : "";

    const columnStr = columns.map((item: any) => renderColumnCode(item)).join("\n");

    return `<el-table :data="data" ${transformObject(params)}  ${transformEvent(onEvent)}>
        ${selectionColumn}
        ${indexColumn}
        ${columnStr}
    </el-table>`;
};

export default renderCode;
