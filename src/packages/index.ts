const registerComponent = () => {
    const componentMap = new Map<string, any>();
    const modules: any = import.meta.glob("./**/index.vue", { eager: true, import: "default" });

    Object.keys(modules).forEach((key: string) => {
        const name = key.split("/")[2];
        componentMap.set(name, modules[key]?.default || modules[key]);
    });

    return componentMap;
};

const registerSetting = () => {
    const settingMap = new Map<string, any>();
    const modules: any = import.meta.glob("./**/setting.ts", { eager: true, import: "default" });

    Object.keys(modules).forEach((key: string) => {
        const name = key.replace(/\.\/(.*)\/(.*)\/src\/setting\.ts/, "$2");
        settingMap.set(name, modules[key]?.default || modules[key]);
    });
    return settingMap;
};

const registerCode = () => {
    const codeMap = new Map<string, any>();
    const modules: any = import.meta.glob("./**/code.ts", { eager: true, import: "default" });
    Object.keys(modules).forEach((key: string) => {
        const name = key.replace(/\.\/(.*)\/(.*)\/src\/code\.ts/, "$2");
        codeMap.set(name, modules[key]?.default || modules[key]);
    });
    return codeMap;
};

const createFormWidget = () => {
    const modules: any = import.meta.glob("./widget/**/index.ts", { eager: true, import: "default" });

    return Object.values(modules);
};

const createCustomWidget = () => {
    const modules: any = import.meta.glob("./custom/**/index.ts", { eager: true, import: "default" });
    return Object.values(modules);
};

const createLayoutWidget = () => {
    const modules: any = import.meta.glob("./layout/**/index.ts", { eager: true, import: "default" });
    return Object.values(modules);
};

const createBasicWidget = () => {
    const modules: any = import.meta.glob("./basic/**/index.ts", { eager: true, import: "default" });
    return Object.values(modules);
};

const createDataWidget = () => {
    const modules: any = import.meta.glob("./data/**/index.ts", { eager: true, import: "default" });
    return Object.values(modules);
};

export const componentList = registerComponent();
export const formWidgetList = createFormWidget();
export const layoutWidgetList = createLayoutWidget();
export const customWidgetList = createCustomWidget();
export const basicWidgetList = createBasicWidget();
export const dataWidgetList = createDataWidget();
export const componentSetting = registerSetting();
export const codeList = registerCode();
