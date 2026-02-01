export type TemplateMeta = {
    id: string;
    name: string;
    description: string;
    component: "business";
    schema: any;
};

export const templatesDB: TemplateMeta[] = [
    {
        id: "tpl-business-1",
        name: "Business Landing",
        description: "Жижиг, дунд бизнесэд зориулсан",
        component: "business",
        schema: {
            hero: {
                title: "string",
                subtitle: "string",
                image: "image",
            },
            about: {
                text: "text",
                image: "image",
            },
            menu: {
                type: "repeat",
                fields: {
                    name: "string",
                    desc: "string",
                    price: "string",
                },
            },
        },
    },
];
