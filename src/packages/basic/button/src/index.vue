<template>
    <el-button :type="buttonType" @click="handleClick" v-bind="$attrs">
        {{ buttonLabel }}
    </el-button>
</template>

<script lang="ts" setup>
const props = defineProps({
    buttonLabel: {
        type: String,
        default: "按钮"
    },
    buttonType: {
        type: String
    },
    actionType: {
        type: String
    }
});

const emit = defineEmits(["action", "click"]);

const handleClick = () => {
    if (props.actionType) {
        emit("action", props);
    } else {
        emit("click");
    }
};
</script>
