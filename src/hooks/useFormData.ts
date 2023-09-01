import { useStorage } from "./useStorage";
import { useNanoid } from "./useNanoid";
import { ElMessage } from "element-plus";
import { deepClone } from "@/utils";

const { setItem, getItem } = useStorage("local");
const sessionKey = "PAGE_SCHEMA";

const state = reactive<any>({
    schemaJson: [],
    activeId: ""
});

const cacheSchema = JSON.parse(getItem(sessionKey));

if (cacheSchema) {
    state.schemaJson = cacheSchema;
}

export const useFormData = () => {
    const getSchemaJson = computed(() => state.schemaJson);
    const getActiveId = computed(() => state.activeId);
    const getActiveInfo = computed(() => {
        return getNodeById(unref(getActiveId)) ?? {};
    });

    const beforeDisabled = computed(() => {
        return getNodeIndex(unref(getActiveId)) === 0;
    });

    const afterDisabled = computed(() => {
        return getNodeIndex(unref(getActiveId)) === getParentById(unref(getActiveId)).length - 1;
    });

    const getNodeIndex = (id: string) => {
        return getParentById(id).findIndex((item: any) => item.id === id);
    };

    const getNodeById = (id: string, list = getSchemaJson.value): any => {
        for (const item of list) {
            if (item.id === id) {
                return item;
            }
            if (item.children?.length) {
                const childItem = getNodeById(id, item.children);
                if (childItem) {
                    return childItem;
                }
            }
        }
        return undefined;
    };

    const getParentById = (id: string) => {
        if (!id) return getSchemaJson.value;
        const paths = getPathById(getSchemaJson.value, id);

        paths?.pop();
        if (paths && paths.length > 0) {
            const node = getNodeById(paths[paths.length - 1]);
            if (node) return node.children;
        }
        return getSchemaJson.value;
    };

    const getPathById = (json: any[], id: string): string[] | null => {
        let resolved: boolean = false;
        let paths: Array<string> = [];

        const stack: Array<any> = json.map((item) => {
            return {
                path: item.id,
                data: item
            };
        });

        while (stack.length) {
            const item = stack.shift();
            const data = item.data;
            const path = item.path;

            if (data.id === id) {
                resolved = true;
                paths = path.split("/");
                break;
            }

            if (data?.children?.length) {
                data.children.forEach((child: any) => {
                    stack.push({
                        data: child,
                        path: `${data.id}/${child.id}`
                    });
                });
            }
        }

        return resolved ? paths : null;
    };

    const createJson = (json: any) => {
        const newClone = deepClone(json.scaffold ?? json);

        if (newClone.children) {
            newClone.children = newClone.children.map((item: any) => createJson(item));
        }

        const id = useNanoid();
        newClone.id = id;
        newClone.model = `${newClone.type}_${id}`;

        return newClone;
    };

    const copyJson = (json: any) => {
        const newJson = createJson(json);
        const parentJson = getParentById(json.id);
        const index = getNodeIndex(json.id);

        parentJson.splice(index, 0, newJson);
        setActive(newJson.id);
    };

    const moveToBefore = (id: string) => {
        const index = getNodeIndex(id);
        const parentJson = getParentById(id);

        [parentJson[index], parentJson[index - 1]] = [parentJson[index - 1], parentJson[index]];
    };

    const moveToAfter = (id: string) => {
        const index = getNodeIndex(id);
        const parentJson = getParentById(id);

        [parentJson[index], parentJson[index + 1]] = [parentJson[index + 1], parentJson[index]];
    };

    const deleteJson = (id: string) => {
        const index = getNodeIndex(id);
        const parentJson = getParentById(id);

        parentJson.splice(index, 1);
    };

    const clearJson = () => {
        state.schemaJson = [];
        state.activeId = "";
        saveSession(false);
    };

    const setActive = (id: string) => {
        if (state.activeId === id) return;
        state.activeId = id;
    };

    const saveSession = (message = true) => {
        setItem(sessionKey, JSON.stringify(state.schemaJson));
        if (message) {
            ElMessage.success("已保存到本地");
        }
    };

    const updateSchema = (json: any[]) => {
        state.schemaJson = json;
    };

    return {
        getSchemaJson,
        getActiveId,
        getNodeById,
        getActiveInfo,
        beforeDisabled,
        afterDisabled,

        copyJson,
        createJson,
        deleteJson,
        clearJson,
        saveSession,
        setActive,
        moveToBefore,
        moveToAfter,
        updateSchema
    };
};
