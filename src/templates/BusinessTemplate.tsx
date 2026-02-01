type BusinessContent = {
    hero: {
        title: string;
        subtitle: string;
        image: string;
    };
    about: {
        text: string;
        image: string;
    };
    menu: {
        items: {
            name: string;
            desc: string;
            price: string;
        }[];
    };
};

export default function BusinessTemplate({ data }: { data: BusinessContent }) {
    return (
        <div className="bg-white">

            {/* HERO */}
            <section>
                <h1>{data.hero.title}</h1>
                <p>{data.hero.subtitle}</p>
                <img src={data.hero.image} />
            </section>

            {/* ABOUT */}
            <section>
                <img src={data.about.image} />
                <p>{data.about.text}</p>
            </section>

            {/* MENU */}
            <section>
                {data.menu?.items?.length ? (
                    data.menu.items.map((item, i) => (
                        <div key={i}>
                            <div>{item.name}</div>
                            <div>{item.desc}</div>
                            <div>{item.price}</div>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-400">Цэс оруулаагүй байна</div>
                )}

                {}
            </section>

        </div>
    );
}
