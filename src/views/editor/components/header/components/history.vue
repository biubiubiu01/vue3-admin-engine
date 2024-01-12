<template>
    <el-button-group style="margin: 0 12px">
        <el-tooltip effect="dark" content="撤销" placement="bottom">
            <el-button :disabled="redoDisabled" @click="executeUndo">
                <base-icon icon="svg-back" />
            </el-button>
        </el-tooltip>
        <el-tooltip effect="dark" content="恢复" placement="bottom">
            <el-button :disabled="undoDisabled" @click="executeRedo">
                <base-icon icon="svg-next" />
            </el-button>
        </el-tooltip>
    </el-button-group>
</template>

<script lang="ts" setup>
import { useHistory } from "@/hooks/useHistory";

const { redoDisabled, undoDisabled, executeRedo, executeUndo } = useHistory();
</script>

<style lang="scss" scoped></style>
