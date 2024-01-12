<template>
    <el-switch v-model="value" v-bind="$attrs" />
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
});

const emit = defineEmits(["update:modelValue"]);

const value: Ref<number | string | boolean | undefined> = useVModel(props, "modelValue", emit, { passive: true, defaultValue: props.defaultValue });
</script>
