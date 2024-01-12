<template>
    <div class="editor-header flex-row-center justify-between">
        <div class="editor-header-left flex-row-center">
            <div class="header-logo"></div>

            <div class="editor-header-github ml20 flex-row-center" @click="handleToGitHub">
                <base-icon icon="svg-github" :size="20" class="mr5" />
                GitHub
            </div>
        </div>
        <div class="editor-header-right">
            <FullScreen />
            <Switch />
            <History v-if="!isPreview" />
            <el-button @click="saveSession" v-if="!isPreview">保存到本地</el-button>
            <el-button @click="handleClearJson" v-if="!isPreview">重置页面</el-button>
            <el-button type="primary" @click="handleSetStyle" v-if="!isPreview">设置页面样式</el-button>
            <el-button type="primary" @click="handleCreateJSON">查看JSON</el-button>
            <el-button type="primary" @click="handleOutputCode">出码</el-button>
            <el-button type="primary" @click="handlePreview">{{ isPreview ? "编辑" : "预览" }}</el-button>
        </div>
        <DialogPreviewJson ref="previewJsonRef" />
        <DialogExportCode ref="exportCodeRef" />
        <DialogSetStyle ref="setStyleRef" />
    </div>
</template>

<script lang="ts" setup>
import { useFormData } from "@/hooks/useFormData";
import { useHistory } from "@/hooks/useHistory";
import { usePreview } from "@/hooks/useGlobalStatus";
import FullScreen from "./components/fullscreen.vue";
import Switch from "./components/switch.vue";
import History from "./components/history.vue";
import DialogPreviewJson from "./components/dialog-preview-json.vue";
import DialogExportCode from "./components/dialog-export-code.vue";
import DialogSetStyle from "./components/dialog-set-style.vue";

const exportCodeRef = ref();
const setStyleRef = ref();
const previewJsonRef = ref();

const { saveSession, clearJson, setActive } = useFormData();
const [isPreview, togglePreview] = usePreview();
const { executeRecord } = useHistory();

const handleCreateJSON = () => {
    unref(previewJsonRef).showDialog();
};

const handleSetStyle = () => {
    unref(setStyleRef).showDialog();
};

const handleOutputCode = () => {
    unref(exportCodeRef).showDialog();
};

const handleClearJson = () => {
    clearJson();
    executeRecord();
};

const handlePreview = () => {
    if (unref(isPreview)) {
        setActive("");
        saveSession(false);
    }
    togglePreview();
};

const handleToGitHub = () => {
    window.open("https://github.com/biubiubiu01/vue3-admin-engine");
};
</script>

<style lang="scss">
.drawer-code {
    .el-drawer__header {
        margin-bottom: 18px;
    }
    .el-drawer__body {
        padding-top: 10px;
    }
}
</style>
