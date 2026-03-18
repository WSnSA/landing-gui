import type { TemplateRequest } from "../types/dto";
import { DEFAULT_CAFE_CONFIG } from "../templates/cafe/CafeConfig";

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
};
