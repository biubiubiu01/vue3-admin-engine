<template>
    <el-row :gutter="gutter" :justify="justify" :align="align">
        <slot></slot>
    </el-row>
</template>

<script lang="ts" setup>
const props = defineProps({
    gutter: {
        type: Number,
        default: 0
    },
    justify: {
        type: String,
        default: "start"
    },
    align: {
        type: String,
        default: "top"
    },
    children: {
        type: Array,
        default: () => []
    }
});
</script>

<style lang="scss" scoped></style>
