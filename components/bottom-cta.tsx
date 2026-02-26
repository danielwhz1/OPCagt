"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useLocale } from "./language-provider";

export function BottomCTA(): ReactNode {
  const { locale } = useLocale();

  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-muted/50">
        <div className="relative z-10 px-8 py-12 sm:px-12">
          <div className="max-w-xl">
            <h2 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
              {locale === "en" ? "Get early access" : "抢先体验"}
            </h2>
            <p className="mt-3 text-lg max-w-md text-muted-foreground">
              {locale === "en"
                ? "Every week, we ship new AI-powered design features. Join and be first in line to shape what we build next."
                : "我们每周都会发布新的 AI 设计能力。立即加入，第一时间体验并参与共创。"}
            </p>

            <form className="mt-8 flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                placeholder={locale === "en" ? "you@company.com" : "you@company.com"}
                className="h-12 sm:min-w-86 appearance-none rounded-xl border-0 bg-background px-6 text-foreground shadow-none placeholder:text-muted-foreground outline-none! ring-0! transition-shadow duration-200 focus:border-0 focus:shadow-[0_0_20px_rgba(0,0,0,0.08)] dark:focus:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                required
              />
              <button
                type="submit"
                className="h-12 cursor-pointer rounded-full bg-background px-8 font-medium text-foreground transition-opacity hover:opacity-90"
              >
                {locale === "en" ? "Join waitlist" : "加入候补名单"}
              </button>
            </form>

            <p className="mt-4 text-xs max-w-xs text-muted-foreground">
              {locale === "en"
                ? "We respect your inbox. No spam, just product updates. "
                : "我们尊重你的收件箱。不会骚扰，只发送产品更新。 "}
              <Link href="#" className="underline hover:text-foreground">
                {locale === "en" ? "Privacy Policy" : "隐私政策"}
              </Link>
              .
            </p>
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-2/3 opacity-25 sm:opacity-25"
          style={{
            background:
              "linear-gradient(to left, #333DA7, transparent)",
            maskImage:
              "linear-gradient(to left, black 0%, black 40%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to left, black 0%, black 40%, transparent 100%)",
          }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
