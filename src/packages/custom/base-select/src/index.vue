<template>
    <api-select v-bind="getBindValue" />
</template>

<script lang="ts" setup>
import axios from "axios";

const props = defineProps({
    source: {
        type: Object
    }
});

const attrs = useAttrs();

const getBindValue = computed(() => {
    const params = { ...attrs };
    if (props.source && props.source.url) {
        const { headerList } = props.source;
        headerList.forEach((item: any) => {
            axios.defaults.headers.common[item.key] = item.value;
        });
        Object.assign(params, {
            api: props.source.url,
            method: props.source.method,
            resultField: props.source.resultField,
            params: props.source.params ? JSON.parse(props.source.params) : {}
        });
    }
    return params;
});
</script>

<style lang="scss" scoped></style>
