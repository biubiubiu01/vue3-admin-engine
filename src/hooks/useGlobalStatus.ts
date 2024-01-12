import { useFullscreen as fullscreen } from "@vueuse/core";

const { toggle, isFullscreen } = fullscreen();
const preview = <Ref<boolean>>ref(false);

export const useFullscreen = () => {
    return [isFullscreen, toggle];
};

export const usePreview = () => {
    const togglePreview = () => {
        preview.value = !preview.value;
    };

    return <[Ref<boolean>, () => void]>[preview, togglePreview];
};
