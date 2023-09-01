<template>
    <el-popover placement="top-start" title="样式源码" :width="500" trigger="click" @show="handleShow">
        <template #reference>
            <el-button class="w100" size="default"> <base-icon icon="edit" class="mr5" />编辑样式源码 </el-button>
        </template>
        <code-editor v-model="code" height="400px" />
    </el-popover>
</template>

<script lang="ts" setup>
import { useVModel } from "@vueuse/core";
import { transformStyle } from "@/utils";

const props = defineProps({
    modelValue: {
        type: String,
        default: `#main{\r\n  \r\n}`
    },
    data: {
        type: Object
    }
});

const emit = defineEmits(["update:modelValue"]);

const code: Ref<string> = useVModel(props, "modelValue", emit, { passive: true });

const handleShow = () => {
    const styleObj = transformStyle(props.data);

    const styleCode = Object.entries(styleObj)
        .map((x) => x.join(":") + ";")
        .join("");

    code.value = `#main{\r\n ${styleCode} \r\n}`;
};
</script>

<style lang="scss" scoped></style>
