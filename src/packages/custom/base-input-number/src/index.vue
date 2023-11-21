<template>
    <el-input v-model="inputValue" type="number" placeholder="请输入" :disabled="disabled" @change="handleInputChange" @keydown="channelInputLimit">
        <template #prepend v-if="$slots.prepend">
            <slot name="prepend"></slot>
        </template>
        <template #append v-if="$slots.append">
            <slot name="append"></slot>
        </template>
    </el-input>
</template>

<script lang="ts" setup>
import { PropType } from "vue";

const props = defineProps({
    modelValue: {
        type: [String, Number]
    },
    disabled: {
        type: Boolean,
        default: false
    },
    precision: {
        type: Number,
        default: 0,
        validator: (val: number) => val >= 0 && val === Number.parseInt(`${val}`, 10)
    },
    max: {
        type: Number as PropType<any>,
        default: Number.POSITIVE_INFINITY
    },
    min: {
        type: Number as PropType<any>,
        default: Number.NEGATIVE_INFINITY
    },
    step: {
        type: Number as PropType<any>,
        default: 0
    }
});

const emit = defineEmits(["input", "change"]);

const inputValue = ref("");

const channelInputLimit = (e: any) => {
    const key = e.key;
    if (["E", "e"].includes(key)) {
        e.returnValue = false;
        return false;
    }
    return true;
};

const handleInputChange = (value: any) => {
    const newVal = value !== "" ? Number(value) : "";
    inputValue.value = verifyValue(newVal);
    emit("input", inputValue.value);
    emit("change", inputValue.value);
};

const verifyValue = (value: any) => {
    const { max, min, precision, step } = props;
    let newVal = Number(value);
    if (value === "") {
        return null;
    }
    if (value === null || value === undefined || Number.isNaN(newVal)) {
        return value ?? null;
    }
    newVal = toPrecision(newVal, precision);
    if (newVal > max || newVal < min) {
        newVal = newVal > max ? max : parseFloat(min) + parseFloat(step);
    }
    return newVal;
};

const toPrecision = (num: number, pre: number) => {
    if (pre === 0) return Math.round(num);
    let snum = String(num);
    const pointPos = snum.indexOf(".");
    if (pointPos === -1) return num;
    const nums = snum.replace(".", "").split("");
    const datum = nums[pointPos + pre];
    if (!datum) return num;
    const length = snum.length;
    if (snum.charAt(length - 1) === "5") {
        snum = `${snum.slice(0, Math.max(0, length - 1))}6`;
    }
    return Number.parseFloat(Number(snum).toFixed(pre));
};

watch(
    () => [props.modelValue, props.min, props.max],
    () => {
        inputValue.value = verifyValue(props.modelValue);
        emit("input", inputValue.value);
    },
    {
        immediate: true
    }
);
</script>

<style scoped></style>
