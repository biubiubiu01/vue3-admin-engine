<template>
    <div class="page-tree-input">
        <el-input v-model="filterText" placeholder="搜索节点" suffix-icon="search" />
    </div>
    <el-divider />
    <ElTree
        ref="treeRef"
        :data="getSchemaJson"
        default-expand-all
        node-key="id"
        :key="treeKey"
        highlight-current
        :current-node-key="getActiveId"
        :expand-on-click-node="false"
        :filter-node-method="filterNode"
        @node-click="handleClickItem"
    >
    </ElTree>
</template>

<script lang="ts" setup>
import { useFormData } from "@/hooks/useFormData";
import { useNanoid } from "@/hooks/useNanoid";
import { ElTree } from "element-plus";

interface Tree {
    [key: string]: any;
}

const { getSchemaJson, getActiveId, setActive } = useFormData();

const filterText = ref("");
const treeKey = ref(useNanoid());

const treeRef = ref<InstanceType<typeof ElTree>>();

const filterNode = (value: string, data: Tree) => {
    if (!value) return true;
    return data.title.includes(value);
};

const handleClickItem = (node: Tree) => {
    setActive(node.id);
};

watch(filterText, (val) => {
    treeRef.value!.filter(val);
});

watch(
    getSchemaJson,
    () => {
        treeKey.value = useNanoid();
    },
    {
        deep: true
    }
);
</script>

<style lang="scss" scoped>
.page-tree-input {
    margin: 0 18px;
}
</style>
