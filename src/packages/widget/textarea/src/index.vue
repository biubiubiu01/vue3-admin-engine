<template>
    <el-input v-model="value" v-bind="$attrs" type="textarea" />
</template>

<script lang="ts" setup>
import { useVModel } from "@vueuse/core";

const props = defineProps({
    modelValue: {
        type: [String, Number]
    },
    defaultValue: {
        type: [Number, String]
    }
});

const emit = defineEmits(["update:modelValue"]);

const value: any = useVModel(props, "modelValue", emit, { passive: true, defaultValue: props.defaultValue });
</script>
