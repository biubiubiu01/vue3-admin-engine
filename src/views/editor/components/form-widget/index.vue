<template>
    <el-scrollbar wrap-class="form-widget-bg" :view-class="[{ editor: !isPreview }, { 'is-preview': isPreview }, 'all-container form-widget-container']">
        <render-list :schema="getSchemaJson" :data="formModel" :preview="isPreview" />
        <HighMask v-if="!isPreview" />
        <HoverMask :hoverId="hoverId" v-if="!isPreview" />
    </el-scrollbar>
</template>

<script lang="ts" setup>
import { useFormData } from "@/hooks/useFormData";
import { usePreview } from "@/hooks/useGlobalStatus";
import { useWidgetList } from "@/hooks/useWidgetList";
import HighMask from "./high-mask.vue";
import HoverMask from "./hover-mask.vue";

const { getSchemaJson, getActiveId, setActive, createJson, updateSchema } = useFormData();
const { getComponentProps } = useWidgetList();

const hoverId = ref<string>();
const [isPreview] = usePreview();
const formModel = ref({});

if (getSchemaJson.value.length === 0) {
    const componentProps = getComponentProps("form");
    const json = createJson(componentProps);
    updateSchema([
        {
            ...json,
            class: "h100"
        }
    ]);
}

onMounted(() => {
    const container = document.querySelector(".form-widget-container");
    if (!container) return;
    container.addEventListener("mouseover", createMask, true);
    container.addEventListener("mouseleave", removerMask);
    container.addEventListener("click", handleSetActive, true);
});

onBeforeUnmount(() => {
    const container = document.querySelector(".form-widget-container");
    if (!container) return;
    container.removeEventListener("mouseover", createMask, true);
    container.removeEventListener("mouseleave", removerMask);
    container.removeEventListener("click", handleSetActive, true);
});

const createMask = (e: Event) => {
    e.stopPropagation();
    e.preventDefault();
    const path = e.composedPath();

    for (let i = 0; i < path.length; i += 1) {
        const ele: any = path[i];
        if (ele.getAttribute && ele.getAttribute("data-component-id")) {
            const componentId = ele.getAttribute("data-component-id");
            if (componentId) {
                if (getActiveId.value === componentId) {
                    hoverId.value = "";
                } else {
                    hoverId.value = componentId;
                }
                return;
            }
        }
    }
};

const removerMask = () => {
    hoverId.value = "";
};

const handleSetActive = (e: Event) => {
    const path = e.composedPath();

    for (let i = 0; i < path.length; i += 1) {
        const ele: any = path[i];
        if (ele.getAttribute && ele.getAttribute("data-component-id")) {
            const componentId = ele.getAttribute("data-component-id");
            if (componentId) {
                setActive(componentId);
                e.stopPropagation();
                e.preventDefault();
                removerMask();
                return;
            }
        }
    }
};
</script>

<style lang="scss" scoped></style>
