import { useFormData } from "@/hooks/useFormData";
import { useHistory } from "@/hooks/useHistory";
import draggable from "vuedraggable";

export default defineComponent({
    props: {
        list: {
            type: Array as PropType<Component[]>,
            default: () => []
        }
    },
    components: { draggable },
    setup(props, context) {
        const { setActive } = useFormData();

        const { executeRecord } = useHistory();

        const handleDragEnd = (e: Component) => {
            setActive(props.list[e.newIndex].id);
            executeRecord();
        };

        const handleDragUpdate = () => {
            executeRecord();
        };

        const renderEmpty = () => {
            return <div class="wrapper-empty">将组件拖拽到此处</div>;
        };

        const renderDragWrapper = () => {
            return (
                <draggable
                    group="componentDrag"
                    animation="340"
                    ghost-class="drag-ghost"
                    list={props.list}
                    item-key="id"
                    class="h100 wrapper-editor padding10"
                    onAdd={handleDragEnd}
                    onUpdate={handleDragUpdate}
                >
                    {{
                        item: ({ element, index }: { element: Component; index: number }) => context.slots?.item?.({ element, index })
                    }}
                </draggable>
            );
        };

        return () => {
            const list = props.list;
            return (
                <>
                    {renderDragWrapper()}
                    {list.length === 0 ? renderEmpty() : null}
                </>
            );
        };
    }
});
