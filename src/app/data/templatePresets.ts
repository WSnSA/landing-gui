import type { TemplateRequest } from "../types/dto";
import { DEFAULT_CAFE_CONFIG } from "../templates/cafe/CafeConfig";
import { DEFAULT_HYPERDRIVE_CONFIG } from "../templates/hyperdrive/HyperdriveConfig";
import { DEFAULT_FUTURE_CONFIG } from "../templates/future/FutureConfig";
import { DEFAULT_KSHOP_CONFIG } from "../templates/kshop/KShopConfig";

export const TEMPLATE_PRESETS: Record<string, TemplateRequest> = {
  cafe: {
    name: "Animated Cafe — Кофе шоп",
    type: "restaurant",
    description: "Animated glassmorphism загвартай кофе шоп / ресторан template. Hero, меню, онцлог, сэтгэгдэл, хаяг, холбоо барих — бүгдийг builder дотор тохируулна.",
    previewImageUrl: null,
    schemaJson: JSON.stringify({
      __templateType: "animated_cafe",
      defaultConfig: DEFAULT_CAFE_CONFIG,
    }, null, 2),
  },
  hyperdrive: {
    name: "Hyperdrive — Жолооны сургалтын төв",
    type: "business",
    description: "Dark racing-themed animated template. Дрифт/жолооны сургалтын төв, спорт клуб, авто сервист тохиромжтой. Сургалтын багцууд, онцлог, багш нар, холбоо барих бүхий бүтэн хуудас.",
    previewImageUrl: null,
    schemaJson: JSON.stringify({
      __templateType: "driving_center",
      defaultConfig: DEFAULT_HYPERDRIVE_CONFIG,
    }, null, 2),
  },
  future: {
    name: "Future — Боловсролын төв",
    type: "course",
    description: "Цагаан дэвсгэртэй, gradient accent бүхий EdTech template. Хөтөлбөрүүд, элсэх алхамууд, статистик, багш нар, сэтгэгдэл — онлайн болон офлайн сургалтын төвд тохиромжтой.",
    previewImageUrl: null,
    schemaJson: JSON.stringify({
      __templateType: "education_center",
      defaultConfig: DEFAULT_FUTURE_CONFIG,
    }, null, 2),
  },
  kshop: {
    name: "Korean Shop — Онлайн дэлгүүр",
    type: "product",
    description: "Солонгос загварын хувцасны дэлгүүрт зориулсан template. Ангиллал, бараа жагсаалт, захиалах заавар, сэтгэгдэл, Facebook/Instagram/Утас CTA — онлайн шоп бизнест тохиромжтой.",
    previewImageUrl: null,
    schemaJson: JSON.stringify({
      __templateType: "online_shop",
      defaultConfig: DEFAULT_KSHOP_CONFIG,
    }, null, 2),
  },
};
