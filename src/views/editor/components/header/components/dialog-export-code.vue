<template>
    <el-dialog v-model="dialogVisible" title="导出代码预览" width="65%">
        <el-tabs v-model="activeTab" type="border-card" @tab-click="handleChangeTab">
            <el-tab-pane v-for="tab in tabList" :key="tab.value" :label="tab.label" :name="tab.value">
                <code-editor v-model="jsonCode[activeTab]" :autoFormat="false" lineNumbers="on" language="html" height="475px" />
            </el-tab-pane>
        </el-tabs>
        <template #footer>
            <div class="tc">
                <el-button type="primary" @click="handleCopyCode">复制代码</el-button>
                <el-button type="primary" @click="handleExportCode">导出代码（根据当前tab）</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { useFormData } from "@/hooks/useFormData";
import { useGenerateCode } from "@/hooks/useGenerateCode";
import { ElMessage } from "element-plus";
import { useClipboard } from "@vueuse/core";

const tabList = readonly([
    {
        label: "vue2",
        value: "vue2"
    },
    {
        label: "vue3",
        value: "vue3"
    },
    {
        label: "html",
        value: "html"
    }
]);

const dialogVisible = ref(false);
const activeTab = ref<TExportType>("vue2");

const jsonCode = ref<any>({});

const { copy } = useClipboard();
const { getSchemaJson } = useFormData();
const { generateCode, outputFile } = useGenerateCode();

const showDialog = () => {
    dialogVisible.value = true;
    jsonCode.value = {};
    getCode();
};

const getCode = () => {
    if (!unref(jsonCode)[activeTab.value]) {
        unref(jsonCode)[activeTab.value] = generateCode(getSchemaJson.value, activeTab.value);
    }
};

const handleCopyCode = async () => {
    await copy(jsonCode.value[unref(activeTab)]);
    ElMessage.success("复制代码成功");
};

const handleExportCode = () => {
    const fileName = activeTab.value === "html" ? "form.html" : "form.vue";
    outputFile(unref(jsonCode)[activeTab.value], fileName);
};

const handleChangeTab = () => {
    nextTick(() => {
        getCode();
    });
};

const hideDialog = () => {
    dialogVisible.value = false;
};

defineExpose({
    showDialog,
    hideDialog
});
</script>

<style scoped></style>
