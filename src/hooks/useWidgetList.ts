import { registerComponent, createFormWidget, createCustomWidget, createLayoutWidget, createBasicWidget, createDataWidget } from "@/packages";

const BaseFormItem: string[] = [];

export const useWidgetList = () => {
    const componentList = registerComponent();
    const formWidgetList = createFormWidget();
    const customWidgetList = createCustomWidget();
    const layoutWidgetList = createLayoutWidget();
    const basicWidgetList = createBasicWidget();
    const dataWidgetList = createDataWidget();

    const getFormWidgetList = sortAndFilter(formWidgetList);

    const getCustomWidgetList = sortAndFilter(customWidgetList);

    const getLayoutWidgetList = sortAndFilter(layoutWidgetList);

    const getBasicWidgetList = sortAndFilter(basicWidgetList);

    const getDataWidgetList = sortAndFilter(dataWidgetList);

    function sortAndFilter(list: any[]) {
        return list.filter((item) => !item.hidden).sort((a: any, b: any) => a.sort - b.sort);
    }

    const getComponent = (key: string) => componentList.get(key);

    const isFormComp = (type: string) => !!getFormWidgetList.find((item: any) => item.scaffold.type === type || BaseFormItem.includes(type));

    const isInlineComp = (type: string) => !!getBasicWidgetList.find((item: any) => item.scaffold.type === type);
    return {
        getFormWidgetList,
        getCustomWidgetList,
        getLayoutWidgetList,
        getBasicWidgetList,
        getDataWidgetList,

        getComponent,
        isFormComp,
        isInlineComp
    };
};
