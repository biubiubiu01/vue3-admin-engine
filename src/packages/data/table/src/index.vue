<template>
    <el-table v-bind="getBindValue" :data="data" :fit="fit" :key="fit">
        <el-table-column v-if="showSelection" fixed="left" type="selection" width="60"></el-table-column>
        <el-table-column v-if="showIndex" label="序号" fixed="left" type="index" width="60" align="center"></el-table-column>
        <el-table-column
            v-for="column in columns"
            :key="column.fieldName"
            :label="column.fieldDesc"
            :prop="column.fieldName"
            :width="column.columnWidth"
            :align="column.align"
            :sortable="column.sortable"
            :fixed="column.fixed ? column.fixed : false"
        >
            <template #default="scope">
                <template v-if="column.fieldType === 'image'">
                    <el-image v-if="scope.row[column.fieldName]" style="width: 100px; height: 100px" :src="scope.row[column.fieldName]" :preview-src-list="[scope.row[column.fieldName]]" fit="cover" />
                </template>
                <template v-else-if="column.fieldType === 'date'">
                    {{ formatterDate(scope.row[column.fieldName]) }}
                </template>
                <template v-else-if="column.fieldType === 'money'">
                    {{ formatterMoney(scope.row[column.fieldName]) }}
                </template>
                <template v-else-if="column.fieldType === 'percent'">
                    {{ formatterPercent(scope.row[column.fieldName]) }}
                </template>
                <template v-else-if="column.fieldType === 'tag'">
                    <el-tag>{{ scope.row[column.fieldName] }}</el-tag>
                </template>
                <template v-else-if="column.fieldType === 'link'">
                    <el-link type="primary" :underline="false">{{ scope.row[column.fieldName] }}</el-link>
                </template>
                <template v-else-if="column.fieldType === 'operate'">
                    <el-link v-for="(item, index) in column.columns" :key="index" :type="item.type" :underline="false" class="mr5">{{ item.label }}</el-link>
                </template>
                <template v-else>
                    {{ scope.row[column.fieldName] }}
                </template>
            </template>
        </el-table-column>
    </el-table>
</template>

<script lang="ts" setup>
import { dayjs } from "element-plus";
const props = defineProps({
    data: {
        type: Object
    },
    id: {
        type: String,
        default: ""
    },
    preview: {
        type: Boolean,
        default: false
    },
    fit: {
        type: Boolean
    },
    columns: {
        type: Array as PropType<any[]>,
        default: () => []
    },
    summaryGroup: {
        type: Object,
        default: () => {}
    },
    showIndex: Boolean,
    showSelection: Boolean
});

const attrs = useAttrs();

const getBindValue = computed(() => {
    const newProps = { ...attrs, ...props.summaryGroup };

    return newProps;
});

const formatToFixed = (money: string, decimals = 2) => (Math.round((parseFloat(money) + Number.EPSILON) * Math.pow(10, decimals)) / Math.pow(10, decimals)).toFixed(decimals);

const formatterMoney = (money: string, decimals: number = 2) => `${parseFloat(formatToFixed(money, decimals)).toLocaleString()}`;

const formatterPercent = (value: number) => Math.round(value * 100 * 100) / 100 + "%";

const formatterDate = (date: Date) => dayjs(date).format("YYYY-MM-DD");
</script>

<style lang="scss" scoped></style>
