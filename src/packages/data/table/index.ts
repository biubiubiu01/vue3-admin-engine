import { createComponent } from "@/plugins/create";

export default createComponent({
    sort: 2,

    componentName: "table",

    title: "列表容器",

    scaffold: {
        columns: [
            {
                fieldName: "name",
                fieldDesc: "姓名",
                fieldType: "text"
            },
            {
                fieldName: "price",
                fieldDesc: "金额",
                fieldType: "money"
            },
            {
                fieldName: "date",
                fieldDesc: "日期",
                fieldType: "date"
            },
            {
                fieldName: "percent",
                fieldDesc: "所占比例",
                fieldType: "percent"
            },
            {
                fieldName: "type",
                fieldDesc: "类型",
                fieldType: "tag"
            }
        ],
        data: [
            {
                name: "张三",
                price: 5988,
                date: 1698393939046,
                percent: 0.12,
                type: "支出"
            },
            {
                name: "李四",
                price: 19999,
                date: 1698393939046,
                address: "上海市徐汇区宛平南路600号",
                percent: 0.76,
                type: "收入"
            },
            {
                name: "王五",
                date: 1698393939046,
                price: 6999,
                address: "上海市徐汇区宛平南路600号",
                percent: 0.24,
                type: "收入"
            }
        ],
        fit: true,
        "show-header": true,
        "empty-text": "暂无数据",
        "table-layout": "fixed"
    },

    plugin: ["dayjs"],

    events: [
        {
            event: "selection-change",
            params: "selection",
            description: "当选择项发生变化时会触发该事件"
        },
        {
            event: "cell-click",
            params: "row, column, cell, event",
            description: "当某个单元格被点击时会触发该事件"
        },
        {
            event: "cell-dblclick",
            params: "row, column, cell, event",
            description: "当某个单元格被双击击时会触发该事件"
        },
        {
            event: "cell-contextmenu",
            params: "row, column, cell, event",
            description: "当某个单元格被鼠标右键点击时会触发该事件"
        },
        {
            event: "row-click",
            params: "row, column, event",
            description: "当某一行被点击时会触发该事件"
        },
        {
            event: "row-dblclick",
            params: "row, column, event",
            description: "当某一行被双击时会触发该事件"
        },
        {
            event: "row-contextmenu",
            params: "row, column, event",
            description: "当某一行被鼠标右键点击时会触发该事件"
        },
        {
            event: "header-click",
            params: "column, event",
            description: "当某一列的表头被点击时会触发该事件"
        },
        {
            event: "header-contextmenu",
            params: "column, event",
            description: "当某一列的表头被鼠标右键点击时触发该事件"
        },
        {
            event: "sort-change",
            params: "{ column, prop, order }",
            description: "当表格的排序条件发生变化的时候会触发该事件"
        },
        {
            event: "header-dragend",
            params: "newWidth, oldWidth, column, event",
            description: "当拖动表头改变了列的宽度的时候会触发该事件"
        }
    ],

    icon: "svg-table",

    description: "table组件"
});
