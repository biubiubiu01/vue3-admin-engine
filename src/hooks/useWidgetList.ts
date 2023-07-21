import { registerComponent, createFormWidget, createCustomWidget, createLayoutWidget, createFeedbackWidget, createBasicWidget } from "@/packages";

const componentList = registerComponent();

const formWidgetList = createFormWidget();
const customWidgetList = createCustomWidget();
const layoutWidgetList = createLayoutWidget();
const feedbackWidgetList = createFeedbackWidget();
const basicWidgetList = createBasicWidget();

export const useWidgetList = () => {
    const getFormWidgetList = formWidgetList.sort((a: any, b: any) => a.sort - b.sort);

    const getCustomWidgetList = customWidgetList.sort((a: any, b: any) => a.sort - b.sort);

    const getLayoutWidgetList = layoutWidgetList.sort((a: any, b: any) => a.sort - b.sort);

    const getFeedbackWidgetList = feedbackWidgetList.sort((a: any, b: any) => a.sort - b.sort);

    const getBasicWidgetList = basicWidgetList.sort((a: any, b: any) => a.sort - b.sort);

    const getComponent = (key: string) => componentList.get(key);

    return {
        getFormWidgetList,
        getCustomWidgetList,
        getLayoutWidgetList,
        getFeedbackWidgetList,
        getBasicWidgetList,

        getComponent
    };
};
