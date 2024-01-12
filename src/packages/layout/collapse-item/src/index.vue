<template>
    <el-collapse-item :title="label" :name="model">
        <slot></slot>
    </el-collapse-item>
</template>

<script lang="ts" setup>
const props = defineProps({
    children: {
        type: Array
    },
    label: {
        type: String,
        default: ""
    },
    model: {
        type: String
    }
});
</script>

<style lang="scss" scoped></style>
