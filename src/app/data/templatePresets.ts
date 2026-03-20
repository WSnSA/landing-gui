import type { TemplateRequest } from "../types/dto";
import { DEFAULT_CAFE_CONFIG } from "../templates/cafe/CafeConfig";
import { DEFAULT_HYPERDRIVE_CONFIG } from "../templates/hyperdrive/HyperdriveConfig";
import { DEFAULT_FUTURE_CONFIG } from "../templates/future/FutureConfig";
import { DEFAULT_KSHOP_CONFIG } from "../templates/kshop/KShopConfig";

export const TEMPLATE_PRESETS: Record<string, TemplateRequest> = {
  // ── РЕСТОРАН ──────────────────────────────────────────────────────────────
  cafe: {
    name: "Animated Cafe — Кофе шоп",
    type: "restaurant",
    description: "Animated glassmorphism загвартай кофе шоп / ресторан template. Hero, меню, онцлог, сэтгэгдэл, хаяг, холбоо барих — бүгдийг builder дотор тохируулна.",
    previewImageUrl: null,
    schemaJson: JSON.stringify({ __templateType: "animated_cafe", defaultConfig: DEFAULT_CAFE_CONFIG }, null, 2),
  },
  noir_restaurant: {
    name: "Noir Restaurant — Элит ресторан",
    type: "restaurant",
    description: "Харанхуй, драматик noir загвартай элит ресторан template. Гэрэл тусгал, меню, резерваци — гоёмсог fine-dining заклад, cocktail bar-т тохиромжтой.",
    previewImageUrl: null,
    schemaJson: JSON.stringify({ __templateType: "noir_restaurant", defaultConfig: DEFAULT_CAFE_CONFIG }, null, 2),
  },
  street_food: {
    name: "Street Food — Гудамжны хоол",
    type: "restaurant",
    description: "Тод өнгө, хурдан хэмнэлтэй street food / fast food template. Онцлох хоолнууд, хурдан захиалга CTA — food truck, хурдан хоолны газарт тохиромжтой.",
    previewImageUrl: null,
    schemaJson: JSON.stringify({ __templateType: "street_food", defaultConfig: DEFAULT_CAFE_CONFIG }, null, 2),
  },
  garden_bistro: {
    name: "Garden Bistro — Цэцэрлэгт бистро",
    type: "restaurant",
    description: "Ногоон, байгалийн сэдэвтэй garden bistro template. Гэрэл, агаар, нарийхан аяга — organic café, outdoor dining, veggies ресторант тохиромжтой.",
    previewImageUrl: null,
    schemaJson: JSON.stringify({ __templateType: "garden_bistro", defaultConfig: DEFAULT_CAFE_CONFIG }, null, 2),
  },

  // ── БИЗНЕС ───────────────────────────────────────────────────────────────
  hyperdrive: {
    name: "Hyperdrive — Жолооны сургалтын төв",
    type: "business",
    description: "Dark racing-themed animated template. Дрифт/жолооны сургалтын төв, спорт клуб, авто сервист тохиромжтой. Сургалтын багцууд, онцлог, багш нар, холбоо барих бүхий бүтэн хуудас.",
    previewImageUrl: null,
    schemaJson: JSON.stringify({ __templateType: "driving_center", defaultConfig: DEFAULT_HYPERDRIVE_CONFIG }, null, 2),
  },
  atlas_agency: {
    name: "Atlas Agency — Креатив агентлаг",
    type: "business",
    description: "Орчин үеийн креатив агентлаг, маркетинг компанид зориулсан template. Портфолио, үйлчилгээ, баг, холбоо барих — branding, digital agency-д тохиромжтой.",
    previewImageUrl: null,
    schemaJson: JSON.stringify({ __templateType: "atlas_agency", defaultConfig: DEFAULT_HYPERDRIVE_CONFIG }, null, 2),
  },
  nexus_tech: {
    name: "Nexus Tech — Технологийн компани",
    type: "business",
    description: "Цэвэр, орчин үеийн tech startup / IT компанид зориулсан template. SaaS бүтээгдэхүүн, features, үнэ тариф, багийн гишүүд — B2B tech-д тохиромжтой.",
    previewImageUrl: null,
    schemaJson: JSON.stringify({ __templateType: "nexus_tech", defaultConfig: DEFAULT_HYPERDRIVE_CONFIG }, null, 2),
  },
  prism_creative: {
    name: "Prism Creative — Дизайн студи",
    type: "business",
    description: "Өнгө баялаг, дизайн-чиглэлтэй creative studio template. Ажлын жишээ, үйлчилгээ, хамтран ажиллах — graphic design, illustration, UX studio-д тохиромжтой.",
    previewImageUrl: null,
    schemaJson: JSON.stringify({ __templateType: "prism_creative", defaultConfig: DEFAULT_HYPERDRIVE_CONFIG }, null, 2),
  },

  // ── СУРГАЛТ ──────────────────────────────────────────────────────────────
  future: {
    name: "Future — Боловсролын төв",
    type: "course",
    description: "Цагаан дэвсгэртэй, gradient accent бүхий EdTech template. Хөтөлбөрүүд, элсэх алхамууд, статистик, багш нар, сэтгэгдэл — онлайн болон офлайн сургалтын төвд тохиромжтой.",
    previewImageUrl: null,
    schemaJson: JSON.stringify({ __templateType: "education_center", defaultConfig: DEFAULT_FUTURE_CONFIG }, null, 2),
  },
  bloom_kids: {
    name: "Bloom Kids — Хүүхдийн сургалт",
    type: "course",
    description: "Тод өнгө, хөгжилтэй хүүхдийн сургалтын төв template. Ангиуд, зааварлах арга, эцэг эхчүүдэд зориулсан мэдээлэл — kindergarten, хүүхдийн клуб-т тохиромжтой.",
    previewImageUrl: null,
    schemaJson: JSON.stringify({ __templateType: "bloom_kids", defaultConfig: DEFAULT_FUTURE_CONFIG }, null, 2),
  },
  mentor_coach: {
    name: "Mentor Coach — Хувийн дасгалжуулагч",
    type: "course",
    description: "Хувийн амжилт, career coaching template. Үр дүн, арга зүй, хуваарь, холбоо барих — life coach, business mentor, trainer-т тохиромжтой.",
    previewImageUrl: null,
    schemaJson: JSON.stringify({ __templateType: "mentor_coach", defaultConfig: DEFAULT_FUTURE_CONFIG }, null, 2),
  },
  slate_academy: {
    name: "Slate Academy — Тусгай академи",
    type: "course",
    description: "Нухацтай, мэргэжлийн академи template. Магистр, сертификат, элсэлт — хэл сурах, мэргэжлийн сургалт, online bootcamp-д тохиромжтой.",
    previewImageUrl: null,
    schemaJson: JSON.stringify({ __templateType: "slate_academy", defaultConfig: DEFAULT_FUTURE_CONFIG }, null, 2),
  },

  // ── БҮТЭЭГДЭХҮҮН ─────────────────────────────────────────────────────────
  kshop: {
    name: "Korean Shop — Онлайн дэлгүүр",
    type: "product",
    description: "Солонгос загварын хувцасны дэлгүүрт зориулсан template. Ангиллал, бараа жагсаалт, захиалах заавар, сэтгэгдэл, Facebook/Instagram/Утас CTA — онлайн шоп бизнест тохиромжтой.",
    previewImageUrl: null,
    schemaJson: JSON.stringify({ __templateType: "online_shop", defaultConfig: DEFAULT_KSHOP_CONFIG }, null, 2),
  },
  luxe_boutique: {
    name: "Luxe Boutique — Тансаг дэлгүүр",
    type: "product",
    description: "Цагаан, нэр хүнд бүхий luxury boutique template. Бүтээгдэхүүн галерей, брэнд тухай, сэтгэгдэл — fashion, аксессуар, premium shop-т тохиромжтой.",
    previewImageUrl: null,
    schemaJson: JSON.stringify({ __templateType: "luxe_boutique", defaultConfig: DEFAULT_KSHOP_CONFIG }, null, 2),
  },
  zest_food: {
    name: "Zest Food — Хүнсний дэлгүүр",
    type: "product",
    description: "Тод, дулаахан өнгөтэй хүнс / food delivery дэлгүүр template. Онцлох бараа, ангиллал, хүргэлт мэдээлэл — organic food, farm shop, grocery-д тохиромжтой.",
    previewImageUrl: null,
    schemaJson: JSON.stringify({ __templateType: "zest_food", defaultConfig: DEFAULT_KSHOP_CONFIG }, null, 2),
  },
  mono_store: {
    name: "Mono Store — Минималист дэлгүүр",
    type: "product",
    description: "Цагаан хар, editorial загвартай минималист дэлгүүр template. Цэвэр typography, grid бараа харагдац — design, art, premium brand-д тохиромжтой.",
    previewImageUrl: null,
    schemaJson: JSON.stringify({ __templateType: "mono_store", defaultConfig: DEFAULT_KSHOP_CONFIG }, null, 2),
  },
};
