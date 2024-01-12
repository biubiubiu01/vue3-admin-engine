<template>
    <el-form :model="formModel" v-bind="getBindValue" :rules="getRules">
        <slot></slot>
    </el-form>
</template>

<script lang="ts" setup>
import { useFormRules } from "@/hooks/useFormRules";
import { PropType } from "vue";

const props = defineProps({
    labelSuffix: {
        type: Boolean
    },
    children: {
        type: Array as PropType<Component[]>,
        default: () => []
    },
    model: {
        type: String
    },
    modelValue: {
        type: Object
    }
});

const formModel = ref(props.modelValue || {});

const attrs = useAttrs();

const { getRules } = useFormRules(props.children);

const getBindValue = computed(() => {
    const newProps = { ...attrs };

    if (props.labelSuffix) {
        newProps["label-suffix"] = "：";
    }

    return newProps;
});
</script>

<style lang="scss" scoped></style>
