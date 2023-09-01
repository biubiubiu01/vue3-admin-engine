<script lang="tsx">
import { useWidgetList } from "@/hooks/useWidgetList";
import { useFormData } from "@/hooks/useFormData";
import { omit, pick, evalExpressionWithConditionBuilder, transformStyle } from "@/utils";
import ToolBar from "@/views/editor/components/form-widget/toolbar.vue";

export default defineComponent({
    name: "render-item",
    components: { ToolBar },
    props: {
        element: {
            type: Object,
            default: () => {}
        },
        data: {
            type: Object,
            default: () => {}
        },
        preview: {
            type: Boolean,
            default: false
        }
    },
    setup(props, context) {
        const { getComponent, isInlineComp, isFormComp } = useWidgetList();
        const { getActiveId } = useFormData();

        const getModelValue = computed(() => {
            const { element, data } = props;

            if (element.name || element.id) {
                let value = data[element.name];
                if (typeof element.pipeIn === "function") {
                    value = element.pipeIn?.(value);
                }
                return {
                    modelValue: value,
                    "onUpdate:modelValue": (val: any) => {
                        if (typeof element.pipeOut === "function") {
                            val = element.pipeOut?.(val);
                        }
                        if (val === null || val === undefined) {
                            delete data[element.name];
                            return;
                        }
                        data[element.name] = val;
                    }
                };
            }
            return {};
        });

        const getEventAction = computed(() => {
            // const { element } = props;
            // return {
            //     onChange: (val: any) => {
            //         if (typeof element.change === "function") {
            //             element.change?.(val, getActiveInfo.value);
            //         }
            //     }
            // };
        });

        const getElementStyle = computed(() => {
            const { element } = props;

            if (!element.id) return "";

            return transformStyle(element);
        });

        const getBindValue = computed(() => {
            const { element, data, preview } = props;
            const styleOmit = Object.keys(element).filter((item: string) => item.includes("style:"));
            return {
                ...getModelValue.value,
                data,
                preview,
                style: getElementStyle.value,
                // ...getEventAction.value,
                ...omit(element, ["type", "model", "pipeIn", "pipeOut", "span", "preview", "sourceStyle", ...styleOmit])
            };
        });

        const renderComponent = () => {
            const { element, preview, data } = props;

            let child: null | any[] = null;

            if (element.children) {
                child = element.children.map((item: any) => <render-item element={item} data={data} preview={preview} />);
            }

            if (preview) {
                return h(getComponent(element.type), { ...getBindValue.value }, () => child);
            }

            return (
                <>
                    {h(getComponent(element.type), { ...getBindValue.value }, () => child)}
                    {renderToolBar()}
                </>
            );
        };

        const renderFormItemComponent = () => {
            const { element } = props;

            const getFormItemBind = { ...pick(element, ["label", "labelRemark", "model", "className", "label-width", "size"]) };

            return <form-item {...getFormItemBind}>{renderComponent()}</form-item>;
        };

        const renderToolBar = () => {
            const { element } = props;

            if (element.id !== getActiveId.value) return null;
            return <ToolBar element={element} />;
        };

        return () => {
            const { element, data, preview } = props;

            if (!element.type) {
                console.warn("组件类型不能为空");
                return;
            }

            if (!getComponent(element.type)) {
                console.warn(`未找到与${element.type}匹配的组件`);
                return;
            }

            if (element.visibleOn && !evalExpressionWithConditionBuilder(element.visibleOn, data)) {
                return;
            }

            if (element.hiddenOn && evalExpressionWithConditionBuilder(element.hiddenOn, data)) {
                return;
            }

            if (isFormComp(element.type)) {
                return renderFormItemComponent();
            }

            if (!preview) {
                return <div class={{ "inline-element": true, "inline-block": isInlineComp(element.type) }}>{renderComponent()}</div>;
            }

            return renderComponent();
        };
    }
});
</script>
