<template>
    <div class="all-container form-widget-container">
        <el-scrollbar view-class="h100">
            <el-form class="h100" :rules="getRules" :model="getActiveInfo">
                <drag-group :list="getSchemaJson" />
            </el-form>
        </el-scrollbar>
    </div>
</template>

<script lang="ts" setup>
import { useFormData } from "@/hooks/useFormData";
import { useFormRules } from "@/hooks/useFormRules";

const { getActiveInfo, getSchemaJson } = useFormData();

const { getRules } = useFormRules(getSchemaJson.value);
</script>

<style scoped></style>
