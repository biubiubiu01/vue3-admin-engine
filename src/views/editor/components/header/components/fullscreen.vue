<template>
    <el-button @click="toggleFullScreen">
        <base-icon :svg-name="isFullscreen ? 'fullOutScreen' : 'fullScreen'" class="pointer" :size="18" />
    </el-button>
</template>

<script lang="ts" setup>
import { useFullscreen } from "@/hooks/useFullscreen";

const { toggle: toggleFullScreen, isFullscreen } = useFullscreen();
</script>

<style scoped></style>
