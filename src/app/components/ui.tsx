import { useEffect } from "react";

export function Button({
                           variant = "primary",
                           size = "md",
                           loading,
                           disabled,
                           className = "",
                           ...props
                       }: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "ghost" | "danger";
    size?: "sm" | "md";
    loading?: boolean;
}) {
    const base =
        "inline-flex items-center justify-center rounded-lg font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 disabled:opacity-60 disabled:cursor-not-allowed";
    const sizes = size === "sm" ? "px-3 py-2 text-sm" : "px-4 py-2 text-sm";
    const variants: Record<string, string> = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
        secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
        ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
        danger: "bg-rose-600 text-white hover:bg-rose-700",
    };
    return (
        <button
            disabled={disabled || loading}
            className={`${base} ${sizes} ${variants[variant]} ${className}`}
            {...props}
        >
            {loading ? <span className="animate-pulse">…</span> : props.children}
        </button>
    );
}

export function Card({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`} {...props} />;
}

export function Field({
                          label,
                          hint,
                          error,
                          children,
                      }: {
    label: string;
    hint?: string;
    error?: string | null;
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-3">
                <label className="text-sm font-medium text-slate-900">{label}</label>
                {hint ? <span className="text-xs text-slate-500">{hint}</span> : null}
            </div>
            {children}
            {error ? <div className="text-xs text-rose-600">{error}</div> : null}
        </div>
    );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className={`w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 ${props.className ?? ""}`}
        />
    );
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <textarea
            {...props}
            className={`w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 ${props.className ?? ""}`}
        />
    );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
    return (
        <select
            {...props}
            className={`w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 ${props.className ?? ""}`}
        />
    );
}

export function Modal({
                          open,
                          title,
                          children,
                          footer,
                          onClose,
                      }: {
    open: boolean;
    title: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    onClose: () => void;
}) {
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (open) window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onMouseDown={onClose}>
            <div
                className="w-full max-w-lg rounded-2xl bg-white shadow-xl border border-slate-200"
                onMouseDown={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-slate-200">
                    <div className="text-base font-semibold text-slate-900">{title}</div>
                    <button className="text-slate-500 hover:text-slate-900" onClick={onClose} aria-label="Close">
                        ✕
                    </button>
                </div>
                <div className="px-5 py-4">{children}</div>
                {footer ? <div className="px-5 py-4 border-t border-slate-200">{footer}</div> : null}
            </div>
        </div>
    );
}

export function EmptyState({
                               title,
                               desc,
                               action,
                           }: {
    title: string;
    desc?: string;
    action?: React.ReactNode;
}) {
    return (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <div className="text-base font-semibold text-slate-900">{title}</div>
            {desc ? <div className="mt-2 text-sm text-slate-600">{desc}</div> : null}
            {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
        </div>
    );
}
