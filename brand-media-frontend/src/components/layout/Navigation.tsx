"use client";

import { usePathname, Link } from "@/navigation";
import { useTranslations } from "next-intl";

const navItems = [
  { key: "journal",   href: "/journal" },
  { key: "materials", href: "/materials" },
  { key: "products",  href: "/products" },
  { key: "lifestyle", href: "/lifestyle" },
  { key: "about",     href: "/about" },
];

export default function Navigation({
  mobile = false,
  onClose,
}: {
  mobile?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const t = useTranslations("nav");

  return (
    <nav className={mobile ? "flex flex-col gap-4" : "flex items-center gap-8"}>
      {navItems.map(({ key, href }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={key}
            href={href}
            onClick={onClose}
            className={`
              font-serif text-sm tracking-widest uppercase transition-all duration-300
              ${isActive
                ? "text-primary border-b-2 border-primary pb-0.5 font-bold"
                : "text-primary/60 hover:text-primary hover:border-b border-primary/20"
              }
            `}
          >
            {t(key)}
          </Link>
        );
      })}
    </nav>
  );
}