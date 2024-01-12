<template>
    <el-input-number v-model="value" v-bind="$attrs" class="input-number" />
</template>

<script lang="ts" setup>
import { useVModel } from "@vueuse/core";

const props = defineProps({
    modelValue: {
        type: Number
    },
    defaultValue: {
        type: Number
    }
});

const emit = defineEmits(["update:modelValue"]);

const value: Ref<number | undefined> = useVModel(props, "modelValue", emit, { passive: true, defaultValue: props.defaultValue });
</script>

<style lang="scss" scoped>
.input-number {
    width: 100%;
}
</style>
