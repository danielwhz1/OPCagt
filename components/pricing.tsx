"use client";

import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { Check, Rocket, Zap, Building2 } from "lucide-react";
import { useLocale } from "./language-provider";

interface PricingPlan {
  name: {
    en: string;
    zh: string;
  };
  description: {
    en: string;
    zh: string;
  };
  price: string;
  period: {
    en: string;
    zh: string;
  };
  note?: {
    en: string;
    zh: string;
  };
  features: {
    en: string;
    zh: string;
  }[];
  cta: {
    en: string;
    zh: string;
  };
  popular?: boolean;
  icon: LucideIcon;
}

const plans: PricingPlan[] = [
  {
    name: { en: "Starter", zh: "入门版" },
    description: { en: "For individuals and side projects", zh: "适合个人与小型项目" },
    price: "$29",
    period: { en: "/mo", zh: "/月" },
    icon: Rocket,
    features: [
      { en: "50 design generations/month", zh: "每月 50 次设计生成" },
      { en: "Basic brand kit", zh: "基础品牌套件" },
      { en: "PNG & SVG exports", zh: "支持 PNG 与 SVG 导出" },
      { en: "Email support", zh: "邮件支持" },
      { en: "1 workspace", zh: "1 个工作区" },
    ],
    cta: { en: "Get started", zh: "立即开始" },
  },
  {
    name: { en: "Pro", zh: "专业版" },
    description: { en: "Best for startups and growing teams", zh: "适合创业团队与成长型团队" },
    price: "$99",
    period: { en: "/mo", zh: "/月" },
    note: { en: "Cancel or pause any time", zh: "可随时取消或暂停" },
    icon: Zap,
    features: [
      { en: "Unlimited design generations", zh: "不限次数设计生成" },
      { en: "Advanced brand consistency", zh: "高级品牌一致性能力" },
      { en: "All export formats + Figma", zh: "全格式导出 + Figma" },
      { en: "Priority support & delivery", zh: "优先支持与交付" },
      { en: "5 team members", zh: "5 名团队成员" },
      { en: "API access", zh: "API 访问" },
    ],
    cta: { en: "Upgrade plan", zh: "升级方案" },
    popular: true,
  },
  {
    name: { en: "Enterprise", zh: "企业版" },
    description: { en: "For large teams and organizations", zh: "适合大型团队与组织" },
    price: "Custom",
    period: { en: "", zh: "" },
    icon: Building2,
    features: [
      { en: "Everything in Pro", zh: "包含专业版全部能力" },
      { en: "Unlimited team members", zh: "不限团队成员数量" },
      { en: "Custom model training", zh: "自定义模型训练" },
      { en: "Dedicated account manager", zh: "专属客户经理" },
      { en: "SSO & advanced security", zh: "SSO 与高级安全能力" },
      { en: "SLA & on-prem options", zh: "SLA 与私有化部署选项" },
    ],
    cta: { en: "Contact sales", zh: "联系销售" },
  },
];

function PricingCard({ plan, locale }: { plan: PricingPlan; locale: "en" | "zh" }) {
  const Icon = plan.icon;

  const cardContent = (
    <div
      className={`relative flex h-full flex-col rounded-3xl bg-background p-3 ${
        plan.popular ? "" : "border border-foreground/10"
      }`}
    >
      <div className="mb-6 flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
          <Icon className="h-5 w-5 text-foreground" />
        </div>
        {plan.popular && (
          <span className="rounded-full border border-accent/50 bg-accent/20 px-4 py-1.5 text-sm font-medium text-accent">
            {locale === "en" ? "Most popular" : "最受欢迎"}
          </span>
        )}
      </div>

      <h3 className="text-xl font-semibold text-foreground">
        {locale === "en" ? plan.name.en : plan.name.zh}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {locale === "en" ? plan.description.en : plan.description.zh}
      </p>

      <div className="mt-6 flex items-baseline gap-1">
        <span className="text-5xl font-semibold tracking-tight text-foreground">
          {locale === "en" ? plan.price : plan.price === "Custom" ? "定制" : plan.price}
        </span>
        {(locale === "en" ? plan.period.en : plan.period.zh) && (
          <span className="text-lg text-muted-foreground">
            {locale === "en" ? plan.period.en : plan.period.zh}
          </span>
        )}
        {plan.note && (
          <span className="ml-auto text-right text-sm text-muted-foreground">
            {locale === "en" ? plan.note.en : plan.note.zh}
          </span>
        )}
      </div>

      <div className="mt-8 flex-1">
        <div className="flex h-full flex-col rounded-xl bg-muted/50 p-6">
          <ul className="flex-1 space-y-4">
            {plan.features.map((feature) => (
              <li key={feature.en} className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm text-foreground">
                  {locale === "en" ? feature.en : feature.zh}
                </span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className={`mt-6 w-full cursor-pointer rounded-full py-4 text-base font-semibold transition-all ${
              plan.popular
                ? "bg-accent text-accent-foreground hover:opacity-90"
                : "bg-foreground text-background hover:bg-foreground/70"
            }`}
          >
            {locale === "en" ? plan.cta.en : plan.cta.zh}
          </button>
        </div>
      </div>
    </div>
  );

  if (plan.popular) {
    return (
      <div className="relative">
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] rounded-full bg-accent-light opacity-50 blur-3xl"
          animate={{
            x: ["-50%", "-30%", "-70%", "-40%", "-60%", "-50%"],
            y: ["-50%", "-70%", "-30%", "-60%", "-40%", "-50%"],
            scale: [1, 1.2, 0.9, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            times: [0, 0.2, 0.4, 0.6, 0.8, 1],
          }}
        />
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[50%] w-[50%] rounded-full bg-accent opacity-40 blur-3xl"
          animate={{
            x: ["-50%", "-70%", "-30%", "-60%", "-40%", "-50%"],
            y: ["-50%", "-30%", "-70%", "-40%", "-60%", "-50%"],
            scale: [1, 0.9, 1.15, 0.95, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            times: [0, 0.2, 0.4, 0.6, 0.8, 1],
          }}
        />
        <div className="absolute -inset-px rounded-[1.52rem] bg-linear-to-br from-accent to-accent-light opacity-25" />
        <div className="relative">{cardContent}</div>
      </div>
    );
  }

  return cardContent;
}

export function Pricing(): ReactNode {
  const { locale } = useLocale();

  return (
    <section className="px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <p className="text-4xl font-medium tracking-tight text-foreground">
            {locale === "en" ? "Simple, transparent pricing" : "简单透明的价格"}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard key={plan.name.en} plan={plan} locale={locale} />
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-lg text-muted-foreground">
          {locale === "en"
            ? "Start free and scale as you grow. No hidden fees, no surprises."
            : "从免费开始，按需扩展。无隐藏费用，无额外套路。"}
        </p>
      </div>
    </section>
  );
}
