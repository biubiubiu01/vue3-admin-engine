<template>
    <div class="base-collapse">
        <el-collapse v-model="activeCollapse" :accordion="accordion">
            <el-collapse-item v-for="item in columns" :key="item.name" :title="item.label" :name="item.name">
                <render-item v-for="child in item.children" :key="child.name" :data="getActiveInfo" :element="child" />
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script lang="ts" setup>
import { useFormData } from "@/hooks/useFormData";
const props = defineProps({
    accordion: {
        type: Boolean,
        default: false
    },
    defaultExpandAll: {
        type: Boolean,
        default: true
    },
    defaultKey: {
        type: Array,
        default: () => []
    },
    columns: {
        type: Array as PropType<any[]>,
        default: () => []
    }
});

const { getActiveInfo } = useFormData();

const activeCollapse = ref(props.defaultKey);

if (props.defaultExpandAll) {
    activeCollapse.value = props.columns.map((item: any) => item.name);
}
</script>

<style lang="scss" scoped>
.base-collapse {
    width: 100%;
    :deep(.el-collapse-item__wrap) {
        background-color: var(--el-fill-color-light);
        border-top: 1px solid var(--el-border-color);
        border-bottom: 1px solid var(--el-border-color);
        .el-collapse-item__content {
            padding-bottom: 0;
            padding-top: 10px;
        }
    }
}
</style>
