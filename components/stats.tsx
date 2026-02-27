"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "motion/react";
import { useLocale } from "./language-provider";

interface Competitor {
  name: string;
  value: number;
  isOPCagt?: boolean;
}

interface Benchmark {
  category: {
    en: string;
    zh: string;
  };
  metric: string;
  competitors: Competitor[];
}

const benchmarks: Benchmark[] = [
  {
    category: { en: "Speed", zh: "速度" },
    metric: "Designs/min",
    competitors: [
      { name: "OPCagt", value: 94.2, isOPCagt: true },
      { name: "Figma AI", value: 71.8 },
      { name: "Canva Magic", value: 68.4 },
      { name: "Framer AI", value: 58.7 },
    ],
  },
  {
    category: { en: "Quality", zh: "质量" },
    metric: "Score",
    competitors: [
      { name: "OPCagt", value: 96.8, isOPCagt: true },
      { name: "Figma AI", value: 89.2 },
      { name: "Canva Magic", value: 82.1 },
      { name: "Framer AI", value: 79.4 },
    ],
  },
  {
    category: { en: "Consistency", zh: "一致性" },
    metric: "Accuracy %",
    competitors: [
      { name: "OPCagt", value: 98.1, isOPCagt: true },
      { name: "Figma AI", value: 81.3 },
      { name: "Framer AI", value: 76.9 },
      { name: "Canva Magic", value: 72.4 },
    ],
  },
];

function BarChart({
  benchmark,
  locale,
}: {
  benchmark: Benchmark;
  locale: "en" | "zh";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const maxValue = Math.max(...benchmark.competitors.map((c) => c.value));

  return (
    <div ref={ref} className="space-y-4">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-foreground">
          {locale === "en" ? benchmark.category.en : benchmark.category.zh}
        </h3>
        {/* <p className="text-sm text-muted-foreground">( {benchmark.metric} )</p> */}
      </div>

      <div className="space-y-3">
        {benchmark.competitors.map((competitor, index) => {
          const percentage = (competitor.value / maxValue) * 100;

          return (
            <div key={competitor.name} className="flex items-center gap-4">
              <div className="w-28 shrink-0">
                <span
                  className={`text-sm ${
                    competitor.isOPCagt
                      ? "font-medium text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {competitor.name}
                </span>
              </div>

              <div className="flex flex-1 items-center gap-0">
                <div className="relative h-6 flex-1 overflow-hidden rounded-sm bg-muted/30">
                  <motion.div
                    className={`absolute inset-y-0 left-0 rounded-sm ${
                      competitor.isOPCagt
                        ? "bg-linear-to-r from-[#333DA7] to-[#7388DF]"
                        : "bg-muted/75"
                    }`}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.1,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  />
                </div>

                <div className="w-12 shrink-0 pl-2 text-right">
                  <motion.span
                    className={`text-sm tabular-nums ${
                      competitor.isOPCagt
                        ? "font-medium text-foreground"
                        : "text-muted-foreground"
                    }`}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  >
                    {competitor.value}
                  </motion.span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Stats(): ReactNode {
  const { locale } = useLocale();

  return (
    <section className="px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-2xl">
          <h2 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl lg:text-4xl">
            {locale === "en" ? "Performance that stands out" : "脱颖而出的性能表现"}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {locale === "en"
              ? "We benchmark OPCagt against leading design tools across speed, quality, and consistency. The results speak for themselves."
              : "我们围绕速度、质量和一致性，将 OPCagt 与主流设计工具进行对比评测。结果一目了然。"}
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-3 lg:gap-12">
          {benchmarks.map((benchmark) => (
            <BarChart key={benchmark.category.en} benchmark={benchmark} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}

