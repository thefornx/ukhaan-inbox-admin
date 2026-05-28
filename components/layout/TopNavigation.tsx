"use client";

import { Check, ChevronsUpDown, Globe, Moon, Sun } from "lucide-react";
import Image from "next/image";
import { useSyncExternalStore } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { LOCALES, useLanguage, type Locale } from "@/contexts/LanguageContext";

const noopSubscribe = () => () => {};

const LOCALE_LABEL_KEY: Record<Locale, string> = {
    en: "common.english",
    mn: "common.mongolian",
};

export default function TopNavigation() {
    const { theme, toggleTheme } = useTheme();
    const { locale, setLocale, t } = useLanguage();
    // The resolved theme/locale is only known on the client. Render the
    // server's default until hydrated to avoid input/text mismatches.
    const hydrated = useSyncExternalStore(
        noopSubscribe,
        () => true,
        () => false,
    );

    return (
        <nav className="bg-base-100 border-b border-base-300 flex items-center justify-between p-2">
            <div className="flex items-center gap-3">
                {/* Ukhaan logo */}
                <Image
                    src="/assets/ukhaan-white-logo.png"
                    alt="Ukhaan logo"
                    width={28}
                    height={28}
                    priority
                />

                {/* Company dropdown */}
                <div className="dropdown dropdown-bottom">
                    <div tabIndex={0} role="button" className="btn btn-primary btn-soft border-0 btn-sm">
                        <div className="flex gap-1 items-center">
                            <div className="avatar avatar-placeholder">
                                <div className="bg-neutral text-neutral-content w-5 rounded">
                                    <span className="text-xs"></span>
                                </div>
                            </div>
                            <div>COMPANY</div>
                            <div>
                                <ChevronsUpDown className="w-4 h-4 opacity-50" />
                            </div>
                        </div>
                    </div>
                    <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                        <li>
                            <a>
                                <div className="flex gap-1 items-center">
                                    <div className="avatar avatar-placeholder">
                                        <div className="bg-neutral text-neutral-content w-5 rounded">
                                            <span className="text-xs"></span>
                                        </div>
                                    </div>
                                    <div>COMPANY</div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex items-center gap-2">
                {/* Language switcher */}
                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        aria-label={t("common.selectLanguage")}
                        className="btn btn-sm btn-soft btn-primary"
                    >
                        <Globe className="w-4 h-4" />
                        <span className="uppercase">{hydrated ? locale : "en"}</span>
                    </div>
                    <ul
                        tabIndex={-1}
                        className="dropdown-content menu bg-base-100 rounded-box z-1 w-40 p-2 shadow-sm border border-base-300"
                    >
                        {LOCALES.map((code) => {
                            const isActive = hydrated && locale === code;
                            return (
                                <li key={code}>
                                    <button
                                        type="button"
                                        onClick={() => setLocale(code)}
                                        className={isActive ? "active" : undefined}
                                    >
                                        <span className="flex-1 text-left">
                                            {t(LOCALE_LABEL_KEY[code])}
                                        </span>
                                        {isActive && <Check className="w-4 h-4" />}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Theme toggle button */}
                <label className="btn swap btn-sm btn-soft btn-primary btn-square">
                    <input
                        type="checkbox"
                        aria-label={t("common.toggleTheme")}
                        checked={hydrated && theme === "dark"}
                        onChange={toggleTheme}
                    />

                    <Sun className="swap-on w-4 h-4" />

                    <Moon className="swap-off w-4 h-4" />
                </label>
            </div>
        </nav>
    );
}
