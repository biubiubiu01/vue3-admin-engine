<template>
    <el-link :type="linkType" v-bind="$attrs">
        {{ label }}
    </el-link>
</template>

<script lang="ts" setup>
const props = defineProps({
    label: {
        type: String,
        default: "文字链接"
    },
    linkType: {
        type: String
    }
});
</script>
