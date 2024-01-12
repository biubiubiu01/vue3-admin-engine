<template>
    <el-button @click="toggle">
        <base-icon :svg-name="isFullscreen ? 'fullOutScreen' : 'fullScreen'" class="pointer" :size="18" />
    </el-button>
</template>

<script lang="ts" setup>
import { useFullscreen } from "@/hooks/useGlobalStatus";

const [isFullscreen, toggle] = useFullscreen();
</script>

<style scoped></style>
