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
        highlight-current
        :current-node-key="getActiveId"
        draggable
        :expand-on-click-node="false"
        :filter-node-method="filterNode"
        :allow-drop="allowDrop"
        @node-click="handleClickItem"
    >
    </ElTree>
</template>

<script lang="ts" setup>
import { useFormData } from "@/hooks/useFormData";
import { ElTree } from "element-plus";

interface Tree {
    [key: string]: any;
}

const { getSchemaJson, getActiveId, setActive } = useFormData();

const filterText = ref("");

const treeRef = ref<InstanceType<typeof ElTree>>();

const filterNode = (value: string, data: Tree) => {
    if (!value) return true;
    return data.title.includes(value);
};

const allowDrop = (moveNode: Tree, inNode: Tree, type: string) => {
    if (moveNode.data.label === "col容器") return false;
    if (moveNode.level === 1 && inNode.level === 1 && type !== "inner") return true;
    if (moveNode.level > 1 && inNode.level >= 1 && type === "inner") return false;
    if (moveNode.level === 1 && (moveNode.data?.children?.length || inNode.data.type !== "wrapper")) return false;

    return true;
};

const handleClickItem = (node: Tree) => {
    setActive(node.id);
};

watch(filterText, (val) => {
    treeRef.value!.filter(val);
});
</script>

<style lang="scss" scoped>
.page-tree-input {
    margin: 0 18px;
}
</style>
