import { deepClone } from "@/utils";
import { useWidgetList } from "./useWidgetList";

export const useFormRules = (json: any[]) => {
    const { isFormItem } = useWidgetList();

    const getRules = computed(() => {
        const rules: any = {};
        const deepJson = deepClone(json);

        while (deepJson.length) {
            const item = deepJson.shift();

            if (item?.children?.length) {
                item.children.forEach((child: any) => {
                    deepJson.push(child);
                });
            }

            if (!isFormItem(item.type)) {
                continue;
            }

            const { validateTrigger: trigger = "change" } = item;
            const rule: any[] = [{ required: !!item.validateRequired, trigger, message: item.validateMessage || `${item.label}不能为空` }];
            if (item.validateMax && item.validateMax.number) {
                rule.push({
                    max: item.validateMax.number,
                    trigger,
                    message: item.validateMax.message || `最多输入${item.validateMax.number}个字符`
                });
            }
            if (item.validateMin && item.validateMin.number) {
                rule.push({
                    min: item.validateMin.number,
                    trigger,
                    message: item.validateMin.message || `至少输入${item.validateMin.number}个字符`
                });
            }
            rules[item.model] = rule;
        }

        return rules;
    });

    return {
        getRules
    };
};
