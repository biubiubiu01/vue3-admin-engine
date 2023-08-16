<script lang="tsx">
import { useFormData } from "@/hooks/useFormData";
import { useHistory } from "@/hooks/useHistory";

export default defineComponent({
    props: {
        element: {
            type: Object,
            default: () => {}
        }
    },
    setup(props, context) {
        const { deleteJson, copyJson, moveToBefore, moveToAfter, beforeDisabled, afterDisabled } = useFormData();
        const { executeRecord } = useHistory();
        return () => {
            const { element } = props;

            return (
                <div class="toolbar-box flex-row-center">
                    <span class="toolbar-label">{element.type}</span>
                    <el-tooltip content="按住拖动调整位置" placement="top">
                        <base-icon icon="Rank" class="toolbar-icon pointer rank-icon" size={14} />
                    </el-tooltip>
                    <el-tooltip content="复制" placement="top">
                        <base-icon
                            icon="CopyDocument"
                            class="toolbar-icon pointer"
                            size={14}
                            onClick={() => {
                                copyJson(element);
                                executeRecord();
                            }}
                        />
                    </el-tooltip>
                    <el-tooltip content="删除" placement="top">
                        <base-icon
                            icon="Delete"
                            class="pointer toolbar-icon"
                            size={14}
                            onClick={() => {
                                deleteJson(element.id);
                                executeRecord();
                            }}
                        />
                    </el-tooltip>
                    {beforeDisabled.value ? null : (
                        <el-tooltip content="向前移动" placement="top">
                            <base-icon
                                icon="Upload"
                                class="pointer toolbar-icon"
                                size={14}
                                onClick={() => {
                                    moveToBefore(element.id);
                                    executeRecord();
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
                                    moveToAfter(element.id);
                                    executeRecord();
                                }}
                            />
                        </el-tooltip>
                    )}
                </div>
            );
        };
    }
});
</script>
