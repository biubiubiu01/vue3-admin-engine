<template>
    <div>
        <draggable :list="list" :animation="100" item-key="index" :forceFallback="true" handle=".move">
            <template #item="{ element, index }">
                <div class="flex-row-center">
                    <base-icon icon="EditPen" class="mr5 pointer icon" :size="16" @click="handleEditRow(element)" />
                    <div class="group-item">
                        <el-input v-model="element.fieldDesc" clearable />
                    </div>
                    <div class="group-item">
                        <el-select v-model="element.fieldType">
                            <el-option v-for="item in columnOption" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </div>
                    <div class="group-item flex-row-center justify-end" style="width: 70px">
                        <base-icon icon="delete" class="mr5 pointer icon" :size="16" @click="handleDeleteRow(index)" />
                        <base-icon icon="rank" class="move pointer icon" :size="16" />
                    </div>
                </div>
            </template>
        </draggable>
        <el-space :size="4" @click="handleAddRow" class="action pointer mt5"> 添加一项<base-icon icon="plus" /> </el-space>
        <DialogColumnSetting ref="dialogColumnSettingRef" @save="dialogColumnSave" />
        <DialogColumnItemSetting ref="dialogColumnItemSettingRef" />
    </div>
</template>

<script lang="ts" setup>
import draggable from "vuedraggable";
import { useVModel } from "@vueuse/core";
import { columnOption } from "@/constant/column";
import DialogColumnSetting from "./dialogColumnSetting.vue";
import DialogColumnItemSetting from "./dialogColumnItemSetting.vue";

const props = defineProps({
    modelValue: {
        type: Array,
        default: () => []
    }
});

const emit = defineEmits(["update:modelValue"]);

const list: any = useVModel(props, "modelValue", emit, { passive: true });

const dialogColumnSettingRef = ref();
const dialogColumnItemSettingRef = ref();

const handleDeleteRow = (index: number) => {
    list.value.splice(index, 1);
};

const handleEditRow = (element: any) => {
    dialogColumnItemSettingRef.value.showDialog(element);
};

const handleAddRow = () => {
    dialogColumnSettingRef.value.showDialog(list.value);
};

const dialogColumnSave = (val: any[]) => {
    list.value = val;
    dialogColumnSettingRef.value.hideDialog();
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
    font-weight: bold;
}
</style>
