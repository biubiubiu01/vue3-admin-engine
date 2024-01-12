import { useWidgetList } from "@/hooks/useWidgetList";
import { omit, pick, evalExpressionWithConditionBuilder, transformStringToFunction } from "@/utils";

export default defineComponent({
    name: "render-item",
    props: {
        item: {
            type: Object as PropType<Component>,
            default: () => {}
        },
        preview: {
            type: Boolean,
            default: false
        },
        data: {
            type: Object as PropType<AnyObject>,
            default: () => {}
        }
    },
    setup(props, context) {
        const { getComponent, getComponentProps, isFormItem, isWrapper } = useWidgetList();

        const isFormComp = computed(() => isFormItem(props.item.type));
        const isWrapperComp = computed(() => isWrapper(props.item.type));

        const getIdMark = computed(() => {
            const { preview } = props;
            if (!preview) {
                return { "data-component-id": props.item.id };
            }
            return {};
        });

        const getModelValue = computed(() => {
            const { item, data, preview } = props;
            if (!item.id) return {};
            const componentProps = getComponentProps(item.type);
            if (typeof componentProps.pipeIn === "function") {
                data[item.id] = componentProps.pipeIn?.({ data, item, preview });
            }

            return {
                modelValue: data[item.id],
                "onUpdate:modelValue": (value: any) => {
                    data[item.id] = value;
                }
            };
        });

        const getElementProps = computed(() => {
            const { item } = props;
            const omitList = ["type", "pipeIn", "pipeOut", "id", "sourceStyle", "rules", "onEvent"];
            return { ...omit(item, omitList) };
        });

        const getElementEvent = computed(() => {
            const { item } = props;
            const eventObj: AnyObject = {};
            if (!item.onEvent) return eventObj;
            item.onEvent.forEach((item) => {
                const event = item.event[0].toUpperCase() + item.event.substr(1);
                eventObj[`on${event}`] = transformStringToFunction(`function ${item.eventName}(${item.params}){${item.eventCode}}`);
            });
            return eventObj;
        });

        const getBindValue = computed(() => {
            return { ...getModelValue.value, ...getElementProps.value, ...getElementEvent.value };
        });

        const renderFormItemComponent = () => {
            const { item } = props;
            const getFormItemBind = { ...pick(item, ["label", "labelRemark", "model", "label-width", "size"]) };
            return (
                <form-item {...getIdMark.value} {...getFormItemBind}>
                    {renderComponent()}
                </form-item>
            );
        };

        const renderComponent = () => {
            const { item } = props;

            const children = item.children ? () => getChildren(item.children) : "";

            return h(getComponent(item.type), { ...getIdMark.value, ...getBindValue.value }, children);
        };

        const getChildren = (children: Component[] | undefined) => {
            const { preview, data } = props;

            if (isWrapperComp.value && !preview) {
                return (
                    <render-wrapper list={children}>
                        {{
                            item: ({ element, index }: { element: Component; index: number }) => <render-item item={element} data={data} preview={preview} />
                        }}
                    </render-wrapper>
                );
            }
            return children!.map((child) => <render-item item={child} data={data} preview={preview} />);
        };

        return () => {
            const { item, data } = props;

            if (!item.type) {
                console.warn("组件类型不能为空");
                return;
            }

            if (!getComponent(item.type)) {
                console.warn(`未找到与【${item.type}】匹配的组件`);
                return;
            }

            if (item.visibleOn && !evalExpressionWithConditionBuilder(item.visibleOn, unref(data))) {
                return;
            }

            if (item.hiddenOn && evalExpressionWithConditionBuilder(item.hiddenOn, unref(data))) {
                return;
            }

            if (unref(isFormComp)) {
                return renderFormItemComponent();
            }

            return renderComponent();
        };
    }
});
