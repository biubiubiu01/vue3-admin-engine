const EVAL_CACHE: { [key: string]: Function } = {};

export const evalExpressionWithConditionBuilder = (express: any, data: object): boolean => {
    if (!express || typeof express !== "string") {
        return false;
    }
    let fn;

    if (express in EVAL_CACHE) {
        fn = EVAL_CACHE[express];
    } else {
        fn = new Function("data", `return !!(${express})`);
        EVAL_CACHE[express] = fn;
    }
    return fn(data);
};
