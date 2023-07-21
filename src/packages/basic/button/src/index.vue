<template>
    <el-button :type="buttonType" v-bind="$attrs" @click="handleClick">
        {{ label }}
    </el-button>
</template>

<script lang="ts" setup>
const props = defineProps({
    label: {
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
