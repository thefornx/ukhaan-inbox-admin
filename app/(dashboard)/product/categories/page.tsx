"use client";

import { useTranslation } from "@/contexts/LanguageContext";

export default function Categories() {
    const { t } = useTranslation();
    return <div className="">{t("placeholders.productCategories")}</div>;
}
