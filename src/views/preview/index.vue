<template>
    <form-designer :json="getSchemaJson" />
</template>

<script lang="ts" setup>
import formDesigner from "./form-designer.vue";
import { useFormData } from "@/hooks/useFormData";

const { getSchemaJson } = useFormData();
</script>

<style scoped></style>
