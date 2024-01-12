<script lang="tsx">
import { useFormData } from "@/hooks/useFormData";

export default defineComponent({
    props: {
        hoverId: {
            type: String
        }
    },
    setup(props, context) {
        const { getNodeById } = useFormData();

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

        const curComponent = computed(() => {
            if (props.hoverId) {
                return getNodeById(props.hoverId);
            }
            return {};
        });

        const updatePosition = () => {
            nextTick(() => {
                const container = document.querySelector(".form-widget-container");
                if (!container) return;

                const element = document.querySelector(`[data-component-id="${props.hoverId}"]`);

                if (!element) return;

                const highToolbar: HTMLDivElement | null = document.querySelector(".high-toolbar");

                const { top, left, width, height } = element.getBoundingClientRect();

                const { top: containerTop, left: containerLeft } = container.getBoundingClientRect();

                let toolsTop = top - containerTop + container.scrollTop + height;
                let toolsLeft = Math.max(0, left - containerLeft + container.scrollTop);
                const toolsWidth = toolbarRef.value!.offsetWidth;
                const toolsHeight = toolbarRef.value!.offsetHeight;

                if (toolsWidth < width) {
                    toolsLeft += width - toolsWidth;
                }

                if (toolsHeight < height / 2) {
                    toolsTop -= toolsHeight;
                }

                // 是否遮挡
                if (highToolbar) {
                    const highStyle = highToolbar.style;
                    const highTop = parseFloat(highStyle.top);

                    if (toolsTop - toolsHeight < highTop && highTop !== toolsTop) {
                        toolsTop = Math.max(0, toolsTop - height);
                    }
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
            () => props.hoverId,
            () => {
                if (!props.hoverId) return;
                updatePosition();
            }
        );

        return () => {
            if (!props.hoverId) return null;

            return (
                <>
                    <div class="hover-mask" style={getMaskStyle.value}></div>
                    <div class="toolbar-box hover-toolbar" style={getToolStyle.value} ref={toolbarRef}>
                        <div class="font14 text-hidden">{curComponent.value.type}</div>
                    </div>
                </>
            );
        };
    }
});
</script>
