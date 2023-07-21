<template>
    <form-item v-bind="$attrs">
        <el-checkbox-group v-model="value" v-bind="$attrs">
            <template v-if="shape === 'button'">
                <el-checkbox-button v-for="item in options" :key="item.value" :label="item.value">{{ item.label }}</el-checkbox-button>
            </template>
            <template v-else>
                <el-checkbox v-for="item in options" :key="item.value" :label="item.value">{{ item.label }}</el-checkbox>
            </template>
        </el-checkbox-group>
    </form-item>
</template>

<script lang="ts" setup>
import { useVModel } from "@vueuse/core";

const props = defineProps({
    modelValue: {
        type: Array,
        default: () => []
    },
    options: {
        type: Array as PropType<any[]>,
        default: () => []
    },
    defaultValue: {
        type: Array,
        default: () => []
    },
    shape: {
        type: String,
        default: ""
    }
});

const emit = defineEmits(["update:modelValue"]);

const value: any = useVModel(props, "modelValue", emit, { passive: true, defaultValue: props.defaultValue });
</script>
