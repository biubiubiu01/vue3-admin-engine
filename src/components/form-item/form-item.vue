<template>
    <el-form-item :prop="name">
        <template #label>
            <div class="flex-row-center">
                {{ label }}
                <el-popover v-bind="getBindValue" v-if="labelRemark">
                    <template #reference>
                        <base-icon :icon="getLabelRemark.icon" class="ml5 pointer" />
                    </template>
                </el-popover>
            </div>
        </template>
        <slot></slot>
    </el-form-item>
</template>

<script lang="ts" setup>
import { isString, isObject } from "@/utils/is";
import { omit } from "@/utils";

const props = defineProps({
    label: {
        type: String,
        default: ""
    },
    name: {
        type: String
    },
    labelRemark: {
        type: [Boolean, Object],
        default: false
    }
});

const defaultRemark = readonly({
    icon: "InfoFilled",
    trigger: "hover",
    placement: "top",
    title: "",
    content: ""
});

const getLabelRemark = computed(() => {
    const { labelRemark } = props;
    if (isObject(labelRemark)) {
        return Object.assign({}, defaultRemark, { ...labelRemark });
    }
    return defaultRemark;
});

const getBindValue = computed(() => {
    return { ...omit(getLabelRemark.value, "icon") };
});
</script>

<style scoped></style>
