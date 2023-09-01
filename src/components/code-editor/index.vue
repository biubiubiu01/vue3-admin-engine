<template>
    <div ref="codeEditBoxRef" class="code-editor"></div>
</template>

<script lang="ts" setup>
import * as monaco from "monaco-editor";
import JsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import CssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import HtmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import TsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import { useDark } from "@/hooks/useDark";
import { PropType } from "vue";

self.MonacoEnvironment = {
    getWorker(_: string, label: string) {
        if (label === "json") {
            return new JsonWorker();
        }
        if (label === "css" || label === "scss" || label === "less") {
            return new CssWorker();
        }
        if (label === "html" || label === "handlebars" || label === "razor") {
            return new HtmlWorker();
        }
        if (["typescript", "javascript"].includes(label)) {
            return new TsWorker();
        }
        return new EditorWorker();
    }
};

const props = defineProps({
    modelValue: {
        type: String,
        default: ""
    },
    width: {
        type: String,
        default: "100%"
    },
    height: {
        type: String,
        default: "200px"
    },
    language: {
        type: String,
        default: "css"
    },
    readOnly: {
        type: Boolean,
        default: false
    },
    lineNumbers: {
        type: String as PropType<"on" | "off">,
        default: "off"
    },
    autoFormat: {
        type: Boolean,
        default: true
    },
    options: {
        type: Object,
        default() {
            return {
                // 自适应布局
                automaticLayout: true,
                // 代码可分小段折叠
                foldingStrategy: "indentation",
                // 行亮
                renderLineHighlight: "all",
                // 颜色高亮和选择器
                colorDecorators: true,
                minimap: {
                    // 是否启用预览图
                    enabled: true
                },
                contextmenu: true,
                fontSize: 14,
                scrollBeyondLastLine: false,
                overviewRulerBorder: false,
                zIndex: 21
            };
        }
    }
});

const emit = defineEmits(["update:modelValue", "change"]);

let monacoEditor: any = null;

const codeEditBoxRef = ref<any>(null);

const { isDark } = useDark();

onMounted(() => {
    init();
});

const theme = computed(() => {
    return unref(isDark) ? "vs-dark" : "vs";
});

const init = () => {
    monacoEditor = monaco.editor.create(codeEditBoxRef.value, {
        value: props.modelValue,
        language: props.language,
        theme: theme.value,
        readOnly: props.readOnly,
        lineNumbers: props.lineNumbers,
        ...props.options
    });

    if (props.autoFormat) {
        nextTick(() => {
            setTimeout(() => {
                formatCode();
            }, 350);
        });
    }

    monacoEditor.onDidChangeModelContent(() => {
        const value = monacoEditor.getValue();
        emit("update:modelValue", value);
        emit("change", value);
    });
};

const formatCode = () => {
    monacoEditor?.getAction("editor.action.formatDocument").run();
};

onBeforeUnmount(() => {
    monacoEditor?.dispose?.();
});

watch(
    () => props.modelValue,
    (newValue) => {
        const value = monacoEditor?.getValue?.();
        if (newValue !== value) {
            monacoEditor.setValue(newValue);
            if (props.autoFormat) {
                formatCode();
            }
        }
    }
);

watch(
    () => props.options,
    (newValue) => {
        monacoEditor.updateOptions(newValue);
    },
    { deep: true }
);

watch(
    () => isDark,
    () => {
        monaco.editor.setTheme(theme.value);
    },
    { deep: true }
);

defineExpose({
    formatCode
});
</script>

<style lang="scss" scoped>
.code-editor {
    width: v-bind(width);
    height: v-bind(height);
}
</style>
