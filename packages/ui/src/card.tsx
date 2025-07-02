import React from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-6 shadow-xl transition-transform duration-300 hover:scale-[1.015] hover:shadow-2xl group">
      {/* Subtle animated shimmer overlay */}
      <div className="pointer-events-none absolute inset-0 animate-[pulse_5s_ease-in-out_infinite] bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.12)_0%,transparent_70%)]" />

      {/* Soft glowing border effect on hover */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-purple-400/20 to-pink-300/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Title */}
      <h1 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-3 mb-4">
        {title}
      </h1>

      {/* Content */}
      <div>{children}</div>
    </div>
  );
}
