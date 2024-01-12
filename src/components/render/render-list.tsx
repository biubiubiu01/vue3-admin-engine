export default defineComponent({
    props: {
        schema: {
            type: Array as PropType<Component[]>,
            default: () => []
        },
        preview: {
            type: Boolean,
            default: false
        },
        data: {
            type: Object as PropType<AnyObject>,
            default: () => {}
        },
        type: {
            type: String as PropType<"editor" | "setting">,
            default: "editor"
        }
    },
    setup(props, context) {
        return () => {
            const { type, schema, preview, data } = props;

            return schema.map((schemaItem) => {
                if (type === "editor") {
                    return <render-item preview={preview} item={schemaItem} data={data}></render-item>;
                }
                return <render-setting item={schemaItem} data={data}></render-setting>;
            });
        };
    }
});
