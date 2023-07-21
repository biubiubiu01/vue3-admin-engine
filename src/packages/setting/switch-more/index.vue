<template>
    <form-item v-bind="$attrs">
        <div class="flex-center justify-between w100">
            <el-switch v-model="value" v-bind="$attrs" />
            <!-- <el-tooltip content="编辑详情" placement="bottom" v-if="formType === 'dialog' && value">
                <base-icon icon="editPen" :size="16" class="pointer switch-icon" @click="dialogVisible = true" />
            </el-tooltip> -->
        </div>
        <!-- <render-item v-if="formType" v-model:visible="dialogVisible" :element="{ type: formType, label: $attrs.label, appendToBody: true }" /> -->
    </form-item>
</template>

<script lang="ts" setup>
import { useVModel } from "@vueuse/core";

const props = defineProps({
    modelValue: {
        type: [Number, String, Boolean]
    },
    defaultValue: {
        type: [Number, String, Boolean]
    }
    // formType: {
    //     type: String
    // },
    // form: {
    //     type: Object
    // }
});

const emit = defineEmits(["update:modelValue"]);

const dialogVisible = ref(false);

const value: any = useVModel(props, "modelValue", emit, { passive: true, defaultValue: props.defaultValue });
</script>

<style lang="scss" scoped>
.switch-icon {
    color: var(--el-text-color-regular);
    &:hover {
        color: var(--el-color-primary);
    }
}
</style>
