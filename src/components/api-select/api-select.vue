<template>
    <el-select
        v-model="selectValue"
        v-bind="getBindValue"
        @change="changeSelect"
        @focus="focusSelect"
        @blur="blurSelect"
        @visible-change="visibleChange"
        @clear="clearSelect"
        :loading="remoteLoading"
        loading-text="加载中..."
    >
        <el-option v-for="item in selectOption" :key="item[valueKey]" :label="item[labelKey]" :value="valueCompute(item)" />
    </el-select>
</template>

<script lang="ts" setup>
import { isEmpty, isFunction, getValue } from "@/utils";
import { useVModel } from "@vueuse/core";
import axios from "axios";

const props = defineProps({
    modelValue: {
        type: [Array, String, Number, Boolean, Object] as PropType<string | number | boolean | object | any[]>,
        default: undefined
    },
    modelLabel: {
        type: [Array, String, Number, Boolean, Object] as PropType<string | number | boolean | object | any[]>,
        default: undefined
    },
    placeholder: {
        type: String,
        default: "请选择"
    },
    valueObject: {
        type: Boolean,
        default: false
    },
    clearable: {
        type: Boolean,
        default: true
    },
    labelKey: {
        type: String,
        default: "label"
    },
    valueKey: {
        type: String,
        default: "value"
    },
    labelInValue: {
        type: Boolean,
        default: true
    },
    labelAndValue: {
        type: Boolean,
        default: true
    },
    multiple: {
        type: Boolean,
        default: false
    },
    options: {
        type: Array as PropType<any[]>,
        default: () => []
    },
    api: {
        type: [String, Function]
    },
    params: {
        type: Object,
        default: () => {}
    },
    immediate: {
        type: Boolean,
        default: false
    },
    alwaysLoad: {
        type: Boolean,
        default: false
    },
    remote: {
        type: Boolean,
        default: false
    },
    searchKey: {
        type: String,
        default: "searchKey"
    },
    method: {
        type: String as PropType<"get" | "post">,
        default: "get"
    },
    resultField: {
        type: String,
        default: "data"
    },
    remoteFunction: {
        type: Function
    }
});

const emit = defineEmits(["change", "update:modelValue", "update:modelLabel", "focus", "blur", "visible-change", "clear"]);

const selectValue = useVModel(props, "modelValue", emit, { defaultValue: "" });
const selectLabel = useVModel(props, "modelLabel", emit, { defaultValue: "" });

const apiOptions = ref<any[]>([]);

const isLoad = ref(false);
const remoteLoading = ref(false);

onMounted(() => {
    props.immediate && getOption();
});

const defaultOption = computed(() => {
    const { multiple, valueObject, modelValue, modelLabel } = props;
    if (isEmpty(modelValue)) return [];
    if (multiple) {
        const value = modelValue as any[];
        if (valueObject) {
            return value!.filter((item) => !hasItem(item));
        }
        const arr: any[] = [];
        if (Array.isArray(modelValue)) {
            modelValue.forEach((item, index) => {
                if (!hasItem(item) && modelLabel) {
                    arr.push(joinArr(value[index], item));
                }
            });
        }
        return arr;
    } else if ((!isEmpty(modelLabel) || !isEmpty(modelValue)) && !hasItem(modelValue)) {
        return [joinArr(modelLabel, modelValue)];
    }
    return [];
});

const selectOption = computed(() => {
    const options = props.api ? apiOptions.value : props.options;
    return options.concat(defaultOption.value).filter((item) => !isEmpty(item[props.valueKey]));
});

const valueCompute = computed(() => {
    return (item: any) => (props.valueObject ? item : item[props.valueKey]);
});

const getParams = computed(() => {
    return (keyword: string | undefined) => {
        return { [props.searchKey]: keyword, ...props.params };
    };
});

const getBindValue = computed(() => {
    const { placeholder, multiple, remote, valueKey, clearable } = props;
    const attrs = useAttrs();
    const params: any = {
        placeholder,
        multiple,
        remote,
        valueKey,
        clearable,
        ...attrs
    };
    if (remote) {
        params.filterable = true;
        params["remote-method"] = remoteMethod;
    }
    return params;
});

const hasItem = (item: any) => {
    const { valueKey, valueObject, options } = props;
    const value = valueObject ? item[valueKey] : item;
    return !!(options && options.find((item) => item[valueKey] === value));
};

const joinArr = (label: any, value: any) => {
    const { labelKey, valueKey } = props;
    return {
        [labelKey]: label,
        [valueKey]: value
    };
};

const changeSelect = (val: any) => {
    const { valueObject, multiple, labelKey, valueKey, labelAndValue, labelInValue } = props;
    if (valueObject) {
        emit("change", val);
        return;
    }
    if (multiple) {
        const selectArr: any[] = selectOption.value?.filter((item: any) => val.includes(item[valueKey])) || [];

        if (labelAndValue) {
            const labelArr: string[] = selectArr.map((item) => item[labelKey]);
            selectLabel.value = labelArr || [];
        }
        emit("change", labelInValue ? selectArr : val);
    } else {
        const currentSelect = selectOption.value.find((item) => item[valueKey] === val) || {};

        if (labelAndValue) {
            selectLabel.value = currentSelect?.[labelKey] || "";
        }
        emit("change", labelInValue ? currentSelect : val);
    }
};

const remoteMethod = (keyword: string) => {
    if (!keyword) return;
    if (isFunction(props.remoteFunction)) {
        apiOptions.value = props.remoteFunction(unref(getParams)(keyword));
        return;
    }
    getOption(keyword);
};

const getOption = async (keyword?: string) => {
    const api = props.api;
    if (!api) return;
    let res: any;
    try {
        remoteLoading.value = true;
        if (isFunction(api)) {
            res = await api(unref(getParams)(keyword));
        } else {
            res = await axios[props.method](api as string, unref(getParams)(keyword));
        }
        apiOptions.value = props.resultField ? getValue(res, props.resultField) : res;
        isLoad.value = true;
    } catch (error) {
        console.error(error);
    } finally {
        remoteLoading.value = false;
    }
};

const focusSelect = () => {
    if (props.alwaysLoad || (props.api && !unref(isLoad))) {
        getOption();
    }
    emit("focus");
};

const blurSelect = () => {
    emit("blur");
};
const clearSelect = () => {
    emit("clear");
};

const visibleChange = (visible: boolean) => {
    emit("visible-change", visible);
};
</script>

<style lang="scss" scoped></style>
