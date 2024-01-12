<script lang="tsx">
import { useVModel } from "@vueuse/core";
import { useFormData } from "@/hooks/useFormData";
import { deepClone } from "@/utils";

export default defineComponent({
    props: {
        modelValue: {
            type: Boolean,
            default: false
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
        const switchValue: Ref<boolean | undefined> = useVModel(props, "modelValue", context.emit, { passive: true });

        const { getActiveInfo } = useFormData();
        const dialogForm: Ref<AnyObject> = ref({});

        const dialogVisible = ref(false);

        const handleShowDialog = () => {
            dialogForm.value = deepClone(getActiveInfo.value);
            dialogVisible.value = true;
        };

        const handleHideDialog = () => {
            dialogVisible.value = false;
        };

        const renderDialog = () => {
            return (
                <el-dialog v-model={dialogVisible.value} title={props.label} appendToBody width="800px">
                    {{
                        default: () => renderForm(),
                        footer: () => (
                            <div class="tc">
                                <el-button type="primary" size="default" plain onClick={handleHideDialog}>
                                    取 消
                                </el-button>
                                <el-button
                                    type="primary"
                                    size="default"
                                    onClick={() => {
                                        getActiveInfo.value[props.name] = dialogForm.value[props.name];
                                        handleHideDialog();
                                    }}
                                >
                                    保 存
                                </el-button>
                            </div>
                        )
                    }}
                </el-dialog>
            );
        };

        const renderDialogIcon = () => {
            return (
                <el-tooltip content="编辑详情" placement="bottom">
                    <base-icon icon="editPen" size={16} class="pointer switch-icon" onClick={handleShowDialog} />
                </el-tooltip>
            );
        };

        const renderForm = () => {
            const formElement = {
                type: "form",
                name: props.name,
                "label-width": "90px",
                ...props.form
            };
            const data = props.formType === "dialog" ? dialogForm.value : getActiveInfo.value;

            return <render-setting item={formElement} data={data} />;
        };

        const renderExtend = () => {
            return <div class="switch-extend">{renderForm()}</div>;
        };

        return () => {
            const { formType } = props;

            return (
                <div>
                    <form-item label={props.label}>
                        <div class="flex-center justify-between w100">
                            <el-switch v-model={switchValue.value} {...context.attrs} />
                            {formType === "dialog" && switchValue.value ? renderDialogIcon() : null}
                        </div>
                    </form-item>
                    {formType === "dialog" ? renderDialog() : null}
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
</style>
