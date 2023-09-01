declare module "*.vue" {
    import type { DefineComponent } from "vue";
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

declare module "element-plus/dist/locale/zh-cn.mjs";

type TExportType = "vue2" | "vue3" | "html";

type TSchemaList = any[];
