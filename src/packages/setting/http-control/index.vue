<template>
    <el-form-item label="接口">
        <el-button icon="setting" @click="handleShowHttpDialog"></el-button>
        <http-dialog v-model="dialogVisible" :params="httpConfig" @save="handleSave" />
    </el-form-item>
</template>

<script lang="ts" setup>
import { useVModel } from "@vueuse/core";
const props = defineProps({
    modelValue: {
        type: Object,
        default: () => {}
    }
});

const emit = defineEmits(["update:modelValue"]);

const httpConfig: Ref<object> = useVModel(props, "modelValue", emit, { passive: true });

const dialogVisible = ref(false);

const handleShowHttpDialog = () => {
    dialogVisible.value = true;
};

const handleSave = (form: object) => {
    httpConfig.value = form;
};
</script>

<style lang="scss" scoped></style>
