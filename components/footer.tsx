"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Linkedin } from "lucide-react";
import { useLocale } from "./language-provider";

const footerLinks = [
  {
    en: "Product",
    zh: "产品",
    links: [
      { en: "Features", zh: "功能", href: "#" },
      { en: "Pricing", zh: "价格", href: "#" },
      { en: "Changelog", zh: "更新日志", href: "#" },
      { en: "Roadmap", zh: "路线图", href: "#" },
    ],
  },
  {
    en: "Company",
    zh: "公司",
    links: [
      { en: "About", zh: "关于我们", href: "#" },
      { en: "Blog", zh: "博客", href: "#" },
      { en: "Careers", zh: "招聘", href: "#" },
      { en: "Press", zh: "媒体", href: "#" },
    ],
  },
  {
    en: "Resources",
    zh: "资源",
    links: [
      { en: "Documentation", zh: "文档", href: "#" },
      { en: "Help Center", zh: "帮助中心", href: "#" },
      { en: "Community", zh: "社区", href: "#" },
    ],
  },
] as const;

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export function Footer(): ReactNode {
  const { locale } = useLocale();

  return (
    <footer className="relative overflow-hidden bg-background px-4 text-foreground sm:px-6 lg:px-8">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 opacity-60"
        style={{
          background:
            "linear-gradient(to top, rgba(51,61,167,0.8) 0%, rgba(81,96,195,0.5) 20%, rgba(115,136,223,0.3) 40%, rgba(140,158,230,0.15) 60%, rgba(165,180,240,0.05) 80%, transparent 100%)",
          maskImage:
            "linear-gradient(to top, black 0%, black 20%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, black 0%, black 20%, transparent 100%)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl py-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="grid flex-1 gap-8 sm:grid-cols-3">
            {footerLinks.map((group) => (
              <div key={group.en}>
                <h3 className="text-sm text-muted-foreground">
                  {locale === "en" ? group.en : group.zh}
                </h3>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.en}>
                      <Link
                        href={link.href}
                        className="text-lg text-foreground transition-colors hover:text-foreground/70"
                      >
                        {locale === "en" ? link.en : link.zh}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:text-right">
            <h3 className="text-sm text-muted-foreground">
              {locale === "en" ? "Social" : "社交"}
            </h3>
            <div className="mt-4 flex gap-3 lg:justify-end">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-foreground/10 text-foreground transition-colors hover:bg-foreground/20"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 fill-foreground/40 text-foreground/40" strokeWidth={1} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl py-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} OPCagt, Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {locale === "en" ? "Terms" : "条款"}
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {locale === "en" ? "Privacy" : "隐私"}
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {locale === "en" ? "Cookies" : "Cookies"}
            </Link>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-338 select-none h-44 pb-12">
        <Image
          src="/svg/logo-text.svg"
          alt=""
          width={2500}
          height={400}
          className="w-full opacity-5 invert dark:invert-0"
          aria-hidden="true"
        />
      </div>
    </footer>
  );
}

