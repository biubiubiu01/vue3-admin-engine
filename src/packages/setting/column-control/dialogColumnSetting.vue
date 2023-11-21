<template>
    <el-dialog v-model="dialogVisible" title="列配置" width="850px">
        <el-table class="dialogTable" :data="dialogList" size="default" stripe row-key="fieldName">
            <el-table-column label="标题" prop="fieldDesc" align="center">
                <template #default="{ row }">
                    <el-input v-model="row.fieldDesc" clearable size="default" />
                </template>
            </el-table-column>
            <el-table-column label="绑定字段" prop="fieldName" align="center">
                <template #default="{ row }">
                    <el-input v-model="row.fieldName" clearable size="default" />
                </template>
            </el-table-column>
            <el-table-column label="字段类型" prop="fieldType" align="center">
                <template #default="{ row }">
                    <el-select v-model="row.fieldType" size="default">
                        <el-option v-for="item in columnOption" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="字段宽度" prop="columnWidth" align="center">
                <template #default="{ row }">
                    <el-input v-model="row.columnWidth" size="default" />
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="150">
                <template #default="scope">
                    <base-icon icon="rank" class="pointer rank mr10" color="#2468f2" :size="18" />
                    <base-icon icon="plus" class="pointer mr10" color="#2468f2" :size="18" @click="handleDialogAdd(scope.$index)" />
                    <base-icon icon="minus" class="pointer" color="#2468f2" :size="18" @click="handleDialogDelete(scope.$index)" />
                </template>
            </el-table-column>
        </el-table>
        <el-button type="primary" size="default" @click="handleDialogAdd(dialogList.length)" icon="plus" class="ml10 mt10">新增一行</el-button>
        <template #footer>
            <div class="tc">
                <el-button type="primary" size="default" plain @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" size="default" @click="handleSave">保存</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { columnOption } from "@/constant/column";
import Sortable from "sortablejs";
import { deepClone } from "@/utils";
import { ElMessage } from "element-plus";

const emit = defineEmits(["save"]);

const dialogVisible = ref(false);
const isCreate = ref(false);

const dialogList = ref<any[]>([]);

const showDialog = (list: any[]) => {
    dialogVisible.value = true;
    nextTick(() => {
        dialogList.value = deepClone(list);
        if (!isCreate.value) {
            initTableSort();
        }
    });
};

const hideDialog = () => {
    dialogVisible.value = false;
};

const initTableSort = () => {
    const wrapperRow: HTMLElement | null = document.querySelector(".el-table.dialogTable .el-table__body-wrapper tbody");
    Sortable.create(wrapperRow as HTMLElement, {
        handle: ".rank",
        // @ts-ignore
        onEnd({ newIndex, oldIndex }: { newIndex: number; oldIndex: number }) {
            const currRow = dialogList.value.splice(oldIndex, 1)[0];
            dialogList.value.splice(newIndex, 0, currRow);
        }
    });
    isCreate.value = true;
};

const handleDialogAdd = (index: number) => {
    dialogList.value.splice(index + 1, 0, { fieldType: "text" });
};

const handleDialogDelete = (index: number) => {
    dialogList.value.splice(index, 1);
};

const handleSave = () => {
    const flag = unref(dialogList).every((item) => {
        if (!item.fieldDesc) {
            ElMessage.warning("字段【标题】不能为空");
            return false;
        }
        if (!item.fieldName) {
            ElMessage.warning("字段【绑定字段】不能为空");
            return false;
        }
        if (!item.fieldType) {
            ElMessage.warning("字段【字段类型】不能为空");
            return false;
        }
        return true;
    });
    if (flag) {
        emit("save", dialogList.value);
    }
};

defineExpose({
    showDialog,
    hideDialog
});
</script>

<style scoped></style>
