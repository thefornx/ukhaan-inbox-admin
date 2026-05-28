"use client";

import { menuItems } from "@/utils/menuItems";
import { useTranslation } from "@/contexts/LanguageContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNavigation() {
    const pathname = usePathname();
    const { t } = useTranslation();

    const activeItem = menuItems.find((item) =>
        item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
    );

    const children = activeItem?.children ?? [];

    // Longest-matching child wins so "/store" doesn't stay active on "/store/branches".
    const activeChildHref = children
        .filter((c) => pathname === c.href || pathname.startsWith(c.href + "/"))
        .sort((a, b) => b.href.length - a.href.length)[0]?.href;

    return (
        <div className="flex flex-row gap-1">
            <nav className="flex flex-col items-center gap-1 bg-base-100 border border-base-300 p-2 rounded-lg">
                {menuItems.map((item) => {
                    const isActive =
                        item.href === "/"
                            ? pathname === "/"
                            : pathname.startsWith(item.href);
                    const tooltip = t(item.tooltipKey);

                    return (
                        <div
                            key={item.href}
                            className="tooltip tooltip-right"
                            data-tip={tooltip}
                        >
                            <Link
                                href={item.href}
                                aria-label={tooltip}
                                aria-current={isActive ? "page" : undefined}
                                className={`flex p-1.5 items-center justify-center rounded-lg transition-colors ${
                                    isActive
                                        ? "bg-primary text-primary-content"
                                        : "text-base-content hover:bg-base-300"
                                }`}
                            >
                                {item.icon}
                            </Link>
                        </div>
                    );
                })}
            </nav>

            {children.length > 0 && (
                <nav className="flex flex-col gap-1 bg-base-100 border border-base-300 p-2 rounded-lg w-48">
                    <span className="px-2 py-1 text-xs font-semibold uppercase tracking-wide text-base-content/80">
                        {activeItem ? t(activeItem.tooltipKey) : null}
                    </span>
                    {children.map((child) => {
                        const isActive = child.href === activeChildHref;

                        return (
                            <Link
                                key={child.href}
                                href={child.href}
                                aria-current={isActive ? "page" : undefined}
                                className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-colors ${
                                    isActive
                                        ? "bg-primary text-primary-content"
                                        : "text-base-content hover:bg-base-300"
                                }`}
                            >
                                {child.icon}
                                <span>{t(child.nameKey)}</span>
                            </Link>
                        );
                    })}
                </nav>
            )}
        </div>
    );
}
