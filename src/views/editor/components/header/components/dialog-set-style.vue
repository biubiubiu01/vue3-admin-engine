<template>
    <el-dialog v-model="dialogVisible" title="编辑全局样式(支持scss)" width="65%">
        <code-editor v-model="styleCode" lineNumbers="on" height="475px" language="scss" />
        <template #footer>
            <div class="tc">
                <el-button type="primary" @click="handleSave">保存</el-button>
                <el-button type="primary" plain @click="hideDialog">取消</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { useGlobalStyle } from "@/hooks/useGlobalStyle";

const { getStyle, setStyle } = useGlobalStyle();

const dialogVisible = ref(false);

const styleCode = ref<any>({});

const showDialog = () => {
    styleCode.value = unref(getStyle);
    dialogVisible.value = true;
};

const hideDialog = () => {
    dialogVisible.value = false;
};

const handleSave = () => {
    setStyle(styleCode.value);
    hideDialog();
};

defineExpose({
    showDialog,
    hideDialog
});
</script>

<style scoped></style>
