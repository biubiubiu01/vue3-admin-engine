const EVAL_CACHE: { [key: string]: Function } = {};

export const evalExpressionWithConditionBuilder = (express: string, data: object): boolean => {
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

export const transformStringToFunction = (str: string) => {
    if (typeof str !== "string") return str;

    let fn;

    const fnBody = `return function(){
        const self=this;
        try {
            return (${str}).apply(self, arguments);
        } catch(e) {
            console.log(e)
        }
    }`;

    try {
        fn = new Function(fnBody)();
    } catch (e) {
        console.log(e);
    }
    return fn;
};
