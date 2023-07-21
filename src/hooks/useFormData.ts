import { useStorage } from "./useStorage";
import { ElMessage } from "element-plus";
import { deepClone, omit } from "@/utils";
import { useNanoid } from "./useNanoid";

const { setItem, getItem } = useStorage();
const sessionKey = "PAGE_SCHEMA";

const state = reactive<any>({
    formJson: [],
    formModel: {},
    activeId: ""
});

const cacheSchema = JSON.parse(getItem(sessionKey));

if (cacheSchema) {
    state.formJson = cacheSchema;
}

export const useFormData = () => {
    const getFormJson = computed(() => state.formJson);
    const getFormModel = computed(() => state.formModel);
    const getActiveId = computed(() => state.activeId);
    const getActiveInfo = computed(() => {
        return unref(getFormJson).find((item: any) => item.id === unref(getActiveId)) ?? {};
    });

    const createJson = (json: any) => {
        const newClone = deepClone(json.scaffold);

        const id = useNanoid();
        newClone.id = id;

        return newClone;
    };

    const addJson = (json: any, index: number = state.formJson.length, parent = state.formJson) => {
        // const newJson = createJson(json);
        // parent.splice(index, 0, newJson);
        // setActive(newJson.id);
    };

    const deleteJson = (index: number, parent = state.formJson) => {
        // parent.splice(index, 1);
        // let activeIndex = index + 1;
        // if (index === 0) {
        //     activeIndex = 0;
        // }
        // if (activeIndex > parent.length - 1) {
        //     activeIndex = parent.length - 1;
        // }
        // setActive(parent[activeIndex]?.id || "");
    };

    const clearJson = () => {
        state.formJson = [];
        state.formModel = {};
        state.activeId = "";
        saveSession(false);
    };

    const setActive = (id: string) => {
        if (state.activeId === id) return;
        state.activeId = id;
    };

    const saveSession = (message = true) => {
        setItem(sessionKey, JSON.stringify(state.formJson));
        if (message) {
            ElMessage.success("保存到本地成功");
        }
    };

    return {
        getFormJson,
        getFormModel,
        getActiveId,
        getActiveInfo,

        addJson,
        createJson,
        deleteJson,
        clearJson,
        saveSession,
        setActive
    };
};
