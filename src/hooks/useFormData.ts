import { useStorage } from "./useStorage";
import { useNanoid } from "./useNanoid";
import { ElMessage } from "element-plus";
import { deepClone } from "@/utils";

const { setItem, getItem } = useStorage("local");
const sessionKey = "PAGE_SCHEMA";

interface Schema {
    schemaJson: Component[];
    activeId: string;
}

interface SchemaPath {
    data: Component;
    path: string;
}

const id = useNanoid();

const state = reactive<Schema>({
    schemaJson: [],
    activeId: id
});

const cacheSchema = JSON.parse(getItem(sessionKey));

if (cacheSchema && cacheSchema.length > 0) {
    state.schemaJson = cacheSchema;
    state.activeId = "";
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

    const pageDisabled = computed(() => {
        return getSchemaJson.value.length === 1 && getSchemaJson.value[0].id === getActiveId.value;
    });

    const getNodeIndex = (id: string) => {
        return getParentById(id).findIndex((item: Component) => item.id === id);
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

    const getPathById = (json: Component[], id: string): string[] | null => {
        let resolved: boolean = false;
        let paths: Array<string> = [];

        const stack: Array<SchemaPath> = json.map((item) => {
            return {
                path: item.id,
                data: item
            };
        });

        while (stack.length) {
            const item = stack.shift() as SchemaPath;
            const data = item.data;
            const path = item.path;

            if (data.id === id) {
                resolved = true;
                paths = path.split("/");
                break;
            }

            if (data?.children?.length) {
                data.children.forEach((child: Component) => {
                    stack.push({
                        data: child,
                        path: `${data.id}/${child.id}`
                    });
                });
            }
        }

        return resolved ? paths : null;
    };

    const createJson = (json: Component) => {
        const newClone = deepClone(json.scaffold ?? json);

        if (newClone.children) {
            newClone.children = newClone.children.map((item: Component) => createJson(item));
        }

        const id = useNanoid();
        newClone.id = id;
        newClone.model = id;

        return newClone;
    };

    const copyJson = (json: Component) => {
        const newJson = createJson(json);
        const parentJson = getParentById(json.id);
        const index = getNodeIndex(json.id);

        parentJson.splice(index + 1, 0, newJson);
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
        state.activeId = "";

        parentJson.splice(index, 1);
    };

    const clearJson = () => {
        state.schemaJson[0].children = [];
        state.schemaJson = state.schemaJson.slice(0, 1);
        state.activeId = "";
        saveSession(false);
    };

    const clearCurrent = (json: Component) => {
        json.children = [];
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

    const updateSchema = (json: Component[]) => {
        state.schemaJson = json;
    };

    return {
        getSchemaJson,
        getActiveId,
        getNodeById,
        getActiveInfo,
        beforeDisabled,
        afterDisabled,
        pageDisabled,

        copyJson,
        createJson,
        deleteJson,
        clearJson,
        saveSession,
        setActive,
        moveToBefore,
        moveToAfter,
        updateSchema,
        clearCurrent
    };
};
