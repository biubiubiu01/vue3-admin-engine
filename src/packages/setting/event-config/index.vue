<template>
    <div class="method-container">
        <el-button class="w100" type="primary" size="default" plain icon="plus" @click="handleAddMethod">添加事件</el-button>
        <el-collapse v-model="activeCollapse">
            <el-collapse-item v-for="(item, index) in methodList" :key="item.event" :title="item.event" :name="item.event">
                <template #title>
                    <div class="flex-row-center w100">
                        {{ item.event }}
                        <div class="flex-auto tr mr15">
                            <base-icon icon="edit" class="mr10" :size="16" color="#409eff" @click.stop="handleEditMethod(index)" />
                            <base-icon icon="delete" :size="16" color="#f56c6c" @click.stop="handleDeleteMethod(index)" />
                        </div>
                    </div>
                </template>
                <code-editor v-model="item.eventCode" language="typescript" readOnly class="editor-border" />
            </el-collapse-item>
        </el-collapse>

        <el-dialog v-model="dialogVisible" :title="!isEmpty(editIndex) ? '修改事件' : '添加事件'" width="600px">
            <el-form ref="dialogFormRef" :rules="formRules" :model="dialogForm" label-width="120px" label-position="right">
                <form-item label="事件类型" model="event" :labelRemark="getEventRemark">
                    <el-select v-model="dialogForm.event" clearable class="w100" :disabled="!isEmpty(editIndex)" @change="changeEvent">
                        <el-option v-for="item in eventList" :key="item.event" :label="item.event" :value="item.event" :disabled="isChoose(item)" />
                    </el-select>
                </form-item>
                <el-form-item label="事件名" prop="eventName">
                    <el-input v-model="dialogForm.eventName" clearable />
                </el-form-item>
                <el-form-item label="参数" prop="params">
                    {{ dialogForm.params }}
                </el-form-item>
                <el-form-item label="事件代码" prop="eventCode">
                    <code-editor class="editor-border" v-model="dialogForm.eventCode" height="400px" language="typescript" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="tc">
                    <el-button type="primary" size="default" plain @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" size="default" @click="handleSave">保存</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { useWidgetList } from "@/hooks/useWidgetList";
import form from "@/packages/data/form";
import { deepClone, isEmpty } from "@/utils";
import { useVModel } from "@vueuse/core";

const props = defineProps({
    modelValue: {
        type: [String, Array],
        default: () => []
    },
    data: {
        type: Object as PropType<any>
    },
    preview: {
        type: Boolean
    }
});

const validateEventName = (rule: any, value: any, callback: any) => {
    if (!value) {
        callback(new Error("请输入事件名"));
    } else {
        const findItem = methodList.value.find((item: any) => item.eventName === value && dialogForm.event !== item.event);
        if (findItem) {
            callback(new Error("事件名重复"));
        } else {
            callback();
        }
    }
};

const formRules = {
    event: { required: true, message: "请选择事件类型", trigger: ["blur", "change"] },
    eventName: { required: true, validator: validateEventName, trigger: ["blur", "change"] }
};

const emit = defineEmits(["update:modelValue"]);

const methodList: any = useVModel(props, "modelValue", emit, { passive: true });

const { getComponentConfig } = useWidgetList();

const dialogVisible = ref(false);

const dialogFormRef = ref();

const activeCollapse = ref([]);

const dialogForm = reactive<any>({});

const editIndex = ref();

const getEventRemark = computed(() => {
    if (!dialogForm.event) return null;
    const findItem = eventList.value.find((item: any) => item.event === dialogForm.event);

    return {
        icon: "QuestionFilled",
        trigger: "hover",
        placement: "top",
        title: "时间说明",
        content: findItem?.description || ""
    };
});

const eventList = computed(() => getComponentConfig(props.data.type).events);

const handleAddMethod = () => {
    editIndex.value = null;
    dialogVisible.value = true;
    nextTick(() => {
        dialogFormRef.value.resetFields();
    });
};

const handleEditMethod = (index: number) => {
    editIndex.value = index;
    dialogVisible.value = true;
    nextTick(() => {
        Object.assign(dialogForm, deepClone(methodList.value[index]));
    });
};

const handleDeleteMethod = (index: number) => {
    methodList.value.splice(index, 1);
};

const changeEvent = (val: string) => {
    const current = eventList.value.find((item: any) => item.event === val);
    dialogForm.params = current?.params || "";
};

const isChoose = ({ event }: { event: string }) => {
    return !!methodList.value.find((item: any) => item.event === event);
};

const handleSave = async () => {
    dialogFormRef.value.validate();
    await dialogFormRef.value.validate();

    if (isEmpty(editIndex.value)) {
        methodList.value.push({
            ...dialogForm
        });
    } else {
        methodList.value[editIndex.value] = deepClone(dialogForm);
    }

    dialogVisible.value = false;
};
</script>

<style lang="scss" scoped>
.method-container {
    box-sizing: border-box;
    padding: 12px;
    width: 100%;
}
.editor-border {
    border: 1px solid var(--el-border-color);
}
</style>
