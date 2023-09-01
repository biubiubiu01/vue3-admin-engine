import { useFullscreen as fullscreen } from "@vueuse/core";

const { toggle, isFullscreen } = fullscreen();

export const useFullscreen = () => {
    return {
        toggle,
        isFullscreen
    };
};
