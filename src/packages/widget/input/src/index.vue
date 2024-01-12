<template>
    <el-input v-model="value" v-bind="$attrs" />
</template>

<script lang="ts" setup>
import { useVModel } from "@vueuse/core";

const props = defineProps({
    modelValue: {
        type: [String, Number]
    },
    defaultValue: {
        type: [String, Number],
        default: ""
    }
});

const emit = defineEmits(["update:modelValue"]);

const value: Ref<string | number | undefined> = useVModel(props, "modelValue", emit, { passive: true, defaultValue: props.defaultValue });
</script>
