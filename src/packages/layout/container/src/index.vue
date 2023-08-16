<template>
    <component :is="tag" class="base-container" v-bind="getAttrStyle">
        <template v-if="!preview">
            <drag-group :list="children" />
            <div class="wrapper-empty" v-if="!children.length">将组件拖拽到此处</div>
        </template>
        <slot v-else></slot>
    </component>
</template>

<script lang="ts" setup>
const props = defineProps({
    tag: {
        type: String,
        default: "div"
    },
    preview: {
        type: Boolean,
        default: false
    },
    id: {
        type: String,
        default: ""
    },
    data: {
        type: Object
    },
    children: {
        type: Array,
        default: () => []
    },
    showType: {
        type: String
    },
    justify: String,
    align: String
});

const getAttrStyle = computed(() => {
    const { preview, showType, justify, align } = props;
    const styleObj: any = {};

    if (showType) {
        styleObj.display = showType;
        if (justify) {
            styleObj["justify-content"] = justify;
        }
        if (align) {
            styleObj["align-items"] = align;
        }
    }

    return {
        class: { "container-editor": !preview },
        style: styleObj
    };
});
</script>

<style lang="scss" scoped>
.base-container {
    position: relative;
    z-index: 22;
    width: 100%;

    &.container-editor {
        background-color: var(--el-border-color-extra-light);
        min-height: 70px;

        .drag-editor {
            min-height: 70px;
        }
    }
}
</style>
