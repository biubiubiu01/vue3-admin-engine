<template>
    <div class="editor-header flex-row-center justify-between">
        <div class="editor-header-left flex-row-center">
            <div class="editor-header-logo"></div>
            <div class="editor-header-github ml20 flex-row-center" @click="handleToGitHub">
                <base-icon icon="svg-github" :size="20" class="mr5" />
                GitHub
            </div>
        </div>
        <div class="editor-header-right">
            <FullScreen />
            <Switch />
            <el-button-group style="margin: 0 12px" v-if="!preview">
                <el-tooltip effect="dark" content="撤销" placement="bottom">
                    <el-button :disabled="redoDisabled" @click="executeUndo">
                        <base-icon icon="svg-back" />
                    </el-button>
                </el-tooltip>
                <el-tooltip effect="dark" content="恢复" placement="bottom">
                    <el-button :disabled="undoDisabled" @click="executeRedo">
                        <base-icon icon="svg-next" />
                    </el-button>
                </el-tooltip>
            </el-button-group>

            <el-button @click="saveSession" v-if="!preview">保存到本地</el-button>
            <el-button @click="handleClearJson" v-if="!preview">重置页面</el-button>
            <el-button type="primary" @click="handleCreateJSON">查看JSON</el-button>
            <el-button type="primary" @click="handleOutputCode">出码</el-button>
            <el-button type="primary" @click="handlePreview">{{ preview ? "编辑" : "预览" }}</el-button>
        </div>

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

        <DialogExportCode ref="exportCodeRef" />
    </div>
</template>

<script lang="ts" setup>
import FullScreen from "./components/fullscreen.vue";
import Switch from "./components/switch.vue";
import DialogExportCode from "./components/dialog-export-code.vue";
import { useFormData } from "@/hooks/useFormData";
import { useGenerateCode } from "@/hooks/useGenerateCode";
import { useHistory } from "@/hooks/useHistory";
import { ElMessage } from "element-plus";
import { useClipboard } from "@vueuse/core";

const props = defineProps({
    preview: {
        type: Boolean,
        default: false
    }
});

const { copy } = useClipboard();
const drawerVisible = ref(false);
const jsonCode = ref("");
const exportCodeRef = ref();

const { getSchemaJson, saveSession, clearJson, setActive, updateSchema } = useFormData();
const { generateCode, outputFile } = useGenerateCode();
const { redoDisabled, undoDisabled, executeRedo, executeUndo, executeRecord } = useHistory();
const router = useRouter();

const handleCreateJSON = () => {
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

const handleOutputCode = () => {
    unref(exportCodeRef).showDialog();
};

const handleClearJson = () => {
    clearJson();
    executeRecord();
};

const handlePreview = () => {
    if (!props.preview) {
        setActive("");
        saveSession(false);
        router.push("/preview");
    } else {
        router.push("/");
    }
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
