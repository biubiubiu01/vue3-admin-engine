<template>
    <el-form-item :prop="model" :label="label" :class="[{ 'no-label': !label }]" :style="style" :size="size">
        <template #label="{ label }">
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
import { isObject } from "@/utils/is";
import { omit } from "@/utils";

const props = defineProps({
    label: {
        type: String,
        default: ""
    },
    model: {
        type: String
    },
    labelRemark: {
        type: Object,
        default: () => {}
    },
    style: {
        type: [String, Object, Array]
    },
    size: String
});

const getLabelRemark = computed(() => {
    const { labelRemark } = props;
    if (isObject(labelRemark)) {
        return labelRemark;
    }
    return {};
});

const getBindValue = computed(() => {
    return { ...omit(getLabelRemark.value, "icon") };
});
</script>

<style lang="scss">
.el-form-item.no-label {
    .el-form-item__label {
        display: none;
    }
}
</style>
