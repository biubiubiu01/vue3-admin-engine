<template>
    <el-dialog v-model="dialogVisible" title="接口配置" width="800px">
        <el-form ref="dialogFormRef" :rules="formRules" :model="dialogForm" label-position="right" size="default" label-width="150px">
            <el-form-item label="发送方式" model="method">
                <el-radio-group v-model="dialogForm.method" size="default">
                    <el-radio-button v-for="item in httpOption" :key="item.value" :label="item.value">{{ item.label }}</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="接口地址" prop="url" size="default">
                <el-input v-model="dialogForm.url" placeholder="请输入接口地址" clearable></el-input>
            </el-form-item>
            <el-form-item label="接口参数" size="default">
                <code-editor v-model="dialogForm.params" language="json" height="200px" class="editor-border" />
            </el-form-item>
            <el-form-item label="请求头" size="default">
                <div>
                    <div class="flex-row-center header-item" v-for="(item, index) in dialogForm.headerList" :key="index">
                        <el-input v-model="item.key" clearable size="default" placeholder="Key" />
                        <el-input v-model="item.value" clearable size="default" class="ml10" placeholder="Value" />
                        <base-icon icon="close" class="ml10 pointer icon" :size="16" @click="handleDelHeader(index)" />
                    </div>
                    <el-button type="primary" size="small" icon="plus" class="mt5" @click="handleAddHeader">新增</el-button>
                </div>
            </el-form-item>
            <el-form-item label="结果值" size="default">
                <el-input v-model="dialogForm.resultField" placeholder="请输入" clearable></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="tc">
                <el-button type="primary" size="default" plain @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" size="default" @click="handleSave">保存</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { useVModel } from "@vueuse/core";
import { httpOption } from "@/constant/http";
import { deepClone } from "@/utils";

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    params: {
        type: Object,
        default: () => {}
    }
});

const emit = defineEmits(["update:modelValue", "save"]);

const formRules = readonly({
    url: [{ required: true, message: "请输入", trigger: ["blur", "change"] }]
});

const dialogVisible: Ref<boolean> = useVModel(props, "modelValue", emit, { passive: true });

const dialogForm = reactive<any>({
    method: "get",
    url: "",
    params: "",
    headerList: [{}],
    resultField: "data"
});

const handleAddHeader = () => {
    dialogForm.headerList.push({});
};

const handleDelHeader = (index: number) => {
    dialogForm.headerList.splice(index, 1);
};

const handleSave = () => {
    const params = deepClone(dialogForm);
    params.headerList = params.headerList.filter((item: any) => item.key && item.value);
    dialogVisible.value = false;
    emit("save", params);
};

watch(
    () => props.params,
    () => {
        Object.assign(
            dialogForm,
            props.params || {
                method: "get",
                url: "",
                params: "",
                headerList: [{}],
                resultField: "data"
            }
        );
    },
    {
        deep: true,
        immediate: true
    }
);
</script>

<style lang="scss" scoped>
.editor-border {
    border: 1px solid var(--el-border-color);
}
.header-item + .header-item {
    margin-top: 5px;
}
</style>
