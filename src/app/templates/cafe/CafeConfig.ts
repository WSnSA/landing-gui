export interface CafeMenuItem { icon: string; name: string; price: string; desc: string; }
export interface CafeFeature { icon: string; title: string; desc: string; }
export interface CafeReview { text: string; name: string; role: string; }
export interface CafeHours { day: string; time: string; }
export type CafePrimaryColor = "amber" | "blue" | "emerald" | "rose" | "violet";

export interface CafeConfig {
  __type: "animated_cafe";
  brandName: string;
  brandLogo: string;       // зургийн URL, хоосон бол эхний үсэг харагдана
  tagline: string;
  taglineHighlight: string;
  description: string;
  badge: string;
  primaryColor: CafePrimaryColor;
  menuTitle: string;
  menuSubtitle: string;
  menuItems: CafeMenuItem[];
  featuresTitle: string;
  featuresSubtitle: string;
  features: CafeFeature[];
  reviews: CafeReview[];
  hours: CafeHours[];
  address: string;
  addressNote: string;
  phone: string;
  email: string;
  ctaText: string;
  ctaSubtext: string;
  slugPreview: string;
}

export type ColorTheme = {
  badgeText: string; badgeDot: string; h1Highlight: string;
  btnBg: string; btnHover: string; checkmark: string;
  priceText: string; sectionLabel: string; starsColor: string;
  ctaBg: string; ctaBtnBg: string; ctaBtnHover: string; ctaBtnText: string;
  footerIconBg: string; blob1: string; blob2: string; blob3: string; featureBlob: string;
};

export const COLOR_THEMES: Record<CafePrimaryColor, ColorTheme> = {
  amber: {
    badgeText: "text-amber-700", badgeDot: "bg-amber-500", h1Highlight: "text-amber-600",
    btnBg: "bg-amber-600", btnHover: "hover:bg-amber-700", checkmark: "text-amber-500",
    priceText: "text-amber-600", sectionLabel: "text-amber-600", starsColor: "text-amber-400",
    ctaBg: "bg-amber-600", ctaBtnBg: "bg-white", ctaBtnHover: "hover:bg-amber-50", ctaBtnText: "text-amber-700",
    footerIconBg: "bg-amber-600",
    blob1: "bg-amber-300", blob2: "bg-orange-300", blob3: "bg-yellow-200", featureBlob: "bg-amber-100",
  },
  blue: {
    badgeText: "text-blue-600", badgeDot: "bg-blue-500", h1Highlight: "text-blue-600",
    btnBg: "bg-blue-600", btnHover: "hover:bg-blue-700", checkmark: "text-blue-500",
    priceText: "text-blue-600", sectionLabel: "text-blue-600", starsColor: "text-yellow-400",
    ctaBg: "bg-blue-600", ctaBtnBg: "bg-white", ctaBtnHover: "hover:bg-blue-50", ctaBtnText: "text-blue-700",
    footerIconBg: "bg-blue-600",
    blob1: "bg-blue-400", blob2: "bg-indigo-400", blob3: "bg-sky-300", featureBlob: "bg-blue-100",
  },
  emerald: {
    badgeText: "text-emerald-700", badgeDot: "bg-emerald-500", h1Highlight: "text-emerald-600",
    btnBg: "bg-emerald-600", btnHover: "hover:bg-emerald-700", checkmark: "text-emerald-500",
    priceText: "text-emerald-600", sectionLabel: "text-emerald-600", starsColor: "text-yellow-400",
    ctaBg: "bg-emerald-600", ctaBtnBg: "bg-white", ctaBtnHover: "hover:bg-emerald-50", ctaBtnText: "text-emerald-700",
    footerIconBg: "bg-emerald-600",
    blob1: "bg-emerald-300", blob2: "bg-teal-300", blob3: "bg-green-200", featureBlob: "bg-emerald-100",
  },
  rose: {
    badgeText: "text-rose-600", badgeDot: "bg-rose-500", h1Highlight: "text-rose-600",
    btnBg: "bg-rose-600", btnHover: "hover:bg-rose-700", checkmark: "text-rose-500",
    priceText: "text-rose-600", sectionLabel: "text-rose-600", starsColor: "text-yellow-400",
    ctaBg: "bg-rose-600", ctaBtnBg: "bg-white", ctaBtnHover: "hover:bg-rose-50", ctaBtnText: "text-rose-700",
    footerIconBg: "bg-rose-600",
    blob1: "bg-rose-300", blob2: "bg-pink-300", blob3: "bg-fuchsia-200", featureBlob: "bg-rose-100",
  },
  violet: {
    badgeText: "text-violet-600", badgeDot: "bg-violet-500", h1Highlight: "text-violet-600",
    btnBg: "bg-violet-600", btnHover: "hover:bg-violet-700", checkmark: "text-violet-500",
    priceText: "text-violet-600", sectionLabel: "text-violet-600", starsColor: "text-yellow-400",
    ctaBg: "bg-violet-600", ctaBtnBg: "bg-white", ctaBtnHover: "hover:bg-violet-50", ctaBtnText: "text-violet-700",
    footerIconBg: "bg-violet-600",
    blob1: "bg-violet-300", blob2: "bg-purple-300", blob3: "bg-indigo-200", featureBlob: "bg-violet-100",
  },
};

export const DEFAULT_CAFE_CONFIG: CafeConfig = {
  __type: "animated_cafe",
  brandName: "Copper Cup Coffee",
  brandLogo: "",
  tagline: "Specialty coffee,",
  taglineHighlight: "authentic vibe.",
  description: "Монголын анхны third-wave кофе шоп. Гарал үүслийг нь мэддэг, шинжлэх ухааны аргаар бэлтгэсэн кофе — таны өдрийг эхлүүлнэ.",
  badge: "СБД, 4-р хороо · Өдөр бүр 08:00–22:00",
  primaryColor: "amber",
  menuTitle: "Манай меню",
  menuSubtitle: "Шилмэл кофе & pastry",
  menuItems: [
    { icon: "Coffee",       name: "Espresso",    price: "4,500₮", desc: "Single origin Ethiopian" },
    { icon: "Milk",         name: "Flat White",  price: "6,500₮", desc: "Velvet micro-foam сүүтэй" },
    { icon: "Leaf",         name: "Matcha Latte",price: "7,000₮", desc: "Ceremonial grade matcha" },
    { icon: "Croissant",    name: "Croissant",   price: "5,500₮", desc: "Өглөөний шинэ гаргалт" },
    { icon: "Cake",         name: "Cheesecake",  price: "8,000₮", desc: "New-York style, гэрийн хийц" },
    { icon: "GlassWater",   name: "Cold Brew",   price: "7,500₮", desc: "12 цаг дарамтласан" },
  ],
  featuresTitle: "Яагаад бидэнд ирэх вэ?",
  featuresSubtitle: "Зүгээр кофе биш",
  features: [
    { icon: "Leaf",       title: "Single Origin",       desc: "Этиоп, Колумб, Бразил — гарал үүслийг мэддэг кофе." },
    { icon: "Music",      title: "Затишная орчин",      desc: "Jazz хөгжим, дулаан гэрэлтүүлэг, ажиллахад тохиромжтой." },
    { icon: "Wifi",       title: "Хурдан Wi-Fi",        desc: "300 Mbps, үнэгүй. Password-гүй холбогдоно." },
    { icon: "Truck",      title: "Хүргэлт",             desc: "СБД хороолол дотор 30 минутад хүргэнэ." },
    { icon: "Smartphone", title: "Урьдчилан захиалга",  desc: "Апп-аар захиалаад дараалалгүй авна." },
    { icon: "Gift",       title: "Loyalty card",        desc: "5 удаа ирвэл 1 Americano үнэгүй." },
  ],
  reviews: [
    { text: "Улаанбаатарт байхаасаа specialty coffee олоход хэцүү байсан. Copper Cup бол миний нээлт!", name: "Д. Нарантуяа", role: "Graphic designer" },
    { text: "Ажиллах орчин маш тохиромжтой. Wi-Fi хурдан, хөгжим зэргийн чимээ. Дахин ирнэ.", name: "Б. Отгонбаяр", role: "Freelance developer" },
    { text: "Flat white-г нь уучихаад өөр газрын кофе унших болоогүй. Маш гоё!", name: "Э. Солонго", role: "Маркетер" },
  ],
  hours: [
    { day: "Даваа – Баасан", time: "08:00 – 22:00" },
    { day: "Бямба",          time: "09:00 – 23:00" },
    { day: "Ням",            time: "10:00 – 21:00" },
  ],
  address: "Улаанбаатар хот, СБД, 4-р хороо, Их Тойруу гудамж 12",
  addressNote: "Монгол банкны баруун талд",
  phone: "09-9988-7766",
  email: "info@coppercup.mn",
  ctaText: "Өнөөдөр нэг сайн кофе уу.",
  ctaSubtext: "Урьдчилан захиалах эсвэл шууд ирж болно.",
  slugPreview: "copper-cup",
};
