"use client";

import { useTranslation } from "@/contexts/LanguageContext";

export default function Products() {
    const { t } = useTranslation();
    return <div className="">{t("placeholders.product")}</div>;
}
