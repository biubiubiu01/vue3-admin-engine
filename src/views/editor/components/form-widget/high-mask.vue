<script lang="tsx">
import { useFormData } from "@/hooks/useFormData";
import { useWidgetList } from "@/hooks/useWidgetList";
import { useHistory } from "@/hooks/useHistory";
import { useResizeObserver, useThrottleFn } from "@vueuse/core";

export default defineComponent({
    setup(props, context) {
        const { getActiveInfo, getSchemaJson, getActiveId, deleteJson, copyJson, clearCurrent, moveToBefore, moveToAfter, beforeDisabled, afterDisabled, pageDisabled } = useFormData();
        const { getComponentProps } = useWidgetList();
        const { executeRecord } = useHistory();

        const state = reactive({
            top: 0,
            left: 0,
            width: 0,
            height: 0,
            toolsTop: 0,
            toolsLeft: 0
        });

        const toolbarRef = ref<HTMLDivElement>();

        const getMaskStyle = computed(() => {
            const { top, left, width, height } = state;
            return {
                top: `${top}px`,
                left: `${left}px`,
                width: `${width}px`,
                height: `${height}px`
            };
        });

        const getToolStyle = computed(() => {
            const { toolsTop, toolsLeft } = state;

            return {
                top: `${toolsTop}px`,
                left: `${toolsLeft}px`
            };
        });

        useResizeObserver(
            document.body,
            useThrottleFn(() => {
                updatePosition();
            }, 100)
        );

        const updatePosition = () => {
            nextTick(() => {
                const container = document.querySelector(".form-widget-container");
                if (!container) return;

                const element = document.querySelector(`[data-component-id="${getActiveId.value}"]`);

                if (!element) return;

                const { top, left, width, height } = element.getBoundingClientRect();

                const { top: containerTop, left: containerLeft } = container.getBoundingClientRect();

                let toolsTop = top - containerTop + container.scrollTop + height;
                let toolsLeft = Math.max(0, left - containerLeft + container.scrollTop);
                const toolsWidth = toolbarRef.value!?.offsetWidth;
                const toolsHeight = toolbarRef.value!?.offsetHeight;

                if (toolsWidth < width) {
                    toolsLeft += width - toolsWidth;
                }

                if (toolsHeight < height / 2) {
                    toolsTop -= toolsHeight;
                }

                Object.assign(state, {
                    top: Math.max(0, top - containerTop + container.scrollTop),
                    left: Math.max(0, left - containerLeft + container.scrollTop),
                    width,
                    height,
                    toolsTop,
                    toolsLeft
                });
            });
        };

        watch(
            [getActiveId, getSchemaJson],
            () => {
                updatePosition();
            },
            { immediate: true, deep: true }
        );

        return () => {
            if (!getActiveId.value) return null;
            const allowClear = getComponentProps(getActiveInfo.value.type)?.allowClear ?? true;

            const notChildren = !getActiveInfo.value?.children?.length || !allowClear;
            return (
                <>
                    <div class="element-mask" style={getMaskStyle.value}></div>
                    <div class="toolbar-box high-toolbar flex-row-center" style={getToolStyle.value} ref={toolbarRef}>
                        <el-tooltip content={getActiveInfo.value.type} placement="top">
                            <div class="toolbar-label text-hidden">{getActiveInfo.value.type}</div>
                        </el-tooltip>
                        {notChildren ? null : (
                            <el-tooltip content="清空当前区域" placement="top">
                                <base-icon
                                    icon="svg-clear"
                                    class="toolbar-icon pointer"
                                    size={14}
                                    onClick={() => {
                                        clearCurrent(getActiveInfo.value);
                                        executeRecord();
                                    }}
                                />
                            </el-tooltip>
                        )}
                        <el-tooltip content="复制" placement="top">
                            <base-icon
                                icon="CopyDocument"
                                class="toolbar-icon pointer"
                                size={14}
                                onClick={() => {
                                    copyJson(getActiveInfo.value);
                                    executeRecord();
                                }}
                            />
                        </el-tooltip>
                        {pageDisabled.value ? null : (
                            <el-tooltip content="删除" placement="top">
                                <base-icon
                                    icon="Delete"
                                    class="pointer toolbar-icon"
                                    size={14}
                                    onClick={() => {
                                        deleteJson(getActiveInfo.value.id);
                                        executeRecord();
                                    }}
                                />
                            </el-tooltip>
                        )}
                        {beforeDisabled.value ? null : (
                            <el-tooltip content="向前移动" placement="top">
                                <base-icon
                                    icon="Upload"
                                    class="pointer toolbar-icon"
                                    size={14}
                                    onClick={() => {
                                        moveToBefore(getActiveInfo.value.id);
                                        executeRecord();
                                        updatePosition();
                                    }}
                                />
                            </el-tooltip>
                        )}
                        {afterDisabled.value ? null : (
                            <el-tooltip content="向后移动" placement="top">
                                <base-icon
                                    icon="Download"
                                    class="pointer toolbar-icon"
                                    size={14}
                                    onClick={() => {
                                        moveToAfter(getActiveInfo.value.id);
                                        executeRecord();
                                        updatePosition();
                                    }}
                                />
                            </el-tooltip>
                        )}
                    </div>
                </>
            );
        };
    }
});
</script>
