<template>
    <el-row :gutter="gutter" :justify="justify" :align="align" :class="{ 'row-editor': !preview }">
        <el-col v-for="(item, index) in children" :key="index" :span="item.span">
            <drag-group v-if="!preview" :list="item.children" />
            <render-item v-else :element="item" :data="data" :preview="preview" />
        </el-col>
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
    preview: {
        type: Boolean,
        default: false
    },
    id: {
        type: String,
        default: ""
    },
    data: {
        type: Object
    },
    children: {
        type: Array as PropType<any[]>,
        default: () => []
    },
    colNumber: {
        type: Number
    }
});
</script>

<style lang="scss" scoped>
.el-row {
    position: relative;
    z-index: 22;

    &.row-editor {
        min-height: 60px;
    }
}
</style>
