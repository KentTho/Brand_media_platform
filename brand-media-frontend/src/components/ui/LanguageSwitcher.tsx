"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, Link } from "@/navigation";
import { useState, useRef, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const locales = [
  { code: "vi", label: "VI", name: "Tiếng Việt" },
  { code: "en", label: "EN", name: "English" },
  { code: "ru", label: "RU", name: "Русский" },
  { code: "zh", label: "中", name: "中文" },
  { code: "ar", label: "AR", name: "العربية" },
];

function LanguageSwitcherInner() {
  const locale = useLocale();
  const t = useTranslations('language_switcher');
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLocale = locales.find(l => l.code === locale);
  const currentLabel = currentLocale?.label || "VI";

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-xs font-bold font-serif text-on-primary/80 hover:text-on-primary transition-all duration-300 px-3 py-1.5 rounded-sm border border-on-primary/15 bg-on-primary/5 hover:bg-on-primary/10"
      >
        <span>{currentLabel}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}>
          <ChevronDown className="w-3 h-3 text-on-primary/50" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="absolute top-full mt-3 right-0 bg-primary-container/95 backdrop-blur-md border border-on-primary/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] min-w-[150px] z-50 py-2 rounded-sm overflow-hidden"
          >
            <div className="px-4 py-2 mb-1 border-b border-on-primary/5 text-[9px] uppercase tracking-widest text-on-primary/30 font-bold">
              {t('label')}
            </div>
            {locales.map(({ code, label, name }) => (
              <Link
                key={code}
                href={pathname}
                locale={code}
                onClick={() => setIsOpen(false)}
                className={`
                  text-xs font-serif transition-all duration-300 px-4 py-2.5 text-left w-full flex justify-between items-center gap-3
                  ${locale === code
                    ? "text-on-primary bg-on-primary/10 font-bold cursor-default"
                    : "text-on-primary/60 hover:text-on-primary hover:bg-on-primary/5"
                  }
                `}
              >
                <span className="font-bold w-6">{label}</span>
                <span className="text-[10px] opacity-60 flex-1">{name}</span>
                {locale === code && <span className="w-1.5 h-1.5 rounded-full bg-on-primary-container opacity-70 flex-shrink-0" />}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function LanguageSwitcher() {
  return (
    <Suspense fallback={<div className="w-12 h-7 bg-on-primary/10 rounded-sm animate-pulse" />}>
      <LanguageSwitcherInner />
    </Suspense>
  );
}