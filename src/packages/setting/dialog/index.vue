<template>
    <el-dialog v-model="dialogVisible" v-bind="getPropsValue" class="base-dialog" :before-close="hideDialog">
        <template #header="{ close }">
            <div class="base-dialog-header" v-if="showHeader">
                <span> {{ label }}</span>
                <el-space :size="14" class="base-header-icon">
                    <base-icon v-if="showFullscreen" :svg-name="fullscreen ? 'fullOutScreen' : 'fullScreen'" @click="toggleFullScreen" class="pointer" hover />
                    <base-icon svg-name="close" class="pointer" @click="close" :size="19" hover />
                </el-space>
            </div>
        </template>

        <el-scrollbar class="el-scrollbar basic-dialog-body" :style="getBodyStyle">
            <slot></slot>
        </el-scrollbar>
        <template #footer v-if="actions.length > 0">
            <div class="base-dialog-footer" :style="{ 'text-align': btnPosition }">
                <render-item v-for="(item, index) in actions" :key="index" :element="{ ...item, size: 'default' }" :preview="preview" @action="getActions" />
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { useVModel } from "@vueuse/core";
const props = defineProps({
    fullscreen: {
        type: Boolean,
        default: false
    },
    visible: {
        type: Boolean,
        default: false
    },
    label: {
        type: String,
        default: "提示"
    },
    showHeader: {
        type: Boolean,
        default: true
    },
    btnPosition: {
        type: String as PropType<"left" | "right" | "center">,
        default: "center"
    },
    showFullscreen: {
        type: Boolean,
        default: true
    },
    minHeight: {
        type: String,
        default: "auto"
    },
    height: {
        type: String,
        default: "auto"
    },
    modalType: {
        type: String as PropType<"" | "blur">,
        default: ""
    },
    actions: {
        type: Array as PropType<any[]>,
        default: () => [
            {
                type: "button",
                actionType: "cancel",
                buttonLabel: "取消"
            },
            {
                type: "button",
                actionType: "confirm",
                buttonLabel: "确认",
                buttonType: "primary"
            }
        ]
    },
    preview: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(["close", "update:visible", "confirm"]);

const attrs = useAttrs();

const dialogVisible: Ref<Boolean> = useVModel(props, "visible", emit, { passive: true });

const fullscreen = ref(props.fullscreen);

const getPropsValue = computed(() => {
    return { ...attrs, showClose: false, fullscreen: fullscreen.value };
});

const getBodyStyle = computed(() => {
    const { minHeight, height } = props;
    return {
        minHeight,
        height: unref(getPropsValue).fullscreen ? "100%" : height
    };
});

const getActions = (event: any) => {
    if (event.actionType === "cancel") {
        hideDialog();
    } else if (event.actionType === "confirm") {
        emit("confirm");
        hideDialog();
    }
};

const hideDialog = () => {
    dialogVisible.value = false;
};

const toggleFullScreen = (e: Event) => {
    e?.preventDefault();
    e?.stopPropagation();
    fullscreen.value = !fullscreen.value;
};
</script>

<style lang="scss">
.dialog-fade-enter-active .el-dialog.base-dialog {
    animation: cocoFadeIn 0.3s;
}
.dialog-fade-leave-active .el-dialog.base-dialog {
    animation: cocoFadeOut 0.3s;
}

.el-overlay.blur {
    backdrop-filter: blur(5px);
}

.base-dialog {
    text-align: left;
    .el-dialog__header {
        padding-top: 6px;
        padding-bottom: 0;
        margin-right: 0;
        .base-dialog-header {
            height: 52px;
            line-height: 50px;
            .base-header-icon {
                position: absolute;
                right: 10px;
                top: 22px;
            }
        }
    }

    .el-dialog__footer {
        padding-bottom: 10px;
    }
    .el-dialog__body {
        padding: 14px !important;
    }
    .el-scrollbar__view {
        height: 100%;
    }
    &.el-dialog.is-fullscreen {
        .el-dialog__body {
            height: calc(100% - 112px);
        }
    }
}

@keyframes cocoFadeIn {
    0% {
        transform: scale(0);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}
@keyframes cocoFadeOut {
    0% {
        transform: scale3d(1, 1, 1);
        opacity: 1;
    }
    to {
        transform: scale3d(0.1, 0.1, 0.1);
        opacity: 0;
    }
}
</style>
