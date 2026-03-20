import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, EmptyState } from "../../components/ui";
import { landingService } from "../../services/landingService";
import { templateService } from "../../services/templateService";
import type { LandingResponse, TemplateResponse } from "../../types/dto";
import { safeJsonParse } from "../../utils/format";

const TYPE_LABELS: Record<string, string> = {
  business: "Бизнес",
  course: "Сургалт",
  personal: "Хувийн",
  product: "Бүтээгдэхүүн",
  event: "Арга хэмжээ",
  restaurant: "Ресторан",
  portfolio: "Портфолио",
  digital_brochure: "Дижитал брошур",
};

// ── Template mini-preview ─────────────────────────────────────────────────────

function CafeMiniPreview() {
  return (
    <div className="w-full h-40 bg-stone-50 overflow-hidden relative flex flex-col">
      {/* Nav */}
      <div className="bg-white/80 border-b border-stone-200 px-4 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="h-4 w-4 rounded-full bg-amber-400" />
          <div className="h-2 w-16 bg-slate-200 rounded-full" />
        </div>
        <div className="h-5 w-14 rounded-lg bg-amber-500" />
      </div>
      {/* Hero */}
      <div className="flex-1 flex items-center px-4 gap-4 relative">
        <div className="absolute -top-8 -left-8 h-32 w-32 rounded-full bg-amber-400/20 blur-2xl pointer-events-none" />
        <div className="flex-1 space-y-1.5">
          <div className="h-2 w-10 bg-amber-400 rounded-full opacity-70" />
          <div className="h-3 w-28 bg-slate-800 rounded-full" />
          <div className="h-3 w-20 bg-amber-500 rounded-full" />
          <div className="h-2 w-24 bg-slate-300 rounded-full mt-1" />
          <div className="flex gap-1.5 mt-2">
            <div className="h-5 w-16 rounded-lg bg-amber-500" />
            <div className="h-5 w-16 rounded-lg bg-white border border-slate-200" />
          </div>
        </div>
        {/* Browser mockup */}
        <div className="w-28 shrink-0 rounded-lg border border-slate-200 bg-white/70 overflow-hidden shadow-sm">
          <div className="bg-slate-100 px-2 py-1 flex gap-0.5">
            <div className="h-1.5 w-1.5 rounded-full bg-rose-300" />
            <div className="h-1.5 w-1.5 rounded-full bg-amber-300" />
            <div className="h-1.5 w-1.5 rounded-full bg-green-300" />
          </div>
          <div className="p-1.5 space-y-1">
            <div className="h-1.5 w-full bg-amber-100 rounded" />
            <div className="grid grid-cols-3 gap-0.5">
              {[1,2,3].map(i => <div key={i} className="h-3 rounded bg-stone-100 border border-stone-200" />)}
            </div>
          </div>
        </div>
      </div>
      {/* Label */}
      <div className="absolute bottom-1.5 left-3 text-[9px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full border border-amber-200">
        Light · Glassmorphism
      </div>
    </div>
  );
}

function HyperdriveMiniPreview() {
  return (
    <div className="w-full h-40 bg-zinc-950 overflow-hidden relative flex flex-col">
      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
      {/* Speed lines */}
      {[20,35,50,65,78].map((top, i) => (
        <div key={i} className="absolute h-px bg-orange-500/30" style={{ top: `${top}%`, left: 0, right: 0 }} />
      ))}
      {/* Glow */}
      <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-orange-500/20 blur-2xl pointer-events-none" />
      {/* Nav */}
      <div className="bg-zinc-900/90 border-b border-white/10 px-4 py-2 flex items-center justify-between shrink-0 relative">
        <div className="flex items-center gap-1.5">
          <div className="h-4 w-4 rounded bg-orange-500" />
          <div className="h-2 w-16 bg-zinc-700 rounded-full" />
        </div>
        <div className="h-5 w-14 rounded-lg bg-orange-500" />
      </div>
      {/* Hero */}
      <div className="flex-1 flex items-center px-4 gap-4 relative">
        <div className="flex-1 space-y-1.5">
          <div className="h-2 w-10 bg-orange-500/60 rounded-full" />
          <div className="h-3 w-28 bg-white rounded-full" />
          <div className="h-3 w-20 bg-orange-400 rounded-full" />
          <div className="h-2 w-24 bg-zinc-600 rounded-full mt-1" />
          <div className="flex gap-1.5 mt-2">
            <div className="h-5 w-16 rounded-lg bg-orange-500" />
            <div className="h-5 w-16 rounded-lg bg-white/10 border border-white/20" />
          </div>
        </div>
        {/* Browser mockup */}
        <div className="w-28 shrink-0 rounded-lg border border-white/10 bg-zinc-900 overflow-hidden shadow-lg">
          <div className="bg-zinc-800 px-2 py-1 flex gap-0.5">
            <div className="h-1.5 w-1.5 rounded-full bg-rose-400" />
            <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
          </div>
          <div className="p-1.5 space-y-1">
            <div className="h-1.5 w-full bg-orange-500/30 rounded" />
            <div className="grid grid-cols-3 gap-0.5">
              {[1,2,3].map(i => <div key={i} className="h-3 rounded bg-zinc-800 border border-white/10" />)}
            </div>
          </div>
        </div>
      </div>
      {/* Label */}
      <div className="absolute bottom-1.5 left-3 text-[9px] font-bold text-orange-400 bg-orange-500/10 px-1.5 py-0.5 rounded-full border border-orange-500/20">
        Dark · Racing
      </div>
    </div>
  );
}

function FutureMiniPreview() {
  return (
    <div className="w-full h-40 bg-white overflow-hidden relative flex flex-col">
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, #e2e8f0 1px, transparent 1px)", backgroundSize: "14px 14px" }} />
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-400 to-violet-500 opacity-10 rounded-full blur-2xl pointer-events-none" />
      <div className="bg-white/90 border-b border-slate-100 px-4 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="h-4 w-4 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600" />
          <div className="h-2 w-16 bg-slate-200 rounded-full" />
        </div>
        <div className="h-5 w-14 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600" />
      </div>
      <div className="flex-1 flex items-center px-4 gap-4 relative">
        <div className="flex-1 space-y-1.5">
          <div className="h-2 w-12 bg-indigo-200 rounded-full" />
          <div className="h-3 w-28 bg-slate-800 rounded-full" />
          <div className="h-3 w-20 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full" />
          <div className="h-2 w-24 bg-slate-300 rounded-full mt-1" />
          <div className="flex gap-1.5 mt-2">
            <div className="h-5 w-20 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600" />
            <div className="h-5 w-16 rounded-lg bg-white border-2 border-slate-200" />
          </div>
        </div>
        <div className="w-24 shrink-0 rounded-xl border border-slate-100 bg-white shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-2 py-1.5">
            <div className="h-1.5 w-12 bg-white/50 rounded mx-auto" />
          </div>
          <div className="p-1.5 space-y-1">
            {[1,2,3].map(i => (
              <div key={i} className="flex items-center gap-1">
                <div className="h-2.5 w-2.5 rounded bg-indigo-100 shrink-0" />
                <div className="h-1.5 flex-1 bg-slate-100 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-1.5 left-3 text-[9px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-full border border-indigo-200">
        Light · EdTech · Gradient
      </div>
    </div>
  );
}

function KShopMiniPreview() {
  return (
    <div className="w-full h-40 bg-pink-50 overflow-hidden relative flex flex-col">
      {/* Promo strip */}
      <div className="bg-pink-500 py-1 px-4 flex items-center justify-center shrink-0">
        <div className="h-1.5 w-32 bg-white/60 rounded-full" />
      </div>
      {/* Nav */}
      <div className="bg-white border-b border-pink-100 px-4 py-1.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="h-4 w-4 rounded-full bg-pink-400" />
          <div className="h-2 w-14 bg-slate-200 rounded-full" />
        </div>
        <div className="h-4 w-12 rounded-lg bg-pink-500" />
      </div>
      {/* Hero + product grid */}
      <div className="flex-1 flex items-center px-3 gap-3">
        <div className="flex-1 space-y-1">
          <div className="h-1.5 w-8 bg-pink-200 rounded-full" />
          <div className="h-2.5 w-20 bg-slate-800 rounded-full" />
          <div className="h-2.5 w-16 bg-pink-500 rounded-full" />
          <div className="h-4 w-14 rounded-lg bg-pink-500 mt-1.5" />
        </div>
        {/* Mini product grid */}
        <div className="grid grid-cols-2 gap-1 shrink-0">
          {["🧥","👗","👖","👟"].map((e, i) => (
            <div key={i} className="w-10 h-10 rounded-lg bg-white border border-pink-100 flex items-center justify-center text-base shadow-sm">
              {e}
            </div>
          ))}
        </div>
      </div>
      {/* Categories strip */}
      <div className="px-3 pb-2 flex gap-1.5">
        {["👗","👔","👧","👟"].map((e, i) => (
          <div key={i} className="h-5 px-1.5 rounded-full bg-white border border-pink-200 flex items-center gap-0.5">
            <span className="text-[9px]">{e}</span>
            <div className="h-1.5 w-4 bg-slate-200 rounded-full" />
          </div>
        ))}
      </div>
      {/* Label */}
      <div className="absolute bottom-1.5 right-3 text-[9px] font-bold text-pink-600 bg-pink-50 px-1.5 py-0.5 rounded-full border border-pink-200">
        Light · Shop
      </div>
    </div>
  );
}

// ── РЕСТОРАН варiantууд ───────────────────────────────────────────────────────

function NoirMiniPreview() {
  return (
    <div className="w-full h-40 bg-[#0a0a0a] overflow-hidden relative flex flex-col">
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
      <div className="absolute top-2 left-4 right-4 h-px bg-amber-400/30" />
      <div className="bg-black/80 border-b border-white/10 px-4 py-2 flex items-center justify-between shrink-0">
        <div className="h-2 w-20 bg-amber-400/60 rounded-full" />
        <div className="h-5 w-12 rounded bg-amber-400/20 border border-amber-400/30" />
      </div>
      <div className="flex-1 flex items-center px-4 gap-4 relative">
        <div className="absolute -bottom-4 left-0 right-0 h-20 bg-gradient-to-t from-amber-900/20 to-transparent pointer-events-none" />
        <div className="flex-1 space-y-1.5">
          <div className="h-1.5 w-8 bg-amber-400/50 rounded-full" />
          <div className="h-3 w-24 bg-white/80 rounded-full" />
          <div className="h-3 w-16 bg-amber-400 rounded-full" />
          <div className="h-5 w-20 rounded bg-amber-400 mt-2" />
        </div>
        <div className="w-20 h-20 rounded border border-amber-400/20 bg-amber-900/20 flex items-center justify-center text-2xl">🕯️</div>
      </div>
      <div className="absolute bottom-1.5 left-3 text-[9px] font-bold text-amber-400 bg-black px-1.5 py-0.5 rounded-full border border-amber-400/30">
        Dark · Noir
      </div>
    </div>
  );
}

function StreetFoodMiniPreview() {
  return (
    <div className="w-full h-40 bg-yellow-400 overflow-hidden relative flex flex-col">
      <div className="bg-red-600 py-1 px-4 text-center shrink-0">
        <div className="h-1.5 w-24 bg-white/60 rounded-full mx-auto" />
      </div>
      <div className="bg-white border-b-2 border-black px-4 py-1.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center text-[8px] text-white font-black">🌮</div>
          <div className="h-2 w-14 bg-gray-800 rounded-full" />
        </div>
        <div className="h-5 w-14 rounded bg-red-500" />
      </div>
      <div className="flex-1 flex items-center px-4 gap-3">
        <div className="flex-1 space-y-1.5">
          <div className="h-3 w-28 bg-gray-900 rounded-full font-black" />
          <div className="h-3 w-20 bg-red-500 rounded-full" />
          <div className="flex gap-1.5 mt-1.5">
            <div className="h-5 w-16 rounded bg-red-500" />
            <div className="h-5 w-12 rounded bg-gray-900" />
          </div>
        </div>
        <div className="text-4xl">🍔</div>
      </div>
      <div className="absolute bottom-1.5 left-3 text-[9px] font-black text-red-700 bg-yellow-300 px-1.5 py-0.5 rounded-full border border-red-300">
        Bold · Street
      </div>
    </div>
  );
}

function GardenBistroMiniPreview() {
  return (
    <div className="w-full h-40 bg-green-50 overflow-hidden relative flex flex-col">
      <div className="absolute top-0 right-0 w-20 h-20 bg-green-200/50 rounded-full blur-2xl pointer-events-none" />
      <div className="bg-white/90 border-b border-green-100 px-4 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="h-4 w-4 rounded-full bg-green-400" />
          <div className="h-2 w-14 bg-green-200 rounded-full" />
        </div>
        <div className="h-5 w-14 rounded-full bg-green-500" />
      </div>
      <div className="flex-1 flex items-center px-4 gap-4">
        <div className="flex-1 space-y-1.5">
          <div className="h-1.5 w-10 bg-green-400 rounded-full" />
          <div className="h-3 w-24 bg-green-900 rounded-full" />
          <div className="h-3 w-18 bg-green-500 rounded-full" />
          <div className="h-5 w-18 rounded-full bg-green-500 mt-2" />
        </div>
        <div className="space-y-1.5">
          {["🌿","🌸","🍃"].map((e, i) => (
            <div key={i} className="w-8 h-5 rounded-lg bg-green-100 border border-green-200 flex items-center justify-center text-xs">{e}</div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-1.5 left-3 text-[9px] font-bold text-green-700 bg-green-100 px-1.5 py-0.5 rounded-full border border-green-200">
        Light · Garden
      </div>
    </div>
  );
}

// ── БИЗНЕС варiantууд ─────────────────────────────────────────────────────────

function AtlasMiniPreview() {
  return (
    <div className="w-full h-40 bg-slate-900 overflow-hidden relative flex flex-col">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="bg-slate-800/90 border-b border-white/10 px-4 py-2 flex items-center justify-between shrink-0">
        <div className="h-2 w-16 bg-blue-400/70 rounded-full" />
        <div className="h-5 w-14 rounded-lg bg-blue-500" />
      </div>
      <div className="flex-1 flex items-center px-4 gap-3">
        <div className="flex-1 space-y-1.5">
          <div className="h-1.5 w-8 bg-blue-400/50 rounded-full" />
          <div className="h-3 w-28 bg-white/80 rounded-full" />
          <div className="h-2 w-20 bg-blue-400 rounded-full" />
          <div className="h-5 w-20 rounded-lg bg-blue-500 mt-2" />
        </div>
        <div className="grid grid-cols-2 gap-1 shrink-0">
          {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 rounded bg-slate-700 border border-white/5" />)}
        </div>
      </div>
      <div className="absolute bottom-1.5 left-3 text-[9px] font-bold text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded-full border border-blue-500/20">
        Dark · Agency
      </div>
    </div>
  );
}

function NexusMiniPreview() {
  return (
    <div className="w-full h-40 bg-white overflow-hidden relative flex flex-col">
      <div className="absolute top-0 right-0 w-28 h-28 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none" />
      <div className="bg-white border-b border-slate-100 px-4 py-2 flex items-center justify-between shrink-0">
        <div className="h-2 w-14 bg-cyan-500 rounded-full" />
        <div className="h-5 w-14 rounded-lg bg-cyan-500" />
      </div>
      <div className="flex-1 flex items-center px-4 gap-3">
        <div className="flex-1 space-y-1.5">
          <div className="h-1.5 w-10 bg-cyan-200 rounded-full" />
          <div className="h-3 w-24 bg-slate-800 rounded-full" />
          <div className="h-3 w-18 bg-cyan-500 rounded-full" />
          <div className="flex gap-1 mt-2">
            <div className="h-5 w-16 rounded-lg bg-cyan-500" />
            <div className="h-5 w-14 rounded-lg bg-slate-100 border border-slate-200" />
          </div>
        </div>
        <div className="space-y-1">
          {[40,60,80,50].map((w, i) => (
            <div key={i} className="h-1.5 bg-cyan-100 rounded-full" style={{ width: `${w}%` }}>
              <div className="h-full bg-cyan-400 rounded-full" style={{ width: "60%" }} />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-1.5 left-3 text-[9px] font-bold text-cyan-600 bg-cyan-50 px-1.5 py-0.5 rounded-full border border-cyan-200">
        Light · Tech
      </div>
    </div>
  );
}

function PrismMiniPreview() {
  return (
    <div className="w-full h-40 bg-white overflow-hidden relative flex flex-col">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none"
        style={{ background: "linear-gradient(135deg, #ff6b6b, #ffd93d, #6bcb77, #4d96ff)" }} />
      <div className="bg-white/95 border-b border-slate-100 px-4 py-2 flex items-center justify-between shrink-0">
        <div className="h-4 w-4 rounded" style={{ background: "linear-gradient(135deg, #ff6b6b, #4d96ff)" }} />
        <div className="h-5 w-14 rounded-lg" style={{ background: "linear-gradient(90deg, #ff6b6b, #4d96ff)" }} />
      </div>
      <div className="flex-1 flex items-center px-4 gap-3">
        <div className="flex-1 space-y-1.5">
          <div className="h-3 w-24 bg-slate-800 rounded-full" />
          <div className="h-2 w-20 bg-slate-300 rounded-full" />
          <div className="h-5 w-16 rounded-lg mt-2" style={{ background: "linear-gradient(90deg, #ff6b6b, #4d96ff)" }} />
        </div>
        <div className="grid grid-cols-2 gap-1 shrink-0">
          {["#ff6b6b","#ffd93d","#6bcb77","#4d96ff"].map((c, i) => (
            <div key={i} className="w-8 h-8 rounded-lg opacity-70" style={{ backgroundColor: c }} />
          ))}
        </div>
      </div>
      <div className="absolute bottom-1.5 left-3 text-[9px] font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded-full border border-purple-200">
        Light · Creative
      </div>
    </div>
  );
}

// ── СУРГАЛТ варiantууд ────────────────────────────────────────────────────────

function BloomKidsMiniPreview() {
  return (
    <div className="w-full h-40 bg-yellow-50 overflow-hidden relative flex flex-col">
      <div className="absolute top-0 right-0 w-20 h-20 bg-pink-200/50 rounded-full blur-xl pointer-events-none" />
      <div className="bg-white border-b-2 border-yellow-200 px-4 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="h-5 w-5 rounded-full bg-yellow-400 flex items-center justify-center text-[8px]">⭐</div>
          <div className="h-2 w-12 bg-yellow-300 rounded-full" />
        </div>
        <div className="h-5 w-14 rounded-full bg-pink-400" />
      </div>
      <div className="flex-1 flex items-center px-4 gap-3">
        <div className="flex-1 space-y-1.5">
          <div className="h-3 w-24 bg-gray-700 rounded-full font-black" />
          <div className="h-3 w-18 bg-pink-400 rounded-full" />
          <div className="h-5 w-18 rounded-full bg-yellow-400 mt-2" />
        </div>
        <div className="flex gap-1 text-xl">🎨🎯🎪</div>
      </div>
      <div className="absolute bottom-1.5 left-3 text-[9px] font-bold text-pink-600 bg-pink-50 px-1.5 py-0.5 rounded-full border border-pink-200">
        Kids · Playful
      </div>
    </div>
  );
}

function MentorMiniPreview() {
  return (
    <div className="w-full h-40 bg-slate-50 overflow-hidden relative flex flex-col">
      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100/60 rounded-full blur-2xl pointer-events-none" />
      <div className="bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between shrink-0">
        <div className="h-2 w-14 bg-emerald-600 rounded-full" />
        <div className="h-5 w-14 rounded-lg bg-emerald-600" />
      </div>
      <div className="flex-1 flex items-center px-4 gap-4">
        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-xl shrink-0">👤</div>
        <div className="flex-1 space-y-1.5">
          <div className="h-2.5 w-20 bg-slate-800 rounded-full" />
          <div className="h-2 w-16 bg-emerald-500 rounded-full" />
          <div className="h-2 w-24 bg-slate-300 rounded-full" />
          <div className="h-5 w-18 rounded-lg bg-emerald-600 mt-1" />
        </div>
      </div>
      <div className="absolute bottom-1.5 left-3 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200">
        Light · Coach
      </div>
    </div>
  );
}

function SlateMiniPreview() {
  return (
    <div className="w-full h-40 bg-slate-950 overflow-hidden relative flex flex-col">
      <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="bg-slate-900 border-b border-white/10 px-4 py-2 flex items-center justify-between shrink-0">
        <div className="h-2 w-14 bg-white/70 rounded-full" />
        <div className="h-5 w-14 rounded-lg bg-violet-500" />
      </div>
      <div className="flex-1 flex items-center px-4 gap-3">
        <div className="flex-1 space-y-1.5">
          <div className="h-1.5 w-10 bg-violet-400/60 rounded-full" />
          <div className="h-3 w-24 bg-white/80 rounded-full" />
          <div className="h-2 w-20 bg-white/30 rounded-full" />
          <div className="flex gap-1.5 mt-2">
            <div className="h-5 w-16 rounded-lg bg-violet-500" />
            <div className="h-5 w-12 rounded-lg bg-white/10 border border-white/20" />
          </div>
        </div>
        <div className="space-y-1">
          {[1,2,3].map(i => (
            <div key={i} className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
              <div className="h-1.5 w-14 bg-white/20 rounded-full" />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-1.5 left-3 text-[9px] font-bold text-violet-400 bg-violet-500/10 px-1.5 py-0.5 rounded-full border border-violet-500/20">
        Dark · Academy
      </div>
    </div>
  );
}

// ── БҮТЭЭГДЭХҮҮН варiantууд ───────────────────────────────────────────────────

function LuxeMiniPreview() {
  return (
    <div className="w-full h-40 bg-[#faf9f7] overflow-hidden relative flex flex-col">
      <div className="bg-[#1c1c1c] py-1.5 px-4 text-center shrink-0">
        <div className="h-1.5 w-24 bg-white/40 rounded-full mx-auto" />
      </div>
      <div className="bg-[#faf9f7] border-b border-[#1c1c1c]/10 px-4 py-1.5 flex items-center justify-between shrink-0">
        <div className="h-2 w-16 bg-[#1c1c1c]/60 rounded-full" />
        <div className="h-5 w-12 rounded bg-[#1c1c1c]" />
      </div>
      <div className="flex-1 flex items-center px-3 gap-3">
        <div className="flex-1 space-y-1">
          <div className="h-2.5 w-20 bg-[#1c1c1c] rounded-full" />
          <div className="h-2 w-16 bg-[#1c1c1c]/40 rounded-full" />
          <div className="h-5 w-14 rounded bg-[#1c1c1c] mt-1.5" />
        </div>
        <div className="grid grid-cols-2 gap-1 shrink-0">
          {["👜","💍","🧣","👒"].map((e, i) => (
            <div key={i} className="w-9 h-9 rounded bg-[#1c1c1c]/5 border border-[#1c1c1c]/10 flex items-center justify-center text-sm">{e}</div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-1.5 left-3 text-[9px] font-bold text-[#1c1c1c]/60 bg-white px-1.5 py-0.5 rounded-full border border-[#1c1c1c]/10">
        Cream · Luxury
      </div>
    </div>
  );
}

function ZestMiniPreview() {
  return (
    <div className="w-full h-40 bg-[#fff7ed] overflow-hidden relative flex flex-col">
      <div className="bg-orange-600 py-1 px-4 text-center shrink-0">
        <div className="h-1.5 w-28 bg-white/50 rounded-full mx-auto" />
      </div>
      <div className="bg-white border-b border-orange-100 px-4 py-1.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="h-4 w-4 rounded-full bg-orange-400" />
          <div className="h-2 w-12 bg-gray-200 rounded-full" />
        </div>
        <div className="h-5 w-12 rounded-full bg-orange-500" />
      </div>
      <div className="flex-1 flex items-center px-3 gap-3">
        <div className="flex-1 space-y-1">
          <div className="h-2.5 w-20 bg-gray-800 rounded-full" />
          <div className="h-2 w-16 bg-orange-400 rounded-full" />
          <div className="h-5 w-16 rounded-full bg-orange-500 mt-1" />
        </div>
        <div className="grid grid-cols-2 gap-1 shrink-0">
          {["🥑","🍇","🥕","🍅"].map((e, i) => (
            <div key={i} className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-sm">{e}</div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-1.5 left-3 text-[9px] font-bold text-orange-700 bg-orange-50 px-1.5 py-0.5 rounded-full border border-orange-200">
        Warm · Food
      </div>
    </div>
  );
}

function MonoMiniPreview() {
  return (
    <div className="w-full h-40 bg-white overflow-hidden relative flex flex-col">
      <div className="bg-black py-1.5 px-4 text-center shrink-0">
        <div className="h-1 w-20 bg-white/40 rounded-full mx-auto" />
      </div>
      <div className="bg-white border-b border-black px-4 py-1.5 flex items-center justify-between shrink-0">
        <div className="h-2 w-14 bg-black rounded-full" />
        <div className="h-5 w-12 bg-black" />
      </div>
      <div className="flex-1 grid grid-cols-4 gap-px bg-black/10 p-0">
        {["👔","👗","👟","🧥"].map((e, i) => (
          <div key={i} className="bg-white flex flex-col items-center justify-center gap-1 p-1">
            <span className="text-lg">{e}</span>
            <div className="h-1 w-6 bg-black/20 rounded-full" />
          </div>
        ))}
      </div>
      <div className="absolute bottom-1.5 left-3 text-[9px] font-bold text-black/60 bg-white px-1.5 py-0.5 rounded-full border border-black/20">
        Mono · Grid
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function TemplateMiniPreview({ template }: { template: TemplateResponse }) {
  if (template.previewImageUrl) {
    return (
      <div className="h-40 bg-slate-100 overflow-hidden">
        <img src={template.previewImageUrl} alt={template.name}
          className="w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
      </div>
    );
  }

  const schema = safeJsonParse<Record<string, unknown>>(template.schemaJson, {});
  const templateType = schema.__templateType as string | undefined;

  // Cafe family
  if (templateType === "animated_cafe")  return <CafeMiniPreview />;
  if (templateType === "noir_restaurant") return <NoirMiniPreview />;
  if (templateType === "street_food")    return <StreetFoodMiniPreview />;
  if (templateType === "garden_bistro")  return <GardenBistroMiniPreview />;
  // Hyperdrive family
  if (templateType === "driving_center") return <HyperdriveMiniPreview />;
  if (templateType === "atlas_agency")   return <AtlasMiniPreview />;
  if (templateType === "nexus_tech")     return <NexusMiniPreview />;
  if (templateType === "prism_creative") return <PrismMiniPreview />;
  // Future family
  if (templateType === "education_center") return <FutureMiniPreview />;
  if (templateType === "bloom_kids")     return <BloomKidsMiniPreview />;
  if (templateType === "mentor_coach")   return <MentorMiniPreview />;
  if (templateType === "slate_academy")  return <SlateMiniPreview />;
  // KShop family
  if (templateType === "online_shop")    return <KShopMiniPreview />;
  if (templateType === "luxe_boutique")  return <LuxeMiniPreview />;
  if (templateType === "zest_food")      return <ZestMiniPreview />;
  if (templateType === "mono_store")     return <MonoMiniPreview />;

  // Generic fallback
  const emoji = template.type === "restaurant" ? "🍽️"
    : template.type === "portfolio" ? "🎨"
    : template.type === "event" ? "📅"
    : template.type === "course" ? "📚"
    : template.type === "product" ? "📦"
    : "📄";
  return (
    <div className="h-40 bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center">
      <div className="text-4xl text-slate-300">{emoji}</div>
    </div>
  );
}

export default function TemplatesPage() {
  const { projectId } = useParams();
  const landingId = Number(projectId);
  const navigate = useNavigate();

  const [landing, setLanding] = useState<LandingResponse | null>(null);
  const [templates, setTemplates] = useState<TemplateResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      landingService.get(landingId),
      templateService.list(),
    ]).then(([l, tpls]) => {
      setLanding(l);
      setTemplates(tpls);
    }).catch(() => {
      setErr("Мэдээлэл ачаалахад алдаа гарлаа.");
    }).finally(() => setLoading(false));
  }, [landingId]);

  /**
   * Template сонгоход:
   * 1. Одоогийн landing-г устгана
   * 2. Шинэ landing-г template-тэйгээр үүсгэнэ → Page/Section/Component автоматаар үүснэ
   * 3. Шинэ landing руу navigate хийнэ
   */
  const applyTemplate = async (tpl: TemplateResponse) => {
    if (!landing) return;
    if (!confirm(`"${tpl.name}" template сонгох уу? Одоогийн бүтэц template-ийн бүтцээр солигдоно.`)) return;

    setBusy(true);
    setErr(null);
    try {
      // Шинэ landing үүсгэж template apply хийнэ
      const created = await landingService.create({
        name: landing.name,
        slug: landing.slug + "-" + Date.now(),
        templateId: tpl.id,
      });

      // Animated template бол configJson initialize хийнэ
      const schema = safeJsonParse<Record<string, unknown>>(tpl.schemaJson, {});
      if (schema.__templateType && schema.defaultConfig) {
        await landingService.update(created.id, {
          configJson: JSON.stringify({ ...(schema.defaultConfig as object), __type: schema.__templateType }),
        });
      }

      // Хуучин landing устгана
      await landingService.remove(landingId);

      navigate(`/app/${created.id}/editor`, { replace: true });
    } catch (e: unknown) {
      const err = e as { payload?: string; message?: string };
      setErr(err?.payload ?? err?.message ?? "Алдаа гарлаа.");
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40 text-sm text-slate-500">
        Ачаалж байна...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xl font-bold text-slate-900">Template сонгох</div>
        <div className="mt-1 text-sm text-slate-600">
          Template сонгоход тухайн template-н хуудас, хэсэг, компонентууд автоматаар үүснэ.
          Та дараа нь Builder-т утгуудыг өөрчилж болно.
        </div>
      </div>

      {err && (
        <Card className="p-4 border-rose-200 bg-rose-50">
          <div className="text-sm text-rose-700">{err}</div>
        </Card>
      )}

      {templates.length === 0 ? (
        <EmptyState
          title="Template байхгүй байна"
          desc="Admin хэсэгт template нэмнэ үү."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((t) => (
            <Card key={t.id} className="overflow-hidden flex flex-col">
              <TemplateMiniPreview template={t} />

              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="text-base font-semibold text-slate-900">{t.name}</div>
                  <span className="shrink-0 text-xs font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                    {TYPE_LABELS[t.type] ?? t.type}
                  </span>
                </div>
                <div className="mt-1 text-sm text-slate-600 flex-1">{t.description}</div>

                <div className="mt-4">
                  <Button
                    className="w-full"
                    variant={landing?.templateId === t.id ? "secondary" : "primary"}
                    disabled={busy}
                    onClick={() => applyTemplate(t)}
                  >
                    {landing?.templateId === t.id ? "Одоо ашиглаж байна" : "Энэ template сонгох"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
