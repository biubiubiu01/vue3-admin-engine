<template>
    <el-drawer v-model="dialogVisible" :title="dialogTitle" width="300px" direction="rtl" class="drawer-container">
        <el-form :model="formData" label-width="100px" :rules="formRules" label-position="right" size="default">
            <el-form-item label="标题" prop="fieldDesc">
                <el-input v-model="formData.fieldDesc" clearable />
            </el-form-item>
            <el-form-item label="绑定字段" prop="fieldName">
                <el-input v-model="formData.fieldName" clearable />
            </el-form-item>
            <el-form-item label="字段类型" prop="fieldType">
                <el-select v-model="formData.fieldType" @change="changeFieldType">
                    <el-option v-for="item in columnOption" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="字段宽度">
                <el-input v-model="formData.columnWidth" />
            </el-form-item>
            <el-form-item label="对齐方式">
                <el-radio-group v-model="formData.align">
                    <el-radio v-for="item in tablePositionOption" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="固定列">
                <el-radio-group v-model="formData.fixed">
                    <el-radio v-for="item in tableFixedOption" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="列排序">
                <el-switch v-model="formData.sortable" />
            </el-form-item>
            <template v-if="formData.fieldType === 'operate'">
                <el-table :data="formData.columns" size="default">
                    <el-table-column label="按钮名称" prop="label" align="center">
                        <template #default="{ row }">
                            <el-input v-model="row.label" clearable size="default" />
                        </template>
                    </el-table-column>
                    <el-table-column label="按钮类型" prop="type" align="center">
                        <template #default="{ row }">
                            <el-select v-model="row.type" size="default" clearable>
                                <el-option v-for="item in typeOption" :key="item.value" :label="item.label" :value="item.value" />
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="60">
                        <template #default="scope">
                            <div class="tc">
                                <base-icon icon="delete" class="pointer" color="#2468f2" :size="18" @click="handleDelete(scope.$index)" />
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary" size="default" @click="handleAdd(formData.columns?.length || 0)" icon="plus" class="ml10 mt10">新增一行</el-button>
            </template>
        </el-form>
    </el-drawer>
</template>

<script lang="ts" setup>
import { columnOption } from "@/constant/column";
import { tablePositionOption, tableFixedOption } from "@/constant/position";
import { typeOption } from "@/constant/type";

const emit = defineEmits(["save"]);

const dialogVisible = ref(false);

const formData = ref<any>({});
const formRules = readonly({});

const dialogTitle = computed(() => `字段${formData.value.fieldDesc}配置`);

const showDialog = (data: any) => {
    dialogVisible.value = true;
    formData.value = data;
};

const changeFieldType = () => {
    formData.value.columns = [];
};

const handleAdd = (index: number) => {
    if (!formData.value.columns) {
        formData.value.columns = [];
    }
    formData.value.columns.splice(index + 1, 0, {});
};

const handleDelete = (index: number) => {
    formData.value.columns.splice(index, 1);
};

defineExpose({
    showDialog
});
</script>

<style lang="scss">
.drawer-container {
    .el-drawer__header {
        margin-bottom: 10px;
    }
}
</style>
