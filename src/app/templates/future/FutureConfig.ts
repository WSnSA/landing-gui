export interface FutureCourse {
  icon: string;
  name: string;
  level: "Эхлэгч" | "Дунд" | "Ахисан";
  duration: string;
  price: string;
  desc: string;
  highlight?: boolean;
}

export interface FutureStep {
  title: string;
  desc: string;
}

export interface FutureStat {
  num: string;
  label: string;
}

export interface FutureInstructor {
  name: string;
  subject: string;
  exp: string;
}

export interface FutureTestimonial {
  text: string;
  name: string;
  result: string;
}

export type FuturePrimaryColor = "indigo" | "blue" | "violet" | "cyan" | "rose";

export interface FutureConfig {
  __type: "education_center";
  brandName: string;
  brandLogo: string;
  tagline: string;
  taglineHighlight: string;
  description: string;
  badge: string;
  primaryColor: FuturePrimaryColor;

  coursesTitle: string;
  coursesSubtitle: string;
  courses: FutureCourse[];

  stepsTitle: string;
  steps: FutureStep[];

  stats: FutureStat[];

  instructorsTitle: string;
  instructors: FutureInstructor[];

  testimonials: FutureTestimonial[];

  phone: string;
  email: string;
  address: string;

  ctaText: string;
  ctaSubtext: string;
  slugPreview: string;
}

export type FutureTheme = {
  accent: string;
  accentHover: string;
  accentText: string;
  accentBg: string;
  accentBorder: string;
  accentGradient: string;
  highlight: string;
  badgeText: string;
  levelColor: Record<string, string>;
};

export const FUTURE_THEMES: Record<FuturePrimaryColor, FutureTheme> = {
  indigo: {
    accent: "bg-indigo-600", accentHover: "hover:bg-indigo-700",
    accentText: "text-indigo-600", accentBg: "bg-indigo-50",
    accentBorder: "border-indigo-200", accentGradient: "from-indigo-600 to-violet-600",
    highlight: "text-indigo-600", badgeText: "text-indigo-600",
    levelColor: { "Эхлэгч": "bg-emerald-100 text-emerald-700", "Дунд": "bg-amber-100 text-amber-700", "Ахисан": "bg-rose-100 text-rose-700" },
  },
  blue: {
    accent: "bg-blue-600", accentHover: "hover:bg-blue-700",
    accentText: "text-blue-600", accentBg: "bg-blue-50",
    accentBorder: "border-blue-200", accentGradient: "from-blue-600 to-cyan-500",
    highlight: "text-blue-600", badgeText: "text-blue-600",
    levelColor: { "Эхлэгч": "bg-emerald-100 text-emerald-700", "Дунд": "bg-amber-100 text-amber-700", "Ахисан": "bg-rose-100 text-rose-700" },
  },
  violet: {
    accent: "bg-violet-600", accentHover: "hover:bg-violet-700",
    accentText: "text-violet-600", accentBg: "bg-violet-50",
    accentBorder: "border-violet-200", accentGradient: "from-violet-600 to-purple-600",
    highlight: "text-violet-600", badgeText: "text-violet-600",
    levelColor: { "Эхлэгч": "bg-emerald-100 text-emerald-700", "Дунд": "bg-amber-100 text-amber-700", "Ахисан": "bg-rose-100 text-rose-700" },
  },
  cyan: {
    accent: "bg-cyan-600", accentHover: "hover:bg-cyan-700",
    accentText: "text-cyan-600", accentBg: "bg-cyan-50",
    accentBorder: "border-cyan-200", accentGradient: "from-cyan-500 to-blue-600",
    highlight: "text-cyan-600", badgeText: "text-cyan-600",
    levelColor: { "Эхлэгч": "bg-emerald-100 text-emerald-700", "Дунд": "bg-amber-100 text-amber-700", "Ахисан": "bg-rose-100 text-rose-700" },
  },
  rose: {
    accent: "bg-rose-600", accentHover: "hover:bg-rose-700",
    accentText: "text-rose-600", accentBg: "bg-rose-50",
    accentBorder: "border-rose-200", accentGradient: "from-rose-500 to-pink-600",
    highlight: "text-rose-600", badgeText: "text-rose-600",
    levelColor: { "Эхлэгч": "bg-emerald-100 text-emerald-700", "Дунд": "bg-amber-100 text-amber-700", "Ахисан": "bg-rose-100 text-rose-700" },
  },
};

export const DEFAULT_FUTURE_CONFIG: FutureConfig = {
  __type: "education_center",
  brandName: "Future Сургалт",
  brandLogo: "",
  tagline: "Ирээдүйгээ",
  taglineHighlight: "өнөөдөр бүтээ.",
  description: "Монголын тэргүүлэх онлайн сургалтын платформ. Мэргэжлийн багш нар, практик хичээл, гэрчилгээ — карьераа дараагийн шатанд гарга.",
  badge: "🎓 1,200+ төгсөгч · Улаанбаатар",
  primaryColor: "indigo",

  coursesTitle: "Сургалтын хөтөлбөрүүд",
  coursesSubtitle: "Таны зорилгод тохирсон хөтөлбөр сонго",
  courses: [
    { icon: "Monitor",     name: "Вэб хөгжүүлэлт",   level: "Эхлэгч", duration: "3 сар",  price: "480,000₮", desc: "HTML, CSS, JavaScript, React — эхнээс нь орчин үеийн вэб хийж сур.", highlight: true },
    { icon: "Smartphone",  name: "Мобайл апп",         level: "Дунд",   duration: "4 сар",  price: "620,000₮", desc: "React Native ашиглан iOS болон Android апп хөгжүүлэх." },
    { icon: "BarChart2",   name: "Дата анализ",         level: "Дунд",   duration: "3 сар",  price: "540,000₮", desc: "Python, SQL, Tableau — өгөгдлөөс утга гарга, шийдвэр гар." },
    { icon: "Sparkles",    name: "UI/UX Дизайн",        level: "Эхлэгч", duration: "2 сар",  price: "360,000₮", desc: "Figma, хэрэглэгчийн судалгаа, прототип — сайхан бүтээгдэхүүн хийх урлаг." },
    { icon: "Globe",       name: "Англи хэл (Бизнес)",  level: "Дунд",   duration: "6 сар",  price: "420,000₮", desc: "IELTS бэлтгэл, бизнес харилцаа, презентейшн — карьерт хэрэгтэй Англи." },
    { icon: "TrendingUp",  name: "Цифрийн Маркетинг",   level: "Эхлэгч", duration: "2 сар",  price: "300,000₮", desc: "SEO, social media, Google Ads — брэндээ онлайнд өргөж сур." },
  ],

  stepsTitle: "Хэрхэн элсэх вэ?",
  steps: [
    { title: "Хөтөлбөр сонго",   desc: "Таны зорилго, цаг хугацаанд тохирсон сургалтыг сонго." },
    { title: "Бүртгүүл",          desc: "Утас эсвэл и-мэйлээр холбоо бариад бүртгэлээ баталга болго." },
    { title: "Сургалтаа эхэл",    desc: "Онлайн болон оффлайн хичээл — өөрийн хурдаар суруулна." },
    { title: "Гэрчилгээ ав",      desc: "Хөтөлбөр дуусгаад Future-н баталгааждсан гэрчилгээ ав." },
  ],

  stats: [
    { num: "1,200+", label: "Төгсөгч" },
    { num: "95%",    label: "Ажилд орох хувь" },
    { num: "20+",    label: "Мэргэжлийн багш" },
    { num: "4.9★",  label: "Дундаж үнэлгээ" },
  ],

  instructorsTitle: "Манай багш нар",
  instructors: [
    { name: "Б. Батбаяр",    subject: "Вэб хөгжүүлэлт", exp: "8 жил" },
    { name: "О. Оюунчимэг",  subject: "UI/UX Дизайн",    exp: "6 жил" },
    { name: "Д. Дорж",       subject: "Дата шинжилгээ",  exp: "10 жил" },
  ],

  testimonials: [
    { text: "Future-н вэб хөгжүүлэлтийн сургалт авсны дараа 3 сарын дотор ажилд орлоо. Практик хичээлүүд маш хэрэгтэй байсан.", name: "Э. Энхтуяа", result: "Frontend developer болсон" },
    { text: "Дата анализын сургалт бол надад хамгийн чухал хөрөнгө оруулалт байсан. Цалин маань 2 дахин өссөн.", name: "Г. Ганбаяр", result: "Data analyst болсон" },
    { text: "Багш нар маш мэргэжлийн, асуултад нь хариулж чаддаг. Бүх зүйл практикт суурилсан байдаг нь гайхалтай.", name: "Н. Нарангэрэл", result: "UX designer болсон" },
  ],

  phone: "9900-1234",
  email: "info@future.mn",
  address: "Улаанбаатар, Сүхбаатар дүүрэг",

  ctaText: "Карьераа өөрчлөхөд бэлэн үү?",
  ctaSubtext: "Одоо бүртгүүлж, эхний 7 хоногийн хичээлийг үнэгүй авна уу.",
  slugPreview: "future-surgalt",
};
