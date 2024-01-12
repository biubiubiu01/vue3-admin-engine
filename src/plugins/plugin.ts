interface Plugin {
    pluginName: string;
    url: string;
    import: string;
}

interface Component {
    componentName: string;
    component: string;
    url: string;
    import: string;
}

const pluginList: Plugin[] = [
    {
        pluginName: "dayjs",
        url: "https://unpkg.com/dayjs@1.8.21/dayjs.min.js;",
        import: `import { dayjs } from "element-plus";`
    }
];

const componentList: Component[] = [
    {
        componentName: "base-input-number",
        component: "baseInputNumber",
        url: `/components/base-input-number.js`,
        import: `import baseInputNumber from "@/components/base-input-number";`
    },
    {
        componentName: "base-select",
        component: "baseSelect",
        url: `/components/base-select.js`,
        import: `import baseSelect from "@/components/base-select";`
    }
];

export const getPlugin = (plugin: string) => pluginList.find((item) => item.pluginName === plugin);

export const getComponent = (name: string) => componentList.find((item) => item.componentName === name);
