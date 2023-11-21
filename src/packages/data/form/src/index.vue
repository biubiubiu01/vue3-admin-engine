<template>
    <el-form v-bind="getBindValue" :rules="getRules" :model="data" :class="{ 'form-editor': !preview }">
        <template v-if="!preview">
            <drag-group :list="getFormSchema" />
            <div class="wrapper-empty" v-if="!getFormSchema.length">将组件拖拽到此处</div>
        </template>
        <template v-else>
            <render-item v-if="layoutType === 'row'" v-bind="getRowBindValue" />
            <slot v-else></slot>
        </template>
    </el-form>
</template>

<script lang="ts" setup>
import { useFormData } from "@/hooks/useFormData";
import { useFormRules } from "@/hooks/useFormRules";

const props = defineProps({
    labelSuffix: {
        type: Boolean
    },
    layoutType: {
        type: String,
        default: ""
    },
    gutter: {
        type: Number,
        default: 0
    },
    data: {
        type: Object
    },
    id: {
        type: String,
        default: ""
    },
    preview: {
        type: Boolean,
        default: false
    },
    children: {
        type: Array,
        default: () => []
    }
});

const attrs = useAttrs();

const { getNodeById } = useFormData();

const getFormSchema = computed(() => {
    return getNodeById(props.id)?.children || [];
});

const { getRules } = useFormRules(getFormSchema.value);

const getBindValue = computed(() => {
    const newProps = { ...attrs };

    if (props.labelSuffix) {
        newProps["label-suffix"] = "：";
    }

    return newProps;
});

const getRowBindValue = computed(() => {
    const { data, children, gutter, preview } = props;
    return {
        element: {
            type: "row",
            children,
            gutter
        },
        preview,
        data
    };
});

const formGutter = computed(() => {
    return props.gutter + "px";
});
</script>

<style lang="scss" scoped>
.el-form {
    padding: 0 v-bind(formGutter);
    position: relative;
    z-index: 22;
    &.el-form--inline.form-editor {
        .drag-editor {
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;
            :deep(.el-form-item) {
                margin-top: 0;
            }
        }
    }

    &.form-editor {
        background-color: var(--el-border-color-extra-light);
        min-height: 150px;

        .drag-editor {
            min-height: 150px;
        }
    }
}
</style>
