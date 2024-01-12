<template>
    <el-popover trigger="click" :visible="pickerVisible" popper-class="el-date-picker base-quarter-popover" :width="width">
        <template #reference>
            <el-input
                class="el-date-editor"
                :disabled="disabled"
                :size="size"
                :prefix-icon="prefixIcon"
                :placeholder="placeholder"
                v-model="displayValue"
                :validate-event="false"
                :clearable="clearable"
                @click="pickerVisible = true"
                @clear="handleClickIcon"
            />
        </template>
        <div v-click-outside="closePopover" class="el-date-picker">
            <div class="el-date-picker__header el-date-picker__header--bordered">
                <span role="button" class="el-date-picker__prev-btn">
                    <button type="button" aria-label="前一年" class="el-picker-panel__icon-btn" @click="prevYear">
                        <base-icon icon="DArrowLeft" />
                    </button>
                </span>
                <span role="button" class="el-date-picker__header-label">{{ currentYear }}年</span>
                <span role="button" class="el-date-picker__next-btn">
                    <button type="button" aria-label="后一年" class="el-picker-panel__icon-btn" @click="nextYear">
                        <base-icon icon="DArrowRight" />
                    </button>
                </span>
            </div>
            <div class="el-picker-panel__content" style="margin: 10px 15px">
                <table class="base-quarter-table" @click="handleTableClick">
                    <tbody>
                        <tr>
                            <td class="available" :class="getCellStyle(0)">
                                <a class="cell">上半年</a>
                            </td>
                            <td class="available" :class="getCellStyle(1)">
                                <a class="cell">下半年</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </el-popover>
</template>

<script lang="ts" setup>
import { ClickOutside as vClickOutside } from "element-plus";
import { useVModel } from "@vueuse/core";

const props = defineProps({
    size: {
        type: String
    },
    width: {
        type: String,
        default: "324px"
    },
    placeholder: {
        type: String,
        default: "请选择半年度"
    },
    disabled: Boolean,
    clearable: {
        type: Boolean,
        default: true
    },
    modelValue: {
        type: String,
        default: ""
    },
    prefixIcon: {
        type: String,
        default: "Calendar"
    }
});

const emit = defineEmits(["update:modelValue", "change"]);

const date: Ref<string | undefined> = useVModel(props, "modelValue", emit, { passive: true });

const pickerVisible = ref(false);

const quarterText = ["上半年", "下半年"];

const year = computed((): string => {
    if (!unref(date)) return "";
    return unref(date)!?.split("-")[0];
});

const currentYear = ref(parseFloat(year.value) || new Date().getFullYear());

const halfIndex = computed(() => {
    if (!unref(date)) return -1;
    return parseFloat(unref(date)!?.split("-")[1]) - 1;
});

const displayValue = computed(() => {
    if (!unref(date)) return null;
    return unref(year) + "年" + quarterText[unref(halfIndex)];
});

const handleClickIcon = () => {
    date.value = "";
};

const handleTableClick = (event: MouseEvent) => {
    let target = event.target as HTMLElement;
    if (target.tagName === "A") {
        target = target.parentNode as HTMLTableCellElement;
    }
    if (target.tagName !== "TD") return;
    const column = (target as HTMLTableCellElement).cellIndex + 1;
    const newDate = `${unref(currentYear)}-${column}`;

    date.value = newDate.toString();
    emit("change", newDate.toString());
    pickerVisible.value = false;
};

const prevYear = () => {
    currentYear.value = unref(currentYear) - 1;
};
const nextYear = () => {
    currentYear.value = unref(currentYear) + 1;
};

const closePopover = () => {
    pickerVisible.value = false;
};

const getCellStyle = (quarter: number) => {
    return {
        current: parseFloat(unref(year)) === unref(currentYear) && unref(halfIndex) === quarter
    };
};
</script>

<style lang="scss">
.base-quarter-popover {
    padding: 0 !important;
    .base-quarter-table {
        font-size: 12px;
        margin: -1px;
        border-collapse: collapse;
        width: 100%;
        td {
            text-align: center;
            padding: 10px 3px;
            cursor: pointer;
            .cell {
                height: 32px;
                display: block;
                line-height: 32px;
                color: #606266;
                margin: 0 auto;
            }
            &:hover {
                color: #1890ff;
            }
            &.current:not(.disabled) {
                .cell {
                    color: #409eff;
                }
            }
        }
    }
}
</style>
