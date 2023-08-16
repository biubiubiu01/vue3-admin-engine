<template>
    <base-icon :icon="icon" :size="size" :color="color" :hover="hover" />
</template>

<script lang="ts" setup>
const props = defineProps({
    icon: {
        type: String
    },
    size: {
        type: Number
    },
    color: {
        type: String
    },
    hover: {
        type: Boolean,
        default: false
    }
});
</script>
