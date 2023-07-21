<template>
    <div>
        <draggable :list="list" :animation="100" item-key="index" :forceFallback="true" handle=".move">
            <template #item="{ element, index }">
                <div class="flex-row-center">
                    <div class="group-item">
                        <el-input v-model="element.label" />
                    </div>
                    <div class="group-item">
                        <el-input v-model="element.value" />
                    </div>
                    <div class="group-item flex-row-center justify-end" style="width: 70px">
                        <base-icon icon="delete" class="mr5 pointer icon icon-delete" :size="16" @click="handleDeleteRow(index)" />
                        <base-icon icon="rank" class="move pointer icon" :size="16" />
                    </div>
                </div>
            </template>
        </draggable>
        <el-space :size="4" @click="handleAddRow" class="action pointer mt5"> 添加一项<base-icon icon="plus" /> </el-space>
    </div>
</template>

<script lang="ts" setup>
import draggable from "vuedraggable";
import { useVModel } from "@vueuse/core";

const props = defineProps({
    modelValue: {
        type: Array,
        default: () => []
    }
});

const emit = defineEmits(["update:modelValue"]);

const list: any = useVModel(props, "modelValue", emit, { passive: true });

const handleAddRow = () => {
    list.value.push({});
};

const handleDeleteRow = (index: number) => {
    list.value.splice(index, 1);
};
</script>

<style lang="scss" scoped>
.group-item {
    box-sizing: border-box;
    padding: 2px;
}
.action {
    color: var(--el-color-primary);
}
.icon {
    color: var(--el-color-primary);
    font-weight: bold;
    &.icon-delete {
        color: var(--el-color-danger);
    }
}
</style>
