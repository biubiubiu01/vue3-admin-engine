<template>
    <component :is="tag" :style="getAttrStyle" class="container-wrapper">
        <slot></slot>
    </component>
</template>

<script lang="ts" setup>
const props = defineProps({
    tag: {
        type: String,
        default: "div"
    },
    showType: {
        type: String
    },
    justify: String,
    align: String,
    children: {
        type: Array
    }
});

const getAttrStyle = computed(() => {
    const { showType, justify, align } = props;
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

    return styleObj;
});
</script>

<style lang="scss" scoped></style>
