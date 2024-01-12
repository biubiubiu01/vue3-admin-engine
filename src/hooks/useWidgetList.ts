import { componentList, formWidgetList, customWidgetList, layoutWidgetList, basicWidgetList, dataWidgetList, componentSetting } from "@/packages";

export const useWidgetList = () => {
    const getFormWidgetList = sortAndFilter(formWidgetList);

    const getCustomWidgetList = sortAndFilter(customWidgetList);

    const getLayoutWidgetList = sortAndFilter(layoutWidgetList);

    const getBasicWidgetList = sortAndFilter(basicWidgetList);

    const getDataWidgetList = sortAndFilter(dataWidgetList);

    const getWidgetList: any[] = [...formWidgetList, ...customWidgetList, ...layoutWidgetList, ...basicWidgetList, ...dataWidgetList];

    function sortAndFilter(list: any[]) {
        return list.filter((item) => !item.hidden).sort((a: any, b: any) => a.sort - b.sort);
    }

    const getComponent = (key: string) => componentList.get(key);

    const getComponentProps = (key: string) => getWidgetList.find((item) => item.componentName === key);

    const getComponentSetting = (key: string) => componentSetting.get(key);

    const isFormItem = (key: string) => !!getFormWidgetList.find((item: any) => item.scaffold.type === key) || !!getComponentProps(key)?.isFormItem;

    const isWrapper = (key: string) => !!getComponentProps(key)?.isWrapper;
    return {
        getWidgetList,
        getFormWidgetList,
        getCustomWidgetList,
        getLayoutWidgetList,
        getBasicWidgetList,
        getDataWidgetList,
        getComponentSetting,
        getComponent,
        getComponentProps,
        isFormItem,
        isWrapper
    };
};
