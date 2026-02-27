"use client";

import { useRef, useState, useEffect, useCallback, type ReactNode } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useLocale } from "./language-provider";

interface LocalizedText {
  en: string;
  zh: string;
}

interface Testimonial {
  badge: LocalizedText;
  company: LocalizedText;
  quote: LocalizedText;
  name: string;
  role: LocalizedText;
  image: string;
  stats: {
    label: LocalizedText;
    value: string;
  }[];
}

const testimonials: Testimonial[] = [
  {
    badge: { en: "Design Agency", zh: "设计机构" },
    company: { en: "Stellar Creative", zh: "Stellar Creative" },
    quote: {
      en: "We've completely transformed our workflow with OPCagt. What used to take our team days now happens in hours. The AI understands our brand guidelines perfectly and produces designs that clients love on the first revision.",
      zh: "使用 OPCagt 后，我们的工作流被彻底重塑。过去需要几天完成的任务，现在几小时就能交付。AI 能准确理解品牌规范，首版方案就能得到客户认可。",
    },
    name: "Sarah Chen",
    role: { en: "Creative Director", zh: "创意总监" },
    image: "https://images.unsplash.com/photo-1574108233269-86d1199d28de?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    stats: [
      { label: { en: "Design Output", zh: "设计产能" }, value: "10x faster" },
      { label: { en: "Client Revisions", zh: "客户返修" }, value: "-80%" },
      { label: { en: "Team Size", zh: "团队规模" }, value: "12 designers" },
    ],
  },
  {
    badge: { en: "Tech Startup", zh: "科技创业公司" },
    company: { en: "Quantum Labs", zh: "Quantum Labs" },
    quote: {
      en: "As a startup without a dedicated design team, OPCagt has been a game-changer. We ship beautiful marketing materials, pitch decks, and product interfaces without hiring a single designer. The ROI is incredible.",
      zh: "作为一家没有专职设计团队的创业公司，OPCagt 改变了我们的节奏。我们无需新增设计师，也能持续产出高质量营销物料、路演文档和产品界面，投入产出比非常高。",
    },
    name: "Marcus Rodriguez",
    role: { en: "Co-founder & CEO", zh: "联合创始人兼 CEO" },
    image: "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    stats: [
      { label: { en: "Design Cost Savings", zh: "设计成本节省" }, value: "$150k/year" },
      { label: { en: "Time to Launch", zh: "上线周期" }, value: "2 weeks" },
      { label: { en: "Assets Created", zh: "产出素材" }, value: "500+" },
    ],
  },
  {
    badge: { en: "Enterprise", zh: "企业客户" },
    company: { en: "GlobalTech Inc", zh: "GlobalTech Inc" },
    quote: {
      en: "Rolling out OPCagt across our marketing team was seamless. The brand consistency features ensure every piece of content - from social posts to annual reports - looks like it came from the same designer. It's remarkable.",
      zh: "我们在营销团队中推广 OPCagt 非常顺畅。其品牌一致性能力确保从社媒内容到年度报告都保持统一风格，就像出自同一位设计师之手。",
    },
    name: "Roy Park",
    role: { en: "VP of Marketing", zh: "市场副总裁" },
    image: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    stats: [
      { label: { en: "Brand Consistency", zh: "品牌一致性" }, value: "99.5%" },
      { label: { en: "Team Members", zh: "团队人数" }, value: "200+" },
      { label: { en: "Monthly Designs", zh: "月度设计产出" }, value: "5,000+" },
    ],
  },
];

function TestimonialCard({
  testimonial,
  isActive,
  locale,
}: {
  testimonial: Testimonial;
  isActive: boolean;
  locale: "en" | "zh";
}) {
  return (
    <div className={`flex h-full w-full flex-col rounded-3xl p-6 sm:p-8 lg:flex-row lg:gap-12 lg:p-12 transition-colors duration-300 ${isActive ? 'bg-accent/20' : 'bg-muted'}`}>
      <div className="flex flex-1 flex-col">
        <span className="w-fit rounded-full bg-background px-3 py-1 text-xs font-medium text-muted-foreground sm:px-4 sm:py-1.5 sm:text-sm">
          {locale === "en" ? testimonial.badge.en : testimonial.badge.zh}
        </span>

        <h3 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:mt-6 sm:text-4xl lg:text-5xl">
          {locale === "en" ? testimonial.company.en : testimonial.company.zh}
        </h3>

        <p className="mt-4 flex-1 text-base leading-relaxed text-foreground/80 sm:mt-6 sm:text-lg lg:mt-8 lg:text-xl">
          &ldquo;{locale === "en" ? testimonial.quote.en : testimonial.quote.zh}&rdquo;
        </p>

        <div className="mt-6 flex items-center gap-3 sm:mt-8">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover lg:hidden"
          />
          <div>
            <p className="text-sm font-medium text-foreground sm:text-base">
              {testimonial.name}
            </p>
            <p className="text-xs text-muted-foreground sm:text-sm lg:hiddenleading-snug">
              {locale === "en" ? testimonial.role.en : testimonial.role.zh}
            </p>
          </div>
        </div>

        <p className="mt-4 text-xs font-medium uppercase text-muted-foreground/60 lg:mt-6">
          {locale === "en" ? testimonial.company.en : testimonial.company.zh}
        </p>
      </div>

      <div className="hidden flex-col lg:flex lg:w-72">
        <div className="relative h-60 w-40 overflow-hidden rounded-full">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="mt-2 pt-6">
          <p className="text-xs font-medium uppercase text-muted-foreground">
            {locale === "en" ? testimonial.role.en : testimonial.role.zh}
          </p>
          <p className="mt-1 text-lg font-semibold text-foreground leading-snug">
            {testimonial.name}
          </p>
        </div>

        <div className="mt-6 border-t border-foreground/10 pt-8">
          <p className="text-xs font-medium uppercase text-muted-foreground">
            {locale === "en" ? "How they use OPCagt" : "他们如何使用 OPCagt"}
          </p>
          <div className="mt-4 space-y-2">
            {testimonial.stats.map((stat) => (
              <div key={stat.label.en} className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  {locale === "en" ? stat.label.en : stat.label.zh}
                </span>
                <span className="text-sm font-semibold text-foreground">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Testimonials(): ReactNode {
  const { locale } = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [measurements, setMeasurements] = useState({ cardWidth: 0, gap: 24 });
  
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 80, damping: 20 });

  const measure = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const gap = 24;
      const peekWidth = 0;
      const cardWidth = containerWidth - peekWidth;
      setMeasurements({ cardWidth, gap });
    }
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  useEffect(() => {
    const { cardWidth, gap } = measurements;
    if (cardWidth > 0) {
      x.set(-currentIndex * (cardWidth + gap));
    }
  }, [currentIndex, measurements, x]);

  const paginate = (direction: number) => {
    setCurrentIndex((prev) => {
      const next = prev + direction;
      if (next < 0) return 0;
      if (next >= testimonials.length) return testimonials.length - 1;
      return next;
    });
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const { cardWidth, gap } = measurements;

  return (
    <section className="overflow-hidden py-20 md:py-28">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl mb-12">
          <p className="text-4xl font-medium tracking-tight text-foreground">
            {locale === "en" ? "Trusted by design teams worldwide" : "受到全球设计团队信赖"}
          </p>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8">
        <div ref={containerRef} className="mx-auto max-w-7xl">
          <div className="overflow-visible">
          <motion.div
            className="flex"
            style={{ x: springX, gap }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.company.en}
                className="shrink-0"
                style={{ width: cardWidth || "90%" }}
              >
                <TestimonialCard
                  testimonial={testimonial}
                  isActive={index === currentIndex}
                  locale={locale}
                />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToSlide(index)}
                className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-foreground"
                    : "w-2 bg-foreground/30 hover:bg-foreground/50"
                }`}
                aria-label={
                  locale === "en"
                    ? `Go to testimonial ${index + 1}`
                    : `切换到评价 ${index + 1}`
                }
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => paginate(-1)}
              disabled={currentIndex === 0}
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-muted/75 text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-30"
              aria-label={locale === "en" ? "Previous testimonial" : "上一条评价"}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => paginate(1)}
              disabled={currentIndex === testimonials.length - 1}
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-muted/75 text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-30"
              aria-label={locale === "en" ? "Next testimonial" : "下一条评价"}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

