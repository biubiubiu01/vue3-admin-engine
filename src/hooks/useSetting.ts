import { registerSetting } from "@/packages";

export const useSetting = () => {
    const settingList = registerSetting();

    const getComponentSetting = (key: string) => settingList.get(key);

    return {
        getComponentSetting
    };
};
