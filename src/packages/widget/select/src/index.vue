<template>
    <el-select v-model="selectValue" v-bind="$attrs" :multiple="multiple" :key="multiple">
        <el-option v-for="item in filterOptions" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
</template>

<script lang="ts" setup>
import { useVModel } from "@vueuse/core";
import { isEmpty } from "@/utils";

const props = defineProps({
    options: {
        type: Array as PropType<any[]>,
        default: () => []
    },
    modelValue: {
        type: [Array, Object, String, Number]
    },
    defaultValue: {
        type: [Array, Object, String, Number],
        default: ""
    },
    multiple: Boolean
});

const emit = defineEmits(["update:modelValue"]);

const filterOptions = computed(() => {
    return props.options.filter((item) => !isEmpty(item.value));
});

const selectValue = useVModel(props, "modelValue", emit, { defaultValue: props.defaultValue });
</script>

<style scoped></style>
