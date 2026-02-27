"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";
import { useLocale } from "./language-provider";

interface FAQItem {
  question: {
    en: string;
    zh: string;
  };
  answer: {
    en: string;
    zh: string;
  };
}

const faqs: FAQItem[] = [
  {
    question: {
      en: "What kinds of designs can OPCagt create?",
      zh: "OPCagt 可以生成哪些类型的设计？",
    },
    answer: {
      en: "OPCagt can generate logos, landing pages, social media graphics, brand identities, app interfaces, presentations, and more. Just describe what you need in natural language, and OPCagt will produce multiple production-ready options.",
      zh: "OPCagt 可以生成 logo、落地页、社媒素材、品牌视觉、应用界面、演示文稿等多种设计。你只需用自然语言描述需求，OPCagt 就会产出多个可直接使用的方案。",
    },
  },
  {
    question: {
      en: "How does OPCagt ensure brand consistency?",
      zh: "OPCagt 如何保证品牌一致性？",
    },
    answer: {
      en: "OPCagt learns your brand guidelines - colors, fonts, tone, and style - and applies them automatically to every design. Upload your brand kit once, and OPCagt maintains consistency across all outputs.",
      zh: "OPCagt 会学习你的品牌规范，包括配色、字体、语气和风格，并自动应用到每一次设计中。上传一次品牌资料，即可在所有产出中保持一致。",
    },
  },
  {
    question: {
      en: "Can I edit or refine designs after generation?",
      zh: "生成后可以继续编辑或微调吗？",
    },
    answer: {
      en: "Absolutely. You can tweak colors, adjust layouts, change fonts, or request specific modifications using natural language. OPCagt understands conversational edits like 'make it more minimal' or 'use a warmer palette.'",
      zh: "当然可以。你可以调整配色、布局和字体，也可以用自然语言提出具体修改。比如“更简洁一些”或“用更温暖的色调”，OPCagt 都能理解。",
    },
  },
  {
    question: {
      en: "What export formats does OPCagt support?",
      zh: "OPCagt 支持哪些导出格式？",
    },
    answer: {
      en: "OPCagt exports to all major formats including PNG, SVG, PDF, and Figma. You can also push designs directly to your codebase with production-ready React or HTML/CSS components.",
      zh: "OPCagt 支持主流导出格式，包括 PNG、SVG、PDF 和 Figma。你还可以将可生产使用的 React 或 HTML/CSS 组件直接推送到代码库。",
    },
  },
  {
    question: {
      en: "Is my data and designs secure?",
      zh: "我的数据和设计是否安全？",
    },
    answer: {
      en: "Yes. All designs and data are encrypted end-to-end. We never train our models on your proprietary work, and you retain full ownership of everything you create with OPCagt.",
      zh: "是的。所有数据与设计都采用端到端加密。我们不会使用你的专有内容训练模型，你对使用 OPCagt 生成的成果拥有完整所有权。",
    },
  },
];

function FAQItemComponent({
  item,
  isOpen,
  onToggle,
  locale,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  locale: "en" | "zh";
}) {
  return (
    <motion.div
      layout
      className="rounded-2xl bg-muted/50"
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-base font-medium text-foreground">
          {locale === "en" ? item.question.en : item.question.zh}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="shrink-0"
        >
          <Plus className="h-5 w-5 text-foreground" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-muted-foreground">
              {locale === "en" ? item.answer.en : item.answer.zh}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ(): ReactNode {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { locale } = useLocale();

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="px-4 py-20 sm:px-6 md:py-28 lg:px-8 border-t border-foreground/10">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="text-4xl text-foreground font-medium tracking-tight">
              {locale === "en" ? "Answers to your questions" : "常见问题解答"}
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="flex flex-col gap-3">
              {faqs.map((faq, index) => (
                <FAQItemComponent
                  key={faq.question.en}
                  item={faq}
                  isOpen={openIndex === index}
                  onToggle={() => handleToggle(index)}
                  locale={locale}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

