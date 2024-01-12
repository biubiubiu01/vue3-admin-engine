<template>
    <el-collapse v-model="collapseList" :accordion="accordion">
        <slot></slot>
    </el-collapse>
</template>

<script lang="ts" setup>
const props = defineProps({
    accordion: {
        type: Boolean,
        default: false
    },
    defaultExpandAll: {
        type: Boolean,
        default: true
    },
    children: {
        type: Array as PropType<Component[]>,
        default: () => []
    }
});

const collapseList: Ref<string[]> = ref([]);

watch(
    () => props.children,
    () => {
        if (props.defaultExpandAll) {
            collapseList.value = props.children.map((item) => item.model as string);
        }
    },
    {
        deep: true,
        immediate: true
    }
);
</script>

<style lang="scss" scoped></style>
