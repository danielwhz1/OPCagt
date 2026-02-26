"use client";

import type { ReactNode } from "react";
import { useLocale } from "./language-provider";
import { TextReveal } from "./text-reveal";

export function LocalizedTextReveal(): ReactNode {
  const { locale } = useLocale();

  return (
    <TextReveal
      text={
        locale === "en"
          ? "If you can dream it, you can prompt it into existence."
          : "只要你想得到，就能用提示词把它变成现实。"
      }
      className="text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
    />
  );
}
