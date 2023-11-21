import { compileString } from "sass";

const globalStyle: Ref<string> = ref("");
const STYLE_MARK = "custom_style";

export const useGlobalStyle = () => {
    const getStyle = computed(() => globalStyle.value);
    const getCompileStyle = computed(() => compileString(getStyle.value).css);

    const setStyle = (style: string) => {
        globalStyle.value = style;
        updateStyle();
    };

    const updateStyle = () => {
        const existingStyle = document.getElementById(STYLE_MARK);
        if (!existingStyle) {
            const style: any = document.createElement("style");
            const head = document.getElementsByTagName("HEAD")[0];
            style.type = "text/css";
            style.id = STYLE_MARK;
            style.innerHTML = getCompileStyle.value;
            head.appendChild(style);
        } else {
            existingStyle.innerHTML = getStyle.value;
        }
    };

    return {
        getStyle,
        getCompileStyle,
        setStyle
    };
};
