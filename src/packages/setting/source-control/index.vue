<template>
    <el-popover placement="top-start" title="样式源码" :width="500" trigger="click" @show="handleShow" @hide="handleSave">
        <template #reference>
            <el-button class="w100" size="default"> <base-icon icon="edit" class="mr5" />编辑行内样式源码 </el-button>
        </template>
        <code-editor v-model="code" height="400px" />
    </el-popover>
    <div class="mask-container" v-if="visibleShow"></div>
</template>

<script lang="ts" setup>
import { useFormData } from "@/hooks/useFormData";
import { transformStringToStyle } from "@/utils";

const emit = defineEmits(["update:modelValue"]);

const code = ref("");
const visibleShow = ref(false);

const { getActiveInfo } = useFormData();

const handleShow = () => {
    visibleShow.value = true;
    const styleCode = Object.entries(getActiveInfo.value.style)
        .map((x) => x.join(":") + ";")
        .join("");
    code.value = `#main{\r\n ${styleCode} \r\n}`;
};

const handleSave = () => {
    const style = transformStringToStyle(code.value);

    getActiveInfo.value.style = style;
    setTimeout(() => {
        visibleShow.value = false;
    }, 200);
};
</script>

<style lang="scss" scoped>
.mask-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
}
</style>
