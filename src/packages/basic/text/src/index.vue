<template>
    <el-text :type="textType" v-bind="$attrs">
        <base-icon :icon="icon" style="margin-right: 3px" />
        {{ textLabel }}
    </el-text>
</template>

<script lang="ts" setup>
const props = defineProps({
    textLabel: {
        type: String,
        default: "文字链接"
    },
    textType: {
        type: String
    },
    icon: {
        type: String
    }
});
</script>
