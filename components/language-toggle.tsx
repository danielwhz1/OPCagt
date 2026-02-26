"use client";

import { Languages } from "lucide-react";
import type { ReactNode } from "react";
import { useLocale } from "./language-provider";

export function LanguageToggle(): ReactNode {
  const { locale, toggleLocale } = useLocale();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className="focus-ring inline-flex h-9 items-center gap-2 rounded-full border border-white/30 px-3 text-xs font-medium text-white transition-colors hover:bg-white/10"
      aria-label={locale === "en" ? "Switch language to Chinese" : "切换到英文"}
    >
      <Languages className="h-3.5 w-3.5" />
      {locale === "en" ? "EN / 中文" : "中文 / EN"}
    </button>
  );
}
