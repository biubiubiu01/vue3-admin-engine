import { useWidgetList } from "@/hooks/useWidgetList";
import { omit, pick, evalExpressionWithConditionBuilder, getValue, setValue, deleteValue } from "@/utils";

export default defineComponent({
    name: "render-setting",
    props: {
        item: {
            type: Object as PropType<Component>,
            default: () => {}
        },
        data: {
            type: Object as PropType<AnyObject>,
            default: () => {}
        }
    },
    setup(props, context) {
        const { getComponent, isFormItem } = useWidgetList();

        const isFormComp = computed(() => isFormItem(props.item.type) || props.item.isFormItem);

        const getModelValue = computed(() => {
            const { item, data } = props;

            if (!item.name && !item.virtualBind) return {};

            let value = item.name ? getValue(data, item.name) : data;

            if (typeof item.pipeIn === "function") {
                value = item.pipeIn?.(value, item, data);
            }

            return {
                modelValue: value,
                "onUpdate:modelValue": (value: any) => {
                    if (typeof item.pipeOut === "function") {
                        value = item.pipeOut?.(value, item, data);
                    }
                    if (value === null || value === undefined || value === "") {
                        item.name && deleteValue(data, item.name);
                        return;
                    }

                    item.name && setValue(data, item.name, value);
                }
            };
        });

        const getElementProps = computed(() => {
            const { item } = props;
            const styleOmit = Object.keys(item).filter((item: string) => item.includes("style:"));
            const omitList = ["type", "pipeIn", "pipeOut", "id", "sourceStyle", "rules", "onEvent", ...styleOmit];

            return { ...omit(item, omitList) };
        });

        const getBindValue = computed(() => {
            return { ...getModelValue.value, ...getElementProps.value };
        });

        const renderFormItemComponent = () => {
            const { item } = props;
            const getFormItemBind = { ...pick(item, ["label", "labelRemark", "model", "label-width", "size"]) };
            return <form-item {...getFormItemBind}>{renderComponent()}</form-item>;
        };

        const renderComponent = () => {
            const { item } = props;

            const children = item.children ? () => getChildren(item, item.children) : "";

            return h(getComponent(item.type), { ...getBindValue.value }, children);
        };

        const getChildren = (item: Component, children: Component[] | undefined) => {
            const { data } = props;
            const value = item.name ? data[item.name] : data;
            return children!.map((child) => <render-setting item={child} data={value} />);
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
