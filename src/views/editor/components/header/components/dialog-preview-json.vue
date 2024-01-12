<template>
    <el-drawer class="drawer-code" v-model="drawerVisible" title="查看JSON(可在线修改)" direction="rtl" size="540px">
        <code-editor v-model="jsonCode" language="json" height="100%" />
        <template #footer>
            <div class="tc">
                <el-button type="primary" @click="handleSaveJson">保存</el-button>
                <el-button type="primary" @click="handleCopyJson">复制JSON</el-button>
                <el-button type="primary" @click="handleExportJson">导出JSON</el-button>
            </div>
        </template>
    </el-drawer>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { useGenerateCode } from "@/hooks/useGenerateCode";
import { useFormData } from "@/hooks/useFormData";
import { useClipboard } from "@vueuse/core";

const { outputFile } = useGenerateCode();
const { getSchemaJson, updateSchema } = useFormData();

const drawerVisible = ref(false);
const jsonCode = ref("");
const { copy } = useClipboard();

const showDialog = () => {
    drawerVisible.value = true;
    jsonCode.value = JSON.stringify(getSchemaJson.value);
};

const handleSaveJson = () => {
    try {
        const schema = JSON.parse(jsonCode.value);
        updateSchema(schema);
        drawerVisible.value = false;
    } catch {
        ElMessage.error("json格式化错误");
    }
};

const handleCopyJson = async () => {
    await copy(jsonCode.value);
    ElMessage.success("复制json成功");
};

const handleExportJson = () => {
    outputFile(jsonCode.value, "schema.json");
};

const hideDialog = () => {
    drawerVisible.value = false;
};

defineExpose({
    showDialog,
    hideDialog
});
</script>

<style scoped></style>
