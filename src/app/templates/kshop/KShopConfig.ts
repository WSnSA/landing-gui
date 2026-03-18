export interface KShopProduct {
  name: string;
  price: string;
  originalPrice?: string;
  tag?: string;       // "Шинэ", "Sale", "Онцлох"
  category: string;
  emoji: string;      // placeholder дүрс (зураг байхгүй үед)
}

export interface KShopCategory {
  icon: string;
  name: string;
}

export interface KShopStep {
  title: string;
  desc: string;
}

export interface KShopReview {
  text: string;
  name: string;
  product: string;
}

export type KShopPrimaryColor = "pink" | "rose" | "violet" | "amber" | "slate";

export interface KShopConfig {
  __type: "online_shop";
  brandName: string;
  brandLogo: string;
  tagline: string;
  taglineHighlight: string;
  description: string;
  badge: string;
  primaryColor: KShopPrimaryColor;

  promoText: string;
  promoSub: string;

  categories: KShopCategory[];

  productsTitle: string;
  products: KShopProduct[];

  stepsTitle: string;
  steps: KShopStep[];

  reviews: KShopReview[];

  phone: string;
  facebook: string;
  instagram: string;
  deliveryNote: string;

  ctaText: string;
  slugPreview: string;
}

export type KShopTheme = {
  accent: string;
  accentHover: string;
  accentText: string;
  accentBg: string;
  accentBorder: string;
  accentGradient: string;
  heroBg: string;
  tagSale: string;
  tagNew: string;
};

export const KSHOP_THEMES: Record<KShopPrimaryColor, KShopTheme> = {
  pink: {
    accent: "bg-pink-500", accentHover: "hover:bg-pink-600",
    accentText: "text-pink-500", accentBg: "bg-pink-50",
    accentBorder: "border-pink-200", accentGradient: "from-pink-500 to-rose-400",
    heroBg: "from-pink-50 via-rose-50 to-white",
    tagSale: "bg-rose-500 text-white", tagNew: "bg-pink-500 text-white",
  },
  rose: {
    accent: "bg-rose-500", accentHover: "hover:bg-rose-600",
    accentText: "text-rose-500", accentBg: "bg-rose-50",
    accentBorder: "border-rose-200", accentGradient: "from-rose-500 to-pink-400",
    heroBg: "from-rose-50 via-pink-50 to-white",
    tagSale: "bg-rose-600 text-white", tagNew: "bg-rose-500 text-white",
  },
  violet: {
    accent: "bg-violet-500", accentHover: "hover:bg-violet-600",
    accentText: "text-violet-600", accentBg: "bg-violet-50",
    accentBorder: "border-violet-200", accentGradient: "from-violet-500 to-purple-400",
    heroBg: "from-violet-50 via-purple-50 to-white",
    tagSale: "bg-rose-500 text-white", tagNew: "bg-violet-500 text-white",
  },
  amber: {
    accent: "bg-amber-500", accentHover: "hover:bg-amber-600",
    accentText: "text-amber-600", accentBg: "bg-amber-50",
    accentBorder: "border-amber-200", accentGradient: "from-amber-400 to-orange-400",
    heroBg: "from-amber-50 via-orange-50 to-white",
    tagSale: "bg-rose-500 text-white", tagNew: "bg-amber-500 text-white",
  },
  slate: {
    accent: "bg-slate-800", accentHover: "hover:bg-slate-900",
    accentText: "text-slate-800", accentBg: "bg-slate-100",
    accentBorder: "border-slate-300", accentGradient: "from-slate-700 to-slate-900",
    heroBg: "from-slate-100 via-slate-50 to-white",
    tagSale: "bg-rose-500 text-white", tagNew: "bg-slate-700 text-white",
  },
};

export const DEFAULT_KSHOP_CONFIG: KShopConfig = {
  __type: "online_shop",
  brandName: "Korean Shop",
  brandLogo: "",
  tagline: "К-Фэшн,",
  taglineHighlight: "чиний хэв маяг.",
  description: "Солонгос загварын хамгийн сүүлийн үеийн цуглуулга. Эрэгтэй, эмэгтэй, хүүхдийн хувцас — чанартай, үнэ хүртээмжтэй.",
  badge: "🇰🇷 Солонгосоос шууд · Хүргэлттэй",
  primaryColor: "pink",

  promoText: "Зуны шинэ цуглуулга ирлээ!",
  promoSub: "Бүх захиалгад үнэгүй хүргэлт · 50,000₮-с дээш",

  categories: [
    { icon: "👗", name: "Эмэгтэй" },
    { icon: "👔", name: "Эрэгтэй" },
    { icon: "👧", name: "Хүүхэд" },
    { icon: "👟", name: "Гутал" },
    { icon: "👜", name: "Цүнх" },
    { icon: "💍", name: "Гоёл" },
  ],

  productsTitle: "Шинэ бараанууд",
  products: [
    { name: "Oversize Hoodie",       price: "89,000₮",  originalPrice: "120,000₮", tag: "Sale",  category: "Эрэгтэй",  emoji: "🧥" },
    { name: "Floral Mini Dress",     price: "95,000₮",  originalPrice: "",          tag: "Шинэ", category: "Эмэгтэй", emoji: "👗" },
    { name: "Wide-leg Denim",        price: "110,000₮", originalPrice: "",          tag: "Шинэ", category: "Эмэгтэй", emoji: "👖" },
    { name: "Stripe Polo Shirt",     price: "65,000₮",  originalPrice: "80,000₮",  tag: "Sale",  category: "Эрэгтэй",  emoji: "👕" },
    { name: "Canvas Tote Bag",       price: "45,000₮",  originalPrice: "",          tag: "",      category: "Цүнх",     emoji: "👜" },
    { name: "Platform Sneakers",     price: "149,000₮", originalPrice: "",          tag: "Онцлох", category: "Гутал",   emoji: "👟" },
    { name: "Knit Cardigan Set",     price: "120,000₮", originalPrice: "150,000₮", tag: "Sale",  category: "Эмэгтэй", emoji: "🧶" },
    { name: "Kids Cartoon Tee",      price: "35,000₮",  originalPrice: "",          tag: "Шинэ", category: "Хүүхэд",  emoji: "👧" },
  ],

  stepsTitle: "Хэрхэн захиалах вэ?",
  steps: [
    { title: "Бараа сонго",     desc: "Facebook эсвэл Instagram-аас сонирхсон бараагаа илгээнэ үү." },
    { title: "Захиалга баталга", desc: "Бид тань руу холбогдож захиалгыг баталгаажуулна." },
    { title: "Төлбөр & Хүргэлт", desc: "Хаанч дансаар төлбөр хийгээд 1-3 хоногт хүргэнэ." },
  ],

  reviews: [
    { text: "Маш сайн чанартай байлаа, зураг дээр байгаатай яг адилхан. Дахиад авна!", name: "Б. Нарантуяа", product: "Floral Mini Dress" },
    { text: "Хурдан хүргэсэн, савлалт нь ч гоё байсан. Korean shop-г итгэлтэй зөвлөнө.", name: "Д. Мөнхбат", product: "Oversize Hoodie" },
    { text: "Үнэ нь маш хүртээмжтэй, чанар нь гайхалтай. Идэр наснаас нь хойш ийм сайн дэлгүүр олоогүй байлаа.", name: "О. Цэцэгмаа", product: "Wide-leg Denim" },
  ],

  phone: "9911-2233",
  facebook: "koreanshop11",
  instagram: "koreanshop.mn",
  deliveryNote: "Улаанбаатар хот дотор 1-2 хоног · Орон нутаг 3-5 хоног",

  ctaText: "Захиалга өгөх",
  slugPreview: "korean-shop",
};
