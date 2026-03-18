export interface HyperdriveService {
  icon: string;
  name: string;
  price: string;
  duration: string;
  desc: string;
  highlight?: boolean;
}

export interface HyperdriveFeature {
  icon: string;
  title: string;
  desc: string;
}

export interface HyperdriveInstructor {
  name: string;
  role: string;
  exp: string;
}

export type HyperdrivePrimaryColor = "orange" | "red" | "blue" | "emerald" | "violet";

export interface HyperdriveConfig {
  __type: "driving_center";
  brandName: string;
  brandLogo: string;
  tagline: string;
  taglineHighlight: string;
  description: string;
  badge: string;
  primaryColor: HyperdrivePrimaryColor;

  servicesTitle: string;
  servicesSubtitle: string;
  services: HyperdriveService[];

  featuresTitle: string;
  features: HyperdriveFeature[];

  instructors: HyperdriveInstructor[];

  address: string;
  addressNote: string;
  phone: string;
  email: string;
  hours: { day: string; time: string }[];

  ctaText: string;
  ctaSubtext: string;
  slugPreview: string;
}

export type HyperdriveTheme = {
  accent: string; accentHover: string; accentText: string;
  accentBg: string; accentBorder: string; accentGlow: string;
  badgeText: string; highlight: string;
};

export const HYPERDRIVE_THEMES: Record<HyperdrivePrimaryColor, HyperdriveTheme> = {
  orange: {
    accent: "bg-orange-500", accentHover: "hover:bg-orange-600",
    accentText: "text-orange-500", accentBg: "bg-orange-500/10",
    accentBorder: "border-orange-500/30", accentGlow: "shadow-orange-500/25",
    badgeText: "text-orange-400", highlight: "text-orange-400",
  },
  red: {
    accent: "bg-red-500", accentHover: "hover:bg-red-600",
    accentText: "text-red-500", accentBg: "bg-red-500/10",
    accentBorder: "border-red-500/30", accentGlow: "shadow-red-500/25",
    badgeText: "text-red-400", highlight: "text-red-400",
  },
  blue: {
    accent: "bg-blue-500", accentHover: "hover:bg-blue-600",
    accentText: "text-blue-500", accentBg: "bg-blue-500/10",
    accentBorder: "border-blue-500/30", accentGlow: "shadow-blue-500/25",
    badgeText: "text-blue-400", highlight: "text-blue-400",
  },
  emerald: {
    accent: "bg-emerald-500", accentHover: "hover:bg-emerald-600",
    accentText: "text-emerald-500", accentBg: "bg-emerald-500/10",
    accentBorder: "border-emerald-500/30", accentGlow: "shadow-emerald-500/25",
    badgeText: "text-emerald-400", highlight: "text-emerald-400",
  },
  violet: {
    accent: "bg-violet-500", accentHover: "hover:bg-violet-600",
    accentText: "text-violet-500", accentBg: "bg-violet-500/10",
    accentBorder: "border-violet-500/30", accentGlow: "shadow-violet-500/25",
    badgeText: "text-violet-400", highlight: "text-violet-400",
  },
};

export const DEFAULT_HYPERDRIVE_CONFIG: HyperdriveConfig = {
  __type: "driving_center",
  brandName: "Hyperdrive Center",
  brandLogo: "",
  tagline: "Дрифтийн",
  taglineHighlight: "урлагийг эзэмш.",
  description: "Монголын анхны мэргэжлийн дрифт болон жолооны сургалтын төв. Мэргэжилтэй багш нар, аюулгүй track, бодит туршлага.",
  badge: "Баянгол дүүрэг · Мяндас–Баасан 10:00–20:00",
  primaryColor: "orange",

  servicesTitle: "Сургалтын багцууд",
  servicesSubtitle: "Та хаанаас ч эхэлж болно",
  services: [
    { icon: "Car",       name: "Дрифт Эхлэл",     price: "150,000₮", duration: "2 цаг",  desc: "Дрифтийн үндэс, тоормосны техник, oversteer удирдлага", highlight: false },
    { icon: "Zap",       name: "Дрифт Дунд",       price: "250,000₮", duration: "3 цаг",  desc: "Залгаа дрифт, corner entry, throttle control", highlight: true },
    { icon: "Trophy",    name: "Дрифт Ахисан",     price: "380,000₮", duration: "4 цаг",  desc: "Танdem дрифт, жолооны уралдааны техник", highlight: false },
    { icon: "Star",      name: "Track Day VIP",    price: "500,000₮", duration: "Өдөржин", desc: "Хувийн instructor, track бүтэн ашиглах эрх, видео бичлэг", highlight: false },
    { icon: "Users",     name: "Бүлгийн сургалт", price: "80,000₮",  duration: "2 цаг",  desc: "5+ хүний бүлэг — корпорейт event, найзуудтай", highlight: false },
    { icon: "Gift",      name: "Бэлгийн карт",    price: "Сонгон авна", duration: "—",    desc: "Дурсамжит бэлэг — дүүрэн туршлага хайрла", highlight: false },
  ],

  featuresTitle: "Яагаад Hyperdrive вэ?",
  features: [
    { icon: "ShieldCheck", title: "Аюулгүй байдал",     desc: "Олон улсын стандартын хамгаалалтын хэрэгсэл, track marshal бүхий орчин." },
    { icon: "GraduationCap", title: "Мэргэжлийн багш", desc: "10+ жилийн туршлагатай жолооч, олон улсын уралдаанд оролцсон." },
    { icon: "Car",         title: "Тусгай тоноглосон машин", desc: "Дрифтэд тохируулан засварласан, арчилгаа сайтай машинууд." },
    { icon: "Camera",      title: "Видео бичлэг",       desc: "Таны сургалтыг track camera-р бичиж, дүн шинжилгээ хийж өгнө." },
    { icon: "MapPin",      title: "Гоц байршил",        desc: "Хотын төвөөс хялбар хүрэх, том талбайтай track." },
    { icon: "Award",       title: "Гэрчилгээ",          desc: "Сургалт дуусгасны дараа Hyperdrive-н гэрчилгээ авна." },
  ],

  instructors: [
    { name: "Б. Баатар",   role: "Ахлах instructor",     exp: "12 жил" },
    { name: "Д. Мөнхбат",  role: "Дрифт мэргэжилтэн",   exp: "8 жил" },
    { name: "Э. Наранцэцэг", role: "Аюулгүй байдлын менежер", exp: "6 жил" },
  ],

  address: "Улаанбаатар хот, Баянгол дүүрэг, 34-р хороо",
  addressNote: "Их дэлгүүрийн баруун талд, хашааны дотор",
  phone: "99001122",
  email: "info@hyperdrive.mn",
  hours: [
    { day: "Мяндас – Баасан", time: "10:00 – 20:00" },
    { day: "Бямба",           time: "09:00 – 21:00" },
    { day: "Ням",             time: "10:00 – 18:00" },
  ],

  ctaText: "Жолооны амт мэдэхийг хүсвэл —",
  ctaSubtext: "Одоо бүртгүүл. Анхны сургалт дээр 10% хөнгөлөлт.",
  slugPreview: "hyperdrive-center",
};
