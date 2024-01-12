<template>
    <el-date-picker v-model="value" :type="dateType" v-bind="$attrs" />
</template>

<script lang="ts" setup>
import { useVModel } from "@vueuse/core";

const props = defineProps({
    modelValue: {
        type: [Date, String, Number, Array]
    },
    defaultValue: {
        type: [String, Number],
        default: ""
    },
    dateType: {
        type: String,
        default: "date"
    }
});

const emit = defineEmits(["update:modelValue"]);

const value: Ref<any> = useVModel(props, "modelValue", emit, { passive: true, defaultValue: props.defaultValue });
</script>

<style scoped></style>
