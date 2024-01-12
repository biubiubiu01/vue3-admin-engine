<template>
    <div>{{ title }}</div>
</template>

<script lang="ts" setup>
const props = defineProps({
    title: {
        type: String,
        default: ""
    }
});
</script>

<style lang="scss" scoped></style>
