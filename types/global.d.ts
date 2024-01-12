declare module "*.vue" {
    import type { DefineComponent } from "vue";
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

declare module "element-plus/dist/locale/zh-cn.mjs";

type LanguageType = "vue2" | "vue3" | "html";

interface ComponentEvent {
    event: string;
    params: string;
    eventName: string;
    eventCode?: string;
}

interface Component {
    id: string;
    model?: string;
    type: string;
    children?: Component[];
    onEvent: ComponentEvent[];
    [key: string]: any;
}

interface ComponentConfigEvent {
    event: string;
    params: string;
    description: string;
}

interface ComponentConfig {
    sort: number;
    componentName: string;
    title: string;
    icon: string;
    scaffold?: any;
    allowDrag?: string[];
    isFormItem?: boolean;
    onEvent?: ComponentEvent[];
    isWrapper?: boolean;
    events?: ComponentConfigEvent[];
    description: string;
    hidden?: boolean;
    style?: any;
    pipeIn?: ({ data, item, preview }: { data: object; item: Component; preview: boolean }) => any;
    allowClear?: boolean;
}

interface DateOption {
    label: string;
    value: string;
    format: string;
    valueFormat: string;
}

interface LabelRemark {
    icon?: string;
    trigger?: string;
    placement?: string;
    title?: string;
    content?: string;
}

interface Tpl {
    label: string;
    name: string;
    type: string;
    [key: string]: any;
}

type PropsType = "dev" | "prod";

interface AnyObject {
    [key: string]: any;
}
