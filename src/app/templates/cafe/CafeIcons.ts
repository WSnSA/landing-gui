import {
  // Хоол & Ундаа
  Coffee, Milk, Leaf, Croissant, Cake, GlassWater, UtensilsCrossed,
  ChefHat, Apple, Cookie, Pizza, IceCream2, Beer, Sandwich, Salad,
  Fish, Beef, Carrot, Cherry, Grape, Banana, Egg,
  // Дэлгүүр & Бизнес
  ShoppingBag, ShoppingCart, Package, Tag, Barcode, Store, Gem,
  BadgePercent, Wallet, CreditCard, Receipt, DollarSign, Banknote,
  // Үйлчилгээ & Тээвэр
  Truck, Car, Bike, Bus, Plane, Ship, MapPin, Navigation,
  Smartphone, Tablet, Monitor, Printer, Phone, Mail,
  // Байгаль & Хоbbi
  Leaf as LeafAlt, TreePine, Flower, Sun, Moon, Cloud, Droplets,
  Flame, Wind, Mountain, Waves, Snowflake,
  // Тоглоом & Спорт
  Dumbbell, Trophy, Target, Gamepad2, Music, Headphones, Camera,
  // Бизнес & Технологи
  Wifi, Zap, Shield, ShieldCheck, Lock, Key, Globe, Map,
  BarChart2, TrendingUp, PieChart, Users, UserCheck, Star, Award,
  Heart, Sparkles, Gift, Briefcase, Building, Wrench, Settings,
  Clock, Calendar, CheckCircle, Bell, MessageSquare, Megaphone,
} from "lucide-react";

export const ICON_MAP: Record<string, unknown> = {
  // Хоол & Ундаа
  Coffee, Milk, Leaf, Croissant, Cake, GlassWater, UtensilsCrossed,
  ChefHat, Apple, Cookie, Pizza, IceCream2, Beer, Sandwich, Salad,
  Fish, Beef, Carrot, Cherry, Grape, Banana, Egg,
  // Дэлгүүр & Бизнес
  ShoppingBag, ShoppingCart, Package, Tag, Barcode, Store, Gem,
  BadgePercent, Wallet, CreditCard, Receipt, DollarSign, Banknote,
  // Үйлчилгээ & Тээвэр
  Truck, Car, Bike, Bus, Plane, Ship, MapPin, Navigation,
  Smartphone, Tablet, Monitor, Printer, Phone, Mail,
  // Байгаль
  TreePine, Flower, Sun, Moon, Cloud, Droplets,
  Flame, Wind, Mountain, Waves, Snowflake,
  // Спорт & Хобби
  Dumbbell, Trophy, Target, Gamepad2, Music, Headphones, Camera,
  // Технологи & Бизнес
  Wifi, Zap, Shield, ShieldCheck, Lock, Key, Globe, Map,
  BarChart2, TrendingUp, PieChart, Users, UserCheck, Star, Award,
  Heart, Sparkles, Gift, Briefcase, Building, Wrench, Settings,
  Clock, Calendar, CheckCircle, Bell, MessageSquare, Megaphone,
};

export const ICON_CATEGORIES: { label: string; icons: string[] }[] = [
  {
    label: "🍽️ Хоол & Ундаа",
    icons: ["Coffee", "Milk", "Leaf", "GlassWater", "Beer", "Croissant", "Cake", "Cookie",
      "Pizza", "IceCream2", "Sandwich", "Salad", "Fish", "Beef", "ChefHat",
      "UtensilsCrossed", "Apple", "Carrot", "Cherry", "Grape", "Lemon", "Banana", "Egg"],
  },
  {
    label: "🛍️ Дэлгүүр & Худалдаа",
    icons: ["ShoppingBag", "ShoppingCart", "Package", "Tag", "Barcode", "Store", "Gem",
      "BadgePercent", "Wallet", "CreditCard", "Receipt", "DollarSign", "Banknote"],
  },
  {
    label: "🚗 Үйлчилгээ & Тээвэр",
    icons: ["Truck", "Car", "Bike", "Bus", "Plane", "Ship", "MapPin", "Navigation",
      "Phone", "Mail", "Smartphone", "Tablet", "Monitor", "Printer"],
  },
  {
    label: "🌿 Байгаль & Орчин",
    icons: ["TreePine", "Flower", "Sun", "Moon", "Cloud", "Droplets",
      "Flame", "Wind", "Mountain", "Waves", "Snowflake"],
  },
  {
    label: "🏆 Спорт & Хобби",
    icons: ["Dumbbell", "Trophy", "Target", "Gamepad2", "Music", "Headphones", "Camera"],
  },
  {
    label: "💼 Бизнес & Технологи",
    icons: ["Wifi", "Zap", "Shield", "ShieldCheck", "Lock", "Key", "Globe", "Map",
      "BarChart2", "TrendingUp", "PieChart", "Users", "UserCheck", "Star", "Award",
      "Heart", "Sparkles", "Gift", "Briefcase", "Building", "Wrench", "Settings",
      "Clock", "Calendar", "CheckCircle", "Bell", "MessageSquare", "Megaphone"],
  },
];
