<script lang="tsx">
import { useWidgetList } from "@/hooks/useWidgetList";
import { useFormData } from "@/hooks/useFormData";
import { omit, evalExpressionWithConditionBuilder } from "@/utils";

export default defineComponent({
    props: {
        element: {
            type: Object,
            default: () => {}
        }
    },
    setup(props, context) {
        const { getComponent } = useWidgetList();

        const { getActiveInfo } = useFormData();

        const getModelValue = computed(() => {
            const { element } = props;

            if (element.name || element.id) {
                let value = getActiveInfo.value[element.name];
                if (typeof element.pipeIn === "function") {
                    value = element.pipeIn?.(value);
                }
                return {
                    modelValue: value,
                    onChange: (val: any) => {
                        if (typeof element.change === "function") {
                            element.change?.(val, getActiveInfo.value);
                        }
                    },
                    "onUpdate:modelValue": (val: any) => {
                        if (typeof element.pipeOut === "function") {
                            val = element.pipeOut?.(val);
                        }
                        if (val === null || val === undefined) {
                            delete getActiveInfo.value[element.name];
                            return;
                        }
                        getActiveInfo.value[element.name] = val;
                    }
                };
            }
            return {};
        });

        const getBindValue = computed(() => {
            const { element } = props;

            return {
                ...getModelValue.value,
                ...omit(element, ["type", "pipeIn", "pipeOut"])
            };
        });

        const renderComponent = () => {
            const { element } = props;

            if (!element.type) {
                console.warn("组件类型不能为空");
                return;
            }
            if (!getComponent(element.type)) {
                console.warn(`未找到与${element.type}匹配的组件`);
                return;
            }

            if (element.visibleOn && !evalExpressionWithConditionBuilder(element.visibleOn, getActiveInfo.value)) {
                return;
            }

            if (element.hiddenOn && evalExpressionWithConditionBuilder(element.hiddenOn, getActiveInfo.value)) {
                return;
            }

            return h(getComponent(element.type), { ...getBindValue.value });
        };

        return () => {
            return renderComponent();
        };
    }
});
</script>
