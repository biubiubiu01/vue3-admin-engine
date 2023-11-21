<template>
    <div class="all-container form-widget-container">
        <el-scrollbar view-class="h100">
            <el-form class="h100" :rules="getRules" :model="formModel">
                <drag-group :list="getSchemaJson" :preview="preview" />
            </el-form>
        </el-scrollbar>
    </div>
</template>

<script lang="ts" setup>
import { useFormData } from "@/hooks/useFormData";
import { useFormRules } from "@/hooks/useFormRules";

const props = defineProps({
    preview: {
        type: Boolean,
        default: false
    }
});
const formModel = ref({});

const { getSchemaJson } = useFormData();

const { getRules } = useFormRules(getSchemaJson.value);
</script>

<style lang="scss" scoped></style>
