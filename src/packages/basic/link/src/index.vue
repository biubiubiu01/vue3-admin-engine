<template>
    <el-link :type="linkType" v-bind="$attrs">
        {{ linkLabel }}
    </el-link>
</template>

<script lang="ts" setup>
const props = defineProps({
    linkLabel: {
        type: String,
        default: "文字链接"
    },
    linkType: {
        type: String
    }
});
</script>
