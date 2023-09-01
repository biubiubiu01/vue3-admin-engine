<script lang="tsx">
import { useVModel } from "@vueuse/core";
import { useWidgetList } from "@/hooks/useWidgetList";
import { useFormData } from "@/hooks/useFormData";

export default defineComponent({
    props: {
        modelValue: {
            type: [Number, String, Boolean]
        },
        defaultValue: {
            type: [Number, String, Boolean]
        },
        formType: {
            type: String
        },
        form: {
            type: Object
        },
        label: {
            type: String
        },
        name: {
            type: String,
            default: ""
        }
    },
    emit: ["update:modelValue"],
    setup(props, context) {
        const { getComponent } = useWidgetList();

        const { getActiveInfo } = useFormData();

        const switchValue: any = useVModel(props, "modelValue", context.emit, { passive: true, defaultValue: props.defaultValue });

        const dialogVisible = ref(false);

        const renderDialog = () => {
            return (
                <>
                    {renderDialogIcon()}
                    {h(
                        getComponent("dialog"),
                        {
                            visible: dialogVisible.value,
                            label: props.label,
                            appendToBody: true,
                            width: "800px",
                            preview: true,
                            "onUpdate:visible": (value: boolean) => {
                                dialogVisible.value = value;
                            }
                        },
                        renderForm
                    )}
                </>
            );
        };

        const renderDialogIcon = () => {
            if (!switchValue.value) return null;
            return (
                <el-tooltip content="编辑详情" placement="bottom">
                    <base-icon icon="editPen" size={16} class="pointer switch-icon" onClick={() => (dialogVisible.value = true)} />
                </el-tooltip>
            );
        };

        const renderForm = () => {
            const formElement = {
                type: "form",
                "label-width": "90px",
                ...props.form
            };

            return <render-item element={formElement} data={getActiveInfo.value[props.name]} preview={true} />;
        };

        const renderExtend = () => {
            return <div class="switch-extend">{renderForm()}</div>;
        };

        return () => {
            const { formType, label } = props;
            return (
                <div>
                    <el-form-item label={label}>
                        <div class="flex-center justify-between w100">
                            <el-switch v-model={switchValue.value} {...context.attrs} />
                            {formType === "dialog" && switchValue.value ? renderDialog() : null}
                        </div>
                    </el-form-item>
                    {formType === "extend" && switchValue.value ? renderExtend() : null}
                </div>
            );
        };
    }
});
</script>

<style lang="scss" scoped>
.switch-icon {
    color: var(--el-text-color-regular);
    &:hover {
        color: var(--el-color-primary);
    }
}
.switch-extend {
    box-sizing: border-box;
    padding: 12px 0 2px;
    margin-bottom: 12px;
    margin-top: -4px;
    background-color: var(--el-border-color-lighter);
    border-radius: 6px;
    position: relative;
    box-shadow: var(--el-border-color);
    &::before {
        position: absolute;
        content: "";
        left: 28px;
        transform: translate(69px, 0px);
        top: -5px;
        width: 10px;
        height: 10px;
        border-bottom-color: transparent !important;
        border-right-color: transparent !important;
        border-top-left-radius: 2px;
        border: 1px solid var(--el-border-color);
        background-color: var(--el-border-color-lighter);
        transform: rotate(45deg);
    }
}
</style>
