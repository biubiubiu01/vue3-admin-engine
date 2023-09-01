<template>
    <draggable
        group="componentDrag"
        animation="340"
        ghost-class="drag-ghost"
        :list="list"
        item-key="id"
        class="h100 drag-editor padding10"
        @start="isDragEnd = false"
        @end="isDragEnd = true"
        @add="handleDragEnd"
        @update="handleDragUpdate"
        handle=".rank-icon"
    >
        <template #item="{ element }">
            <render-item v-bind="getBindItem(element)" @click.stop="setDragActive(element)" :preview="preview" />
        </template>
    </draggable>
</template>

<script lang="ts" setup>
import { useFormData } from "@/hooks/useFormData";
import { useHistory } from "@/hooks/useHistory";
import draggable from "vuedraggable";

const props = defineProps({
    list: {
        type: Array as PropType<any[]>,
        default: () => []
    },
    preview: {
        type: Boolean,
        default: false
    }
});

const isDragEnd = ref(true);

const { getActiveInfo, setActive, getActiveId } = useFormData();

const { executeRecord } = useHistory();

const getBindItem = computed(() => {
    return (element: any) => {
        return {
            element: { ...element, readonly: !props.preview },
            data: getActiveInfo.value,
            class: [{ "element-item": !props.preview }, { "is-end": unref(isDragEnd) }, { active: unref(getActiveId) === element.id }]
        };
    };
});

const setDragActive = (element: any) => {
    if (props.preview) return;
    setActive(element.id);
};

const handleDragEnd = (e: any) => {
    setActive(props.list[e.newIndex].id);
    executeRecord();
};

const handleDragUpdate = () => {
    executeRecord();
};
</script>

<style scoped></style>
