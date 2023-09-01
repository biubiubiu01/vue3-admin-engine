<template>
    <el-container class="editor-container all-container">
        <el-header height="48px">
            <Header :preview="preview" />
        </el-header>
        <el-container class="main-container">
            <el-aside width="300px" v-if="!preview">
                <WidgetPanel />
            </el-aside>
            <el-main>
                <FormWidget :preview="preview" />
            </el-main>
            <el-aside width="300px" v-if="!preview">
                <SettingPanel />
            </el-aside>
        </el-container>
    </el-container>
</template>

<script lang="ts" setup>
import Header from "./components/header/index.vue";
import WidgetPanel from "./components/widget-panel/index.vue";
import FormWidget from "./components/form-widget/index.vue";
import SettingPanel from "./components/setting-panel/index.vue";

const props = defineProps({
    preview: {
        type: Boolean,
        default: false
    }
});
</script>

<style lang="scss">
@use "./editor.scss";
</style>
