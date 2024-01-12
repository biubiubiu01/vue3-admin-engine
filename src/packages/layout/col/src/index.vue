<template>
    <el-col :span="span">
        <slot></slot>
    </el-col>
</template>

<script lang="ts" setup>
const props = defineProps({
    span: {
        type: Number
    },
    children: {
        type: Array
    }
});
</script>

<style lang="scss" scoped></style>
